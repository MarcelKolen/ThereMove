/* Motion setup */
var a_x;
var a_y;
var a_i;
var datapoints = 0;

var v_x = 0;
var p_x = 0;

var v_y = 0;
var p_y = 0;

function motionHandler(event) {
    a_x = event.acceleration.x;
    a_y = event.acceleration.y;
    a_i = event.interval;

    v_x = v_x + a_x * a_i;
    v_y = v_y + a_y * a_i;
    p_x = p_x + v_x * a_i;
    p_y = p_y + v_y * a_i;

    if (p_x < 0)
        p_x = 0;
    else if (p_x > 10)
        p_x = 10;

    if (p_y < 0)
        p_y = 0;
    else if (p_y > 10)
        p_y = 10;

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