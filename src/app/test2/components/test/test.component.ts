import { Component, ViewChild, ElementRef, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @HostBinding('class.mat-typography')
  matTypo() { return true; }
  @HostBinding('class.m2-light-theme')
  matTheme() { return true; }
}
