import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';

declare var hello;

@Component({
  selector: 'github-login-button',
  template: `
    <button mat-button (click)="login()">
      <mat-icon svgIcon="github"></mat-icon>
      <span>Login with Github</span>
    </button>`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubLoginButtonComponent implements AfterViewInit {

  @Input()
  public clientId: string;

  @Output()
  public twitterLoginSuccess = new EventEmitter();

  @Output()
  public twitterLoginFailure = new EventEmitter();

  ngAfterViewInit(): void {
    hello.init({
      github: this.clientId
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
    hello('github')
    .login();
  }
}
