import { browser, by } from 'protractor';

export class AppPage {
  navigateTo(): any {
    return browser.get('/');
  }

  text(): any {
    return browser
    .findElement(by.css('body'))
    .getText();
  }
}
