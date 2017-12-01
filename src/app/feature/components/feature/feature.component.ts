import { Component, ViewChild, ElementRef, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  @HostBinding('class.mat-typography')
  matTypo() { return true; }
  @HostBinding('class.m2-light-theme')
  matTheme() { return true; }
}
