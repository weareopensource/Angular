import { Component } from '@angular/core';
import { FeatureShared } from 'app/feature/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private featureShared: FeatureShared) {
    featureShared.log(`let's do some usefull stuff`);
  }
}
