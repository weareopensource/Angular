import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output} from '@angular/core';

declare var Msal;

@Component({
  selector: 'microsoft-graph-api',
  template: `
    <button mat-button (click)="callGraphApi()">
      <mat-icon svgIcon="windows"></mat-icon>
      <span>Login with Windows</span>
    </button>`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicrosoftGraphApiComponent implements AfterViewInit {

  @Input()
  public clientID: string;

  private _msalconfig = {
    clientID: this.clientID,
    redirectUri: location.origin
  };

  private _graphApiEndpoint = 'https://graph.microsoft.com/v1.0/me';

  private _graphAPIScopes = ['https://graph.microsoft.com/user.read'];

  private _userAgentApplication = new Msal.UserAgentApplication(this._msalconfig.clientID, undefined, this.loginCallback, {
    redirectUri: this._msalconfig.redirectUri
  });

  @Output()
  public twitterLoginSuccess = new EventEmitter();

  @Output()
  public twitterLoginFailure = new EventEmitter();

  @HostListener('window::load')
  onLoad(): void {
    if (!this._userAgentApplication.isCallback(window.location.hash) && window.parent === window && !window.opener) {
      const user = this._userAgentApplication.getUser();
      if (user) {
        this.callGraphApi();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this._userAgentApplication.redirectUri) {
      this._userAgentApplication.redirectUri = this._msalconfig.redirectUri;
    }
  }

  callGraphApi(): void {
    const user = this._userAgentApplication.getUser();
    if (!user) {
      this._userAgentApplication.loginPopup(this._graphAPIScopes);
    } else {
      const userInfoElement = document.getElementById('userInfo');
      userInfoElement.parentElement.classList.remove('hidden');
      userInfoElement.innerHTML = JSON.stringify(user, undefined, 4);
      document.getElementById('signOutButton')
      .classList
      .remove('hidden');

      const graphCallResponseElement = document.getElementById('graphResponse');
      graphCallResponseElement.parentElement.classList.remove('hidden');
      graphCallResponseElement.innerText = 'Calling Graph ...';
      this._userAgentApplication.acquireTokenSilent(this._graphAPIScopes)
      .then((token: any) => {
        this.callWebApiWithToken(this._graphApiEndpoint, token, graphCallResponseElement, document.getElementById('accessToken'));

      }, (error: any) => {
        if (error) {
          this._userAgentApplication.acquireTokenRedirect(this._graphAPIScopes);
        }
      });
    }
  }

  loginCallback(errorDesc, _token, error, _tokenType): void {
    if (errorDesc) {
      this.showError(Msal.authority, error, errorDesc);
    } else {
      this.callGraphApi();
    }
  }

  showError(_endpoint, error, _errorDesc): void {
    let formattedError = JSON.stringify(error, undefined, 4);
    if (formattedError.length < 3) {
      formattedError = error;
    }
    console.error(error);
  }

  callWebApiWithToken(endpoint, token, responseElement, showTokenElement): void {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);
    const options = {
      headers,
      method: 'GET'
    };

    fetch(endpoint, options)
    .then((response: any) => {
      const contentType = response.headers.get('content-type');
      if (response.status === 200 && contentType && contentType.indexOf('application/json') !== -1) {
        response.json()
        .then((data: any) => {
          // Display response in the page
          console.log(data);
          responseElement.innerHTML = JSON.stringify(data, undefined, 4);
          if (showTokenElement) {
            showTokenElement.parentElement.classList.remove('hidden');
            showTokenElement.innerHTML = token;
          }
        })
        .catch((error: any) => {
          this.showError(endpoint, error, undefined);
        });
      } else {
        response.json()
        .then((data: any) => {
          this.showError(endpoint, data, undefined);
        })
        .catch((error: any) => {
          this.showError(endpoint, error, undefined);
        });
      }
    })
    .catch((error: any) => {
      this.showError(endpoint, error, undefined);
    });
  }

  signOut(): void {
    this._userAgentApplication.logout();
  }

}
