import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartItem, registerables } from 'chart.js';

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

  constructor(private http: HttpClient) {
    // Register all chart types from Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        console.log('API response:', res); // Debugging the API response

        // Access res.myBudget directly instead of res.data.myBudget
        if (res.myBudget) {
          console.log('myBudget data:', res.myBudget); // Debugging the myBudget data
          for (let i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data.push(res.myBudget[i].budget);
            this.dataSource.labels.push(res.myBudget[i].title);
          }
          console.log('Updated dataSource:', this.dataSource); // Debugging dataSource before chart creation
          this.createChart(this.myChart1.nativeElement, 'Chart 1');
          this.createChart(this.myChart2.nativeElement, 'Chart 2');
        } else {
          console.error('myBudget data not found in the response');
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });
  }

  createChart(canvas: HTMLCanvasElement, chartName: string) {
    const ctx = canvas.getContext('2d') as ChartItem; // Casting to ChartItem

    if (ctx) {
      console.log(`Creating ${chartName}`);  // Debugging to see if chart creation is being called
      new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      console.error(`Failed to get 2D context for ${chartName}`);
    }
  }
}
