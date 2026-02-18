/** 画像をスライドさせるための処理をまとめたもの */

let imageTimer = null;

const rand = (a, b) => Math.random() * (b - a) + a;

export function startSlideshow(imgElement, imageCount, folder, minInterval, maxInterval) {

    function scheduleNext() {
        imageTimer = setTimeout(showNext, rand(minInterval, maxInterval));
    }

    function showNext() {
        const i = Math.floor(Math.random() * imageCount) + 1;
        imgElement.src = `${folder}/Image${i}.jpg`;
        scheduleNext();
    }

    showNext();
}