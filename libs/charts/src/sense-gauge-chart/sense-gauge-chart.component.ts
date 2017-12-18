import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as _ from "lodash";

import { Chart } from '../chart.class';

@Component({
    selector: 'gauge-chart',
    templateUrl: './sense-gauge-chart.component.html',
    styleUrls: ['./sense-gauge-chart.component.scss']
})

export class SenseGaugeChartComponent extends Chart implements OnInit, OnChanges {
    @ViewChild('chart') private chartContainer: ElementRef;
    private data: any;

    constructor() {
        super();
    }

    ngOnInit() {
        d3.select("#GaugeChartComponent").remove();
        this.init();
    }

    ngOnChanges() {
        d3.select("#GaugeChartComponent").remove();
        this.init();
    }

    init() {
        let scoreMessage = _.find(this.dataInput, function(o) { return o.key === 'score'; });

        if (scoreMessage && scoreMessage.message.neg && scoreMessage.message.pos) {
            this.data = scoreMessage.message;
            this.drawChart();
        }
    }

    drawChart() {
        let element = this.chartContainer.nativeElement;
        let svg;
        let chart;
        let arc1;
        let arc2;
        let arc3;
        // Size
        let margin  = {
            top: 5,
            bottom: 0,
            left: 0,
            right: 0
        };
        let width = element.offsetWidth - margin.left - margin.right;
        let height = element.offsetHeight - margin.top - margin.bottom;
        let radius = width / 2;
        let barWidth = 40 * width / 300;
        let chartInset = 10;
        let padRad = 0.025;

        // Orientation of gauge
        let totalPercent = 0.75;
        
        // Data
        let value = 100 - this.data.neg * 100;
        let gaugeMaxValue = 100;
        let percent = value / gaugeMaxValue;
        
        svg = d3.select(element)
            .append("svg")
            .attr("id","GaugeChartComponent")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        chart = svg.append('g')
            .attr('transform', "translate(" + ((width) / 2 + margin.left) + ", " + ((height + margin.top + radius) / 2) + ")");
        
        // Arcs
        chart.append('path')
            .attr('class', "arc chart-first");
        chart.append('path')
            .attr('class', "arc chart-second");
        chart.append('path')
            .attr('class', "arc chart-third");

        arc1 = d3.arc()
            .outerRadius(radius - chartInset)
            .innerRadius(radius - chartInset - barWidth);
        arc2 = d3.arc()
            .outerRadius(radius - chartInset)
            .innerRadius(radius - chartInset - barWidth);
        arc3 = d3.arc()
            .outerRadius(radius - chartInset)
            .innerRadius(radius - chartInset - barWidth);
        
        // Needle
        let Needle = (function() {
            function Needle(el) {
                this.el = el;
                this.len = width / 2.5;
                this.radius = this.len / 8;
              }

            //Helper function that returns the 'd' value to move the needle
            function recalcPointerPos(perc) {
                let thetaRad = percToRad(perc / 2);
                let centerX = 0;
                let centerY = 0;
                let topX = centerX - this.len * Math.cos(thetaRad);
                let topY = centerY - this.len * Math.sin(thetaRad);
                let leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
                let leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
                let rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
                let rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
                                  
                return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
            };
                            
            Needle.prototype.render = function() {
                drawGaugeSections();

                this.el.append('circle')
                    .attr('class', 'needle-center')
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('r', this.radius);
                
                return this.el.append('path')
                        .attr('class', 'needle')
                        .attr('id', 'client-needle')
                        .attr('d', recalcPointerPos.call(this, 0)); 
            };
                            
            Needle.prototype.moveTo = function(perc) {
                let self = this;
                let oldValue = this.perc || 0;
                this.perc = perc;
                            
                // Reset pointer position
                let targetNeedle = this.el.select('.needle');

                this.el.transition()
                    .delay(100)
                    .ease(d3.easeQuad)
                    .duration(200)
                    .select('.needle')
                    .tween('reset-progress', function() {
                        return function(percentOfPercent) {
                            let progress = (1 - percentOfPercent) * oldValue;

                            return targetNeedle.attr('d', recalcPointerPos.call(self, progress));
                        };
                    });
                
                this.el.transition()
                    .delay(300)
                    .ease(d3.easeBounce)
                    .duration(1500)
                    .select('.needle')
                    .tween('progress', function() {
                        return function(percentOfPercent) {
                            let progress = percentOfPercent * perc;

                            return targetNeedle.attr('d', recalcPointerPos.call(self, progress));
                        };
                    });
            };

            return Needle;
        })();

        let needle = new Needle(chart);
        needle.render();
        needle.moveTo(percent);
        
        // Gauge drawing function
        function drawGaugeSections() {
            let perc = 0.5;
            let next_start = totalPercent;
            let arcStartRad = percToRad(next_start);
            let arcEndRad = arcStartRad + percToRad(perc / 3);
            next_start += perc / 3;

            arc1.startAngle(arcStartRad)
                .endAngle(arcEndRad);

            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 3);
            next_start += perc / 3;
        
            arc2.startAngle(arcStartRad + padRad)
                .endAngle(arcEndRad);
        
            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 3);
              
            arc3.startAngle(arcStartRad + padRad)
                .endAngle(arcEndRad);
        
            chart.select(".chart-first")
                .attr('d', arc1);
            chart.select(".chart-second")
                .attr('d', arc2);
            chart.select(".chart-third")
                .attr('d', arc3);
          }

        // Utility functions
        function percToDeg(perc) {
            return perc * 360;
        };
        
        function percToRad(perc) {
            return degToRad(percToDeg(perc));
        };
        
        function degToRad(deg) {
            return deg * Math.PI / 180;
        };
    }
}