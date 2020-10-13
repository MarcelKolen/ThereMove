function motionToSoundHandler(event) {
    motionHandler(event);

    updatePitchActual(p_x * 10);
    updateVolumeActual(p_y * 10);

    updateMovementToSoundFields();
}

function movementToSoundPage() {
    if ($("#slider-music-MTM").prop("checked")) {
        requestMotionPermission();

        if (volumeActual > 0)
            soundRunning = true
        if (soundRunning) {
            synth.triggerAttack(pitchActual, now);
            synth.volume.rampTo(volumeActual, 0.1);
        }
        soundEnabled = true;

        window.addEventListener("devicemotion", motionToSoundHandler);
    } else {
        window.removeEventListener("devicemotion", motionToSoundHandler);
        synth.triggerRelease(now);
        soundEnabled = false;
        soundRunning = false;
    }
}