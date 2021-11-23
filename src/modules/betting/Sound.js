import heart from 'assets/sound/heartbeat-regular-single-loop.wav';
// import heart from 'assets/sound/futuristic-heartbeat-60-bpm-7074.mp3';

export const Sound = (imageSource, play, loop) => {
	const audio = new Audio(imageSource);
	audio.loop = loop;

	if (play) {
		audio.play();
	}
};

export const rangeSliderSound = (
	playbackRate,
	play,
	soundFlag?,
	setSoundFlag?
) => {
	const audio = new Audio(heart);

	if (play) {
		if (soundFlag === 0) {
			audio.play();
			setSoundFlag(1);
		}
		audio.addEventListener('ended', function () {
			// console.log('playbackRate', playbackRate);
			// audio.playbackRate = playbackRate;
			// audio.volume = playbackRate;
			audio.play();
		});
	}
};
