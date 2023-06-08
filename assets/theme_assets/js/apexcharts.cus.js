
/* Donut Chart */
function donutChart(idName,series, width, height) {
  var optionDonut = {
    chart: {
      type: 'donut',
      width: width,
      height: height,
      stacked: true,
      animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      },
    },
    colors: ['#5840FF', '#FA8B0C', '#00E4EC'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '58%',
        },
        offsetY: 20,
      },
    },
    stroke: {
      show:false,
    },
    series: series,
    labels: ['Like', 'Comments', 'Share'],
    legend: {
      position: 'right',
      horizontalAlign: 'center',
      offsetY: 0,
      fontSize: '16px',
      fontFamily: 'Jost, sans-serif',
      fontWeight: 400,
      labels: {
        colors: '#8C90A4',
      },
      markers: {
        width: 7,
        height: 7,
        radius: 20,
        offsetX: -4,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10
      }
    }
  }
  if ($(idName).length > 0) {
    new ApexCharts(document.querySelector(idName), optionDonut).render();
  }
}

donutChart('#apexDonutChart',[60,30,10,],'100%',285);