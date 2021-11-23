import heart from 'assets/sound/heartbeat-regular-single-loop.wav';
// import win from 'assets/sound/bigWin.wav';

export const Sound = (audioSource, play, loop) => {
	const audio = new Audio(audioSource);
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
