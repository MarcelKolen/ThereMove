const chartSize = 200;
var chartLabels = new Array(chartSize);
for (var i = 0; i < chartLabels.length; i++) {
    chartLabels[i] = i + 1;
}

var chartField = $("#movementDataChart")[0].getContext("2d");
var chart = new Chart(chartField, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
        labels: chartLabels,
        datasets: [
            {
                label: "Acceleration X",
                borderColor: 'rgb(255, 99, 132)',
                data: []
            },
            {
                label: "Acceleration Y",
                borderColor: 'rgb(50, 168, 82)',
                data: []
            }
        ]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: -1,
                    suggestedMax: 1
                }
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

function resetChart() {
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];

    chart.update();
}

function setChartSize(size = 50, absolute = false) {
    chart.options.scales.yAxes[0].ticks.suggestedMax = size;
    if (absolute)
        chart.options.scales.yAxes[0].ticks.suggestedMin = 0;
    else
        chart.options.scales.yAxes[0].ticks.suggestedMin = -size;

    chart.update();
}
