const synth = new Tone.Synth().toDestination();
const now = Tone.now()

const volumeMax = 10;
const volumeMin = 0;
var volumeRange = 100;
var volumeActual = 10;

var pitchMax = 500;
var pitchMin = 80;
var pitchRange = 0;
var pitchActual = 0;

var soundEnabled = false;
var soundRunning = false;

$(document).on("input", ".pitch-min", function () {
    pitchMin = parseInt($(this).val());
    updatePitchActual(pitchRange, 100);
});

$(document).on("input", ".pitch-max", function () {
    pitchMax = parseInt($(this).val());
    updatePitchActual(pitchRange, 100);
});

/* Sound running functions */

function updateVolumeActual(volumeRange, volumeRangeSize = 100) {
    volumeActual = Math.round(volumeMin + ((volumeMax - volumeMin) * (volumeRange / volumeRangeSize)));
    $(".volume-data").val(volumeActual);

    if (soundEnabled) {
        if (volumeActual === 0) {
            if (soundRunning) {
                synth.triggerRelease(now);
                soundRunning = false;
            }
        } else {
            if (soundRunning)
                synth.volume.rampTo(volumeActual, 0.1);
            else {
                synth.triggerAttack(pitchActual, now);
                soundRunning = true;
            }
        }
    }
}

function updatePitchActual(pitchRange, pitchRangeSize = 100) {
    pitchActual = Math.round(pitchMin + ((pitchMax - pitchMin) * (pitchRange / pitchRangeSize)));
    $(".pitch-data").val(pitchActual + " Hz");

    if (soundEnabled) {
        synth.frequency.rampTo(pitchActual, 0.1);
    }
}