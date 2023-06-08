/* ======= Custom Tooltip ====== */
const customTooltips = function (context) {
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.className = "chartjs-tooltip";
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body, i) {
      const colors = tooltipModel.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      style += "; border-radius: 30px";
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });
    innerHtml += '</tbody>';

    let tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const toolTip = document.querySelector('.chartjs-tooltip');
  const position = context.chart.canvas.getBoundingClientRect();
  const toolTipHeight = toolTip.clientHeight;
  const rtl = document.querySelector('html[dir="rtl"]');


  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX - (rtl !== null ? toolTip.clientWidth : 0)}px`;
  tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY-(tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
  tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
}

/* Index Page */

/* ======= Bar chart ======= */
function chartjsBarChart(selector, height) {
  let delayed;
  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart, legend, options) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return this.height += 24;
      }
    }
  };
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = window.innerWidth <= 575 ? 250 : height;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [35, 20, 10, 20, 50, 35, 35, 10, 20, 50, 35, 40],
            backgroundColor: "#00AAFF",
            hoverBackgroundColor: "#00AAFF80",
            label: "Impression",
            borderRadius: 2,
            barPercentage: 0.17,
          },
          {
            data: [10, 10, 10, 5, 10, 5, 10, 10, 10, 10, 5, 20],
            backgroundColor: "#5840FF",
            hoverBackgroundColor: "#5840FF80",
            label: "Engagement",
            borderRadius: 2,
            barPercentage: 0.17
          },
          {
            data: [15, 20, 5, 5, 15, 5, 15, 15, 20, 5, 5, 20],
            backgroundColor: "#00E4EC",
            hoverBackgroundColor: "#00E4EC80",
            label: "Reach",
            borderRadius: 2,
            barPercentage: 0.17
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
          mode: 'index',
        },
        plugins: {
          legend: {
            position: "top",
            align: "center",
            labels: {
              usePointStyle: true,
              color: "#8C90A4",
              textAlign: 'center',
              boxWidth: 20,
              boxHeight: 6,
              maxHeight: 100,
              pointStyleWidth: 8,
              padding: 25,
              family:"Jost, sans-serif",
              font: {
                size: 14,
                weight: 400,
              },
            },
          },
          tooltip: {
            usePointStyle: true,
            enabled: false,
            external: customTooltips,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return `<span class="data-label">${label}K</span>`;
              }
            },
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 200 + context.datasetIndex * 50;
            }
            return delay;
          },
        },
        layout: {
          padding: {
            left: -13,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          y: {
            stacked: true,
            grid: {
              color: "#E3E6EF",
              borderDash: [3, 3],
              zeroLineColor: "#E3E6EF",
              zeroLineWidth: 1,
              zeroLineBorderDash: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              font: {
                size: 14,
              },
              color: "#8C90A4",
              padding: 15,
              max: 80,
              stepSize: 20,
              callback(value, index, values) {
                return `${value}k`;
              },
            },
          },
          x: {
            stacked: true,
            grid: {
              display: true,
              zeroLineWidth: 2,
              zeroLineColor: "transparent",
              color: "transparent",
              tickMarkLength: 10,
            },
            ticks: {
              beginAtZero: true,
              font: {
                size: 14,
              },
              color: "#8C90A4",
            },
          },
        },
      },
      plugins: [legendMargin]
    });
  }
}
chartjsBarChart("barChart", "107");

/* ======= Line chart ======= */
function chartjsAreaChart(selector, height) {
  let delayed;
  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart, legend, options) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return this.height += 24;
      }
    }
  };
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = window.innerWidth <= 575 ? 250 : height;
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [{
            data: [14, 25, 18, 30, 25, 35, 20, 35, 20, 25, 20, 35],
            borderColor: "#5840FF50",
            label: "Facebook",
            borderWidth: 1,
            fill: true,
            backgroundColor: "#5840FF",
            hoverBackgroundColor: "#5840FF50",
            tension: 0.4,
            pointHoverBorderColor: 'white',
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHitRadius: 30,
            pointStyle: 'circle',
            pointHoverBorderWidth: 2,
          },
          {
            data: [6, 10, 8, 5, 10, 8, 10, 5, 10, 5, 10, 10],
            borderColor: "#00E4EC50",
            borderWidth: 1,
            label: "Instagram",
            fill: true,
            backgroundColor: "#00E4EC",
            hoverBackgroundColor: "#00E4EC50",
            tension: 0.4,
            pointHoverBorderColor: 'white',
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHitRadius: 30,
            pointStyle: 'circle',
            pointHoverBorderWidth: 2,
          },
          {
            data: [10, 10, 10, 20, 15, 20, 15, 20, 15, 20, 15, 15],
            borderColor: "#00AAFF50",
            label: "Twitter",
            borderWidth: 1,
            fill: true,
            backgroundColor: "#00AAFF",
            hoverBackgroundColor: "#00AAFF80",
            tension: 0.4,
            pointHoverBorderColor: 'white',
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHitRadius: 30,
            pointStyle: 'circle',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
          mode: 'index',
        },
        plugins: {
          legend: {
            position: "top",
            align: "center",
            labels: {
              usePointStyle: true,
              color: "#8C90A4",
              textAlign: 'center',
              boxWidth: 20,
              boxHeight: 6,
              maxHeight: 100,
              pointStyleWidth: 8,
              padding: 25,
              family:"Jost, sans-serif",
              font: {
                size: 14,
                weight: 400,
              },
            },
          },
          tooltip: {
            usePointStyle: true,
            enabled: false,
            external: customTooltips,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return `<span class="data-label">${label}K</span>`;
              }
            },
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 200 + context.datasetIndex * 50;
            }
            return delay;
          },
        },
        layout: {
          padding: {
            left: -13,
            right: -10,
            top: 0,
            bottom: 0,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            grid: {
              color: "#F1F2F6",
              borderDash: [3, 3],
              zeroLineColor: "#F1F2F6",
              zeroLineWidth: 1,
              zeroLineBorderDash: [3, 3],
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              font: {
                size: 14,
              },
              color: "#8C90A4",
              padding: 15,
              max: 80,
              stepSize: 20,
              callback(value, index, values) {
                return `${value}k`;
              },
            },
          },
          x: {
            stacked: true,
            grid: {
              display: true,
              zeroLineWidth: 2,
              zeroLineColor: "transparent",
              color: "transparent",
              z: 1,
              tickMarkLength: 10,
            },

            ticks: {
              beginAtZero: true,
              font: {
                size: 14,
              },
              color: "#8C90A4",
            },
          },
        },
      },
      plugins: [legendMargin]
    });
  }
}
chartjsAreaChart("areaChart", "146");


/* Chart Page */

/* ======= Bar chart ======= */
function chartjsBarChartVertical(selector, label = "Bar chart vertical") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Profit",
            barPercentage: 0.6,
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lose",
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "top",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          y: {
            grid: {
              color: "#485e9029",
            },
            ticks: {
              beginAtZero: true,
              font: {
                size: 14,
              },
              color: "#182b49",
              max: 80,
              stepSize: 20,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              font: {
                size: 11,
              },
              color: "#182b49",
            },
          },
        },
      },
    });
  }
}
chartjsBarChartVertical("barChartVertical");

/* ======= Line chart ======= */
function chartjsLineChartBasic(selector, bcolor = "#FA8B0C") {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = 200;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
          data: [45, 25, 60, 38, 70, 60, 38, 40, 25, 50, 45, 75],
          borderColor: "#5F63F2",
          borderWidth: 3,
          fill: false,
          backgroundColor: "#5F63F210",
          label: "Current period",
          pointStyle: "circle",
          pointRadius: "0",
          hoverRadius: "6",
          pointBorderColor: "#fff",
          pointBackgroundColor: "#5F63F2",
          hoverBorderWidth: 3,
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            stacked: false,
            grid: {
              display: true,
              color: "#485e9029",
            },
            ticks: {
              beginAtZero: false,
              font: {
                size: 14,
              },
              display: true,
              suggestedMin: 50,
              suggestedMax: 80,
              stepSize: 20,
              callback: function (label, index, labels) {
                return label + "k";
              },
            },
          },
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              beginAtZero: false,
              font: {
                size: 14,
              },
              display: true,
            },
          },
        },
      },
    });
  }
}
chartjsLineChartBasic("lineChartBasic");

/* Profile page */

/* ======= Bar chart three ======= */
function chartJsBarChartThree(
  selector,
  data,
  bgColor = "#5F63F210",
  hBgColor = "#5F63F2",
  label = "chart label",
  height = "94"
) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = height;
    ctx.width = 130;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          label: label,
          data: data,
          backgroundColor: bgColor,
          hoverBackgroundColor: hBgColor,
          barPercentage: 1,
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
              color: "#8C90A4",
              textAlign: 'center',
              boxWidth: 20,
              boxHeight: 6,
              maxHeight: 100,
              pointStyleWidth: 8,
              padding: 25,
              family:"Jost, sans-serif",
              font: {
                size: 14,
                weight: 400,
              },
            },
          },
          tooltip: {
            usePointStyle: true,
            enabled: false,
            external: customTooltips,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return `<span class="data-label">${label}K</span>`;
              }
            },
          },
        },
        scales: {
          y: {
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  }
}
chartJsBarChartThree(
  "profileBar",
  ([20, 60, 50, 45, 50, 60, 70]),
  "#5F63F220",
  "#5F63F2",
  "Order",
  "94"
);
chartJsBarChartThree(
  "profileBar2",
  ([20, 60, 50, 45, 50, 60, 70]),
  "#00E4EC20",
  "#00E4EC",
  "Order",
  "94"
);
chartJsBarChartThree(
  "profileBar3",
  ([20, 60, 50, 45, 50, 60, 70]),
  "#01B81A20",
  "#01B81A",
  "Order",
  "94"
);
