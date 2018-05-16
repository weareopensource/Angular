import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';

declare var hello;

@Component({
  selector: 'twitter-login-button',
  template: `
    <button mat-button (click)="login()">
      <mat-icon svgIcon="twitter"></mat-icon>
      <span>Login with Twitter</span>
    </button>`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwitterLoginButtonComponent implements AfterViewInit {

  @Input()
  public apiKey: string;

  @Input()
  public requestUrl: any;

  @Output()
  public twitterLoginSuccess = new EventEmitter();

  @Output()
  public twitterLoginFailure = new EventEmitter();

  ngAfterViewInit(): void {
    hello.init({
      twitter: this.apiKey
    }, {
      display: 'popup'
    });

    hello.on('auth.login', (auth: any) => {
      hello(auth.network)
      .api('me')
      .then((r: any) => {
        console.log(r);
      });
    });
  }

  login(): void {
    hello
    .login('twitter', { response_type: 'token' });
  }
}
