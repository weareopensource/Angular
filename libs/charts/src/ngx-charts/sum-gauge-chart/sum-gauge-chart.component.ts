import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Chart} from '../../chart.class';
import { formatLabel } from "@swimlane/ngx-charts";
import { nest } from 'd3-collection';
import * as d3 from 'd3';
import * as _ from "lodash";


const defaultOptions = {

};
@Component({
  selector: 'ngx-sum-gauge-chart',
  templateUrl: './sum-gauge-chart.component.html',
  styleUrls: ['./sum-gauge-chart.component.scss']
})
export class SumGaugeChartComponent extends Chart implements OnInit {

  data: any;
  view: any;
  showLegend: boolean = false;
  legendTitle: string = 'Legend';
  gaugeTextValue: string = '';
  colorScheme: any;
  gaugeMin: number = 0;
  gaugeMax: number = 100;
  gaugeUnits: string ;
  gaugeAngleSpan: number = 240;
  gaugeStartAngle: number = -120;
  gaugeShowAxis: boolean = true;
  gaugeLargeSegments: number = 10;
  gaugeSmallSegments: number = 5;
  tooltipDisabled = false;

  // margin
  margin: boolean = false;
  marginSize: any  = {
    top: 5,
    bottom: 0,
    left: 0,
    right: 0
  };

  constructor() {
    super();
    }

    ngOnInit() {
      this.colorScheme = {
        domain: ['#5AA454', '#A10A28']
      };

      this.init();
    }

  init() {
    let oldLength: number;
    let oldLengthMessage = _.find(this.dataInput, function(o) { return o.key === 'oldLength'; });
    let text: string;
    let textMessage = _.find(this.dataInput, function(o) { return o.key === 'text'; });

    oldLengthMessage ? oldLength = oldLengthMessage.message : null;
    textMessage ? text = textMessage.message : null;

    if (!isNaN(oldLength) && text) {
      let gist = text.trim();
      let newLength = gist === '' ? 0 : gist.split(' ').length;

      this.data = [
        {
          "name": "BEFORE",
          "value": oldLength
        },
        {
          "name": "AFTER",
          "value": newLength
        }
      ];
    }
  }
}
