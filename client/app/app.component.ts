import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { ToggleNavService } from './core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ToggleNavService]
})
export class AppComponent {
  @select(['session', 'toggleSideNav']) isToggled$: Observable<string>;

  constructor() { }

}
