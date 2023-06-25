import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, 
  ApexYAxis, ApexTitleSubtitle, ApexLegend, ApexResponsive, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { series } from './data-home';
import { ActivatedRoute } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

export type Pie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  public chartOptions!: ChartOptions;
  public pie!: Pie;
  id!: number;

  constructor(private activatedRouter: ActivatedRoute){
    this.id = activatedRouter.snapshot.params["id"];
  }

  ngOnInit(){
    this.graficoArea();
    this.graficoPie();
  }

  graficoArea()
  {
    this.chartOptions = {
      series: [
        {
          name: "STOCK ABC",
          data: series.monthDataSeries1.prices
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Cantidad de Usuarios",
        align: "left"
      },
      subtitle: {
        text: "Usuarios",
        align: "left"
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  graficoPie(){
    this.pie = {
      series: [63,37],
      chart: {
        width: 380,
        type: "pie"
      },
      title: {
        text: "Dsitribución de Usuarios",
        align: "left"
      },
      labels: ["Customers", "Carpenters"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
