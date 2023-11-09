import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
import { WordService } from '../../services/word.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doughnutChart: any;

  constructor(private word:WordService) { }
  ngAfterViewInit() {
    this.doughnutChartMethod();
  }
  ngOnInit() {
  }

  addDataButton(){
    this.word.addWord().then(res=>console.log(res)).catch(err=>console.log(err))
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [ 'Unutmadan Tekrar Et','Öğrenilmiş','Unutulmak Üzere'],
        datasets: [{
          label: 'Kelime Sayısı',
          data: [50, 29, 15],
          backgroundColor: [
            'rgba(244, 255, 0, 0.8)',
            'rgba(0, 255, 32, 0.8)',
            'rgba(255, 0, 0, 0.8)',
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
          ]
          
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white', // Set the label text color to white
            }
          }
        }
      }
    });
  }

}
