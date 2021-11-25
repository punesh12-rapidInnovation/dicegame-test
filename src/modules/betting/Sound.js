import heart from 'assets/sound/heartbeat-regular-single-loop.wav';
// import win from 'assets/sound/bigWin.wav';
import RollingDice from 'assets/sound/Dice2.wav';
import bigWin from 'assets/sound/bigWin.wav';
import bigLoose from 'assets/sound/bigLoose.wav';

export const Sound = (audioSource, play, loop) => {
	const audio = new Audio(audioSource);

	audio.loop = loop;

	if (play) {
		audio.play();
	}
};

export const rollingDiceSound = new Audio(RollingDice);
export const betWinSound = new Audio(bigWin);
export const betLooseSound = new Audio(bigLoose);

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
