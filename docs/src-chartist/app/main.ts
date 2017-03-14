import '../css/chartist.css!css';
import Chartist = require('chartist');
import domready = require('domready');

domready(() => {
  // Ex1. Line
  (() => {
    new Chartist.Line('#chart1', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    },
      {
        fullWidth: true,
        chartPadding: {
          right: 40
        },
        width: '600px',
        height: '400px'
      });
  })();

  // Ex2. Pie
  (() => {
    var data = {
      series: [5, 3, 4]
    };

    var sum = function (a: number, b: number) { return a + b };

    new Chartist.Pie('#chart2', data, {
      labelInterpolationFnc: function (value: number) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });
  })();

  // Ex3. Bar
  (() => {
    new Chartist.Bar('#chart3', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      series: [
        [5, 4, 3, 7, 5, 10, 3],
        [3, 2, 9, 5, 4, 6, 4]
      ]
    }, {
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        },
        width: '600px',
        height: '400px'
      });
  })();
});