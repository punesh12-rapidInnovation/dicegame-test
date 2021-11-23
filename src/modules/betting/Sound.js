import heart from 'assets/sound/HumanHeart.wav';
// import heart from 'assets/sound/futuristic-heartbeat-60-bpm-7074.mp3';

export const Sound = (loop, playbackRate, play) => {
	const audio = new Audio(heart);
	audio.loop = loop;
	// audio.playbackRate = playbackRate;
	// audio.volume = playbackRate;
	if (play) {
		audio.addEventListener('ended', function () {
			// audio.pause();
			// audio.currentTime = 0;
			audio.play();
		});
		audio.play();
	}
};
