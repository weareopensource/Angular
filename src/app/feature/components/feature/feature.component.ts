import { Component } from '@angular/core';
import { FeatureSelectors, FeatureState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  public greeting$ = this.store.select(this.featureSelectors.getGreeting)
  constructor(private store: Store<FeatureState>, private featureSelectors: FeatureSelectors) {}
}
