import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-doughnut',
  templateUrl: './grafico-doughnut.component.html',
  styles: [
  ]
})
export class GraficoDoughnutComponent implements OnInit {

  // Doughnut
  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  @Input() doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];

  @Input() doughnutChartType: ChartType = 'doughnut';

  @Input() leyenda: string;

  constructor() { }

  ngOnInit(): void {
  }



}
