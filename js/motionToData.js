var mapAccel = true;
var mapSpeed = false;
var mapPos = false;

function setChartSize(size = 50) {
    chart.options.scales.yAxes[0].ticks.suggestedMax = size;
    chart.options.scales.yAxes[0].ticks.suggestedMin = -size;
}

function motionToDataHandler(event) {
    motionHandler(event);

    if (chart.data.datasets[0].data.length > chartSize || chart.data.datasets[1].data.length > chartSize)
        resetChart();

    if (mapAccel) {
        chart.data.datasets[0].data.push(a_x);
        chart.data.datasets[1].data.push(a_y);
    } else if (mapSpeed) {
        chart.data.datasets[0].data.push(v_x);
        chart.data.datasets[1].data.push(v_y);
    } else if (mapPos) {
        chart.data.datasets[0].data.push(p_x);
        chart.data.datasets[1].data.push(p_y);
    }

    chart.update();
}

function movementToDataPage() {
    if ($("#slider-data-MTD").prop("checked")) {
        requestMotionPermission();

        window.addEventListener("devicemotion", motionToDataHandler);
    } else {
        window.removeEventListener("devicemotion", motionToDataHandler);
    }
}

$("#accel-btn").click(function (e) {
    e.preventDefault();
    $(this).removeClass("btn-outline-danger").addClass("btn-danger");
    $("#speed-btn").removeClass("btn-warning").addClass("btn-outline-warning");
    $("#pos-btn").removeClass("btn-success").addClass("btn-outline-success");

    chart.data.datasets[0].label = "Acceleration X";
    chart.data.datasets[1].label = "Acceleration Y";

    mapAccel = true;
    mapSpeed = false;
    mapPos = false;

    setChartSize(1);
    resetChart();
})

$("#speed-btn").click(function (e) {
    e.preventDefault();
    $(this).removeClass("btn-outline-warning").addClass("btn-warning");
    $("#accel-btn").removeClass("btn-danger").addClass("btn-outline-danger");
    $("#pos-btn").removeClass("btn-success").addClass("btn-outline-success");

    chart.data.datasets[0].label = "Speed X";
    chart.data.datasets[1].label = "Speed Y";

    mapAccel = false;
    mapSpeed = true;
    mapPos = false;

    setChartSize(maxSpeed);
    resetChart();
})

$("#pos-btn").click(function (e) {
    e.preventDefault();
    $(this).removeClass("btn-outline-success").addClass("btn-success");
    $("#accel-btn").removeClass("btn-danger").addClass("btn-outline-danger");
    $("#speed-btn").removeClass("btn-warning").addClass("btn-outline-warning");

    chart.data.datasets[0].label = "Position X";
    chart.data.datasets[1].label = "Position Y";

    mapAccel = false;
    mapSpeed = false;
    mapPos = true;

    setChartSize(10);
    resetChart();
})