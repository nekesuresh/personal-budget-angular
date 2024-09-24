import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('myChart1', { static: true }) myChart1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart2', { static: true }) myChart2!: ElementRef<HTMLCanvasElement>;

  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19'
        ]
      }
    ],
    labels: [] as string[]
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      data.forEach((item: any) => {
        this.dataSource.datasets[0].data.push(item.budget);
        this.dataSource.labels.push(item.title);
      });
      this.createChart(this.myChart1.nativeElement);
      this.createChart(this.myChart2.nativeElement);
    });
  }

  createChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
      });
    }
  }
}
