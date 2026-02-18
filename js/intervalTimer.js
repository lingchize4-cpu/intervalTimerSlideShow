// intervalTimer.js

import { playHighBeep } from "./metronome.js";

let intervalPhase = 1;
let intervalCount = 0;
let progressTimer = null;

export function stopIntervalTimer() {
    if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
    }
}

export function startIntervalTimer(progressBar, duration1 = 15000, duration2 = 15000,onCountUpdate = null) {

    stopIntervalTimer();

    function animateBar(duration, callback) {
        let startTime = Date.now();
        progressBar.style.width = "0%";

        progressTimer = setInterval(() => {
            let elapsed = Date.now() - startTime;
            let percent = (elapsed / duration) * 100;

            if (percent >= 100) {
                percent = 100;
                clearInterval(progressTimer);
                callback();
            }

            progressBar.style.width = percent + "%";
        }, 50);
    }

    function nextPhase() {
        playHighBeep();

        if (intervalPhase === 1) {
            intervalPhase = 2;
        } else {
            intervalPhase = 1;
            intervalCount++;
            if (onCountUpdate) {
                onCountUpdate(intervalCount); // ← ここで通知
            }
        }

        start();
    }

    function start() {
        if (intervalPhase === 1) {
            animateBar(duration1, nextPhase);
        } else {
            animateBar(duration2, nextPhase);
        }
    }

    start();
}
