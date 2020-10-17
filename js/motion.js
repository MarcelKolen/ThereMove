/* Motion setup */
var a_x;
var a_y;
var a_i;
var datapoints = 0;

var v_x = 0;
var p_x = 0;

var v_y = 0;
var p_y = 0;

var amplifier = 1;
var maxSpeed = 10;

$(document).on("input", "#max-speed", function () {
    maxSpeed = parseInt($(this).val());
});

$(document).on("input", "#acceleration-amplifier", function () {
    amplifier = parseInt($(this).val());
});

function speedCap(speedcap = 10) {
    if (v_x < -speedcap)
        v_x = 0;
    else if (v_x > speedcap)
        v_x = 10;

    if (v_y < -speedcap)
        v_y = 0;
    else if (v_y > speedcap)
        v_y = 10;
}

function posCap(poscap = 10) {
    if (p_x < 0)
        p_x = 0;
    else if (p_x > poscap)
        p_x = 10;

    if (p_y < 0)
        p_y = 0;
    else if (p_y > poscap)
        p_y = 10;
}

function standardMapping(amplifier = 1, speedcap = 10, poscap = 10) {
    v_x = v_x + a_x * amplifier * a_i;
    v_y = v_y + a_y * amplifier * a_i;

    speedCap(maxSpeed);

    p_x = p_x + v_x * a_i;
    p_y = p_y + v_y * a_i;

    posCap(poscap);
}

function motionHandler(event) {
    a_x = event.acceleration.x;
    a_y = event.acceleration.y;
    a_i = event.interval;

    standardMapping(amplifier);

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