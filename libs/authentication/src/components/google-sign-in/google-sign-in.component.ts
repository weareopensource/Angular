import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

export class GoogleSignInSuccess {
  public googleUser: gapi.auth2.GoogleUser;

  constructor(googleUser: gapi.auth2.GoogleUser) {
    this.googleUser = googleUser;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class GoogleSignInFailure {
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'google-signin',
  template: `
  <div id="gSignInWrapper">
    <button #signInButton class="customGPlusSignIn" mat-button>
      <mat-icon svgIcon="google"></mat-icon>
      <span>Login with Google</span>
    </button>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSignInComponent implements AfterViewInit {

  @ViewChild('signInButton', { read: ElementRef })
  public signInButton;

  @Input()
  public scope: string;

  private _longTitle: boolean;

  get longTitle(): string {
    return this._longTitle.toString();
  }

  @Input()
  set longTitle(value: string) {
    this._longTitle = Boolean(value);
  }

  @Input()
  public clientId: string;

  @Input()
  public cookiePolicy: string;

  private _fetchBasicProfile: boolean;

  get fetchBasicProfile(): string {
    return this._fetchBasicProfile.toString();
  }

  @Input()
  set fetchBasicProfile(s: string) {
    this._fetchBasicProfile = Boolean(s);
  }

  @Input()
  public hostedDomain: string;

  @Output()
  public googleSignInSuccess = new EventEmitter<GoogleSignInSuccess>();

  @Output()
  public googleSignInFailure = new EventEmitter<GoogleSignInFailure>();

  ngAfterViewInit(): void {
    gapi.load('auth2', () => {
      const oauth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: this.cookiePolicy,
        fetch_basic_profile: this._fetchBasicProfile,
        hosted_domain: this.hostedDomain
      });
      oauth2.attachClickHandler(
        this.signInButton.nativeElement,
        {},
        (googleUser: any) => {
          console.log(
          `Signed in: ${googleUser
            .getBasicProfile()
            .getName()}`);
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
    });
  }
}
