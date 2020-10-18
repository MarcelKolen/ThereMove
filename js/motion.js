/* Motion setup */
var a_x;
var a_y;
var a_i;
var datapoints = 0;

var v_x = 0;
var p_x = 0;

var v_y = 0;
var p_y = 5;

var amplifier = 1;
var maxSpeed = 10;
var deadzone = 0.1;
var forceSpeedToZero = false;
var forceSpeedToZeroFactor = 0.1;

$(document).on("input", "#max-speed", function () {
    maxSpeed = parseInt($(this).val());
    if (isNaN(maxSpeed))
        maxSpeed = 10;
    setChartSize(maxSpeed);
});

$(document).on("input", "#acceleration-amplifier", function () {
    amplifier = parseFloat($(this).val());
});

$(document).on("input", "#deadzone", function () {
    deadzone = parseFloat($(this).val());
});

$(document).on("input", "#force-Speed-To-Zero-Factor", function () {
    forceSpeedToZeroFactor = parseFloat($(this).val());
});

$("#slider-force-Speed-To-Zero").click(function (e) {
    if ($(this).prop("checked")) {
        forceSpeedToZero = true;
        alert("Gaat naar kut 0");
    } else {
        forceSpeedToZero = false;
        alert("Gaat niet naar kut 0");
    }
})

function speedCap(speedcap = 10) {
    if (v_x < -speedcap)
        v_x = -speedcap;
    else if (v_x > speedcap)
        v_x = speedcap;

    if (v_y < -speedcap)
        v_y = -speedcap;
    else if (v_y > speedcap)
        v_y = speedcap;
}

function posCap(poscap = 10) {
    if (p_x < 0)
        p_x = 0;
    else if (p_x > poscap)
        p_x = poscap;

    if (p_y < 0)
        p_y = 0;
    else if (p_y > poscap)
        p_y = poscap;
}

function standardMapping() {
    v_x = v_x + a_x;
    v_y = v_y + a_y;

    speedCap(maxSpeed);

    if (forceSpeedToZero) {
        if (v_x > 0) {
            v_x = v_x - forceSpeedToZeroFactor;
        } else if (v_x < 0) {
            v_x = v_x + forceSpeedToZeroFactor;
        }

        if (v_y > 0) {
            v_y = v_y - forceSpeedToZeroFactor;
        } else if (v_y < 0) {
            v_y = v_y + forceSpeedToZeroFactor;
        }
    }

    p_x = p_x + v_x;
    p_y = p_y + v_y;

    posCap(10);
}

function motionHandler(event) {
    a_x = event.acceleration.x;
    a_y = event.acceleration.y;

    if (deadzone !== 0) {
        if (Math.abs(a_x) < deadzone)
            a_x = 0;
        if (Math.abs(a_y) < deadzone)
            a_y = 0;
    }

    a_x = a_x * amplifier;
    a_y = a_y * amplifier;
    a_i = event.interval;

    standardMapping();

    datapoints += 1;
}

var accessRequestFault = false;

function requestMotionPermission() {
    if (!accessRequestFault && typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent.requestPermission) === "function") {
        DeviceMotionEvent.requestPermission().then(response => {
            // (optional) Do something after API prompt dismissed.
            if (response !== "granted") {
                alert("Warning: Your device has either blocked access to your movement devices or does not have them.");
                alert("This application requires data from the accelerometer to function correctly.");
                accessRequestFault = true;
            }
        })
    }
}