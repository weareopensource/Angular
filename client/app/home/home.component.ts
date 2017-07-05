import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TooltipPosition} from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SessionActions } from 'app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // make sure tooltip also works OnPush
})
export class HomeComponent implements OnInit {

  @select(['session', 'token']) Token$: Observable<string>;
  position: TooltipPosition = 'below';
  message = 'Here is the tooltip';


  constructor(private actions: SessionActions) { }

  ngOnInit() {
    // this.actions.getProfile();
  }

}
