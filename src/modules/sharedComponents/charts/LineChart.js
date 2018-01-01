import Chart from 'chart.js';
import utils from './../utils';

export default class LineChart {
  constructor($canvas, labels, values, config) {
    const $chart = $($canvas);
    const data = {
      labels,
      datasets: [{
        label: config.title || '',
        fill: true,
        lineTension: 0.3,
        backgroundColor: config.backgroundColor || 'rgba(3,169,244 ,.6)',
        borderColor: config.borderColor || 'rgba(3,169,244 ,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'dodgerblue',
        pointBackgroundColor: 'dodgerblue',
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: config.pointHoverBackgroundColor || '#fff',
        pointHoverBorderColor: config.pointHoverBorderColor || '#0077ff',
        pointHoverBorderWidth: config.pointHoverBoderWith || 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values,
        spanGaps: false,
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            callback(label) {
              return `RD$ ${utils.CurrencyFormat(label)}`;
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem) {
            return `RD$  ${utils.CurrencyFormat(tooltipItem.yLabel)}`;
          }
        }
      }
    };

    this.chart = new Chart($chart, {
      type: 'line',
      data,
      options
    });
  }

  update(values) {
    this.chart.config.data.datasets[0].data = values;
    this.chart.update();
  }
}
