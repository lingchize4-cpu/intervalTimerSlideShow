// metronome.js

let metroTimer = null;
let BPM = 30;
let audioCtx = null;
let bpmVol = 1;

function playBeep(freq = 60, duration = 0.3, volume = bpmVol) {
    if (!audioCtx) audioCtx = new AudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playBeat() {
    playBeep(60);
}

export function startMetronome(bpm = 120) {
    BPM = bpm;
    stopMetronome();
    metroTimer = setInterval(playBeat, 60000 / BPM);
}

export function stopMetronome() {
    clearInterval(metroTimer);
}

export function playHighBeep() {
    playBeep(380, 0.5, 1);
}
