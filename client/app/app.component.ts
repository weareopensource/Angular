import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isToggled: boolean;
  isNormalScreen:boolean=true;

  constructor() { }

}
