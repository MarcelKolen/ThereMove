$(document).on("input", "#volume-range", function () {
    volumeRange = $(this).val();
    updateVolumeActual(volumeRange, 100);
});

$(document).on("input", "#pitch-range", function () {
    pitchRange = $(this).val();
    updatePitchActual(pitchRange, 100);
});

$(document).on("input", ".pitch-min", function () {
    pitchMin = parseInt($(this).val());
    updatePitchActual(pitchRange, 100);
});

$(document).on("input", ".pitch-max", function () {
    pitchMax = parseInt($(this).val());
    updatePitchActual(pitchRange, 100);
});

/* Slider run function */

function sliderPage() {
    if ($("#slider-music").prop("checked")) {
        if (volumeActual > 0)
            soundRunning = true
        if (soundRunning) {
            synth.triggerAttack(pitchActual, now);
            synth.volume.rampTo(volumeActual, 0.1);
        }
        soundEnabled = true;
    } else {
        synth.triggerRelease(now);
        soundEnabled = false;
        soundRunning = false;
    }
}