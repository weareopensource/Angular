import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TooltipPosition} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // make sure tooltip also works OnPush
})
export class HomeComponent implements OnInit {
  position: TooltipPosition = 'below';
  message: string = 'Here is the tooltip';
  showDelay = 0;
  hideDelay = 1000;
  constructor() {
  }

  ngOnInit() {

   }
}
