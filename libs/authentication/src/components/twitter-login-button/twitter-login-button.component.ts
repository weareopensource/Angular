import {
  AfterViewInit,
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
  styles: [':host { display: block; }']
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
      redirect_uri : '../redirect.html'
    });
  }

  login(): void {
    hello('twitter')
    .login({ response_type: 'token', scope: ['user'] });
  }
}
