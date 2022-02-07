import heart from '../../assets/sound/05-Dramatic-heartbeat.mp3';
import bigLoose from '../../assets/sound/bigLoose.mp3';
import bigWin from '../../assets/sound/bigWin.mp3';
import buttonClick from '../../assets/sound/buttonClick.mp3';
import Dice from '../../assets/sound/Dice-04.mp3';

export { heart, bigWin, bigLoose, buttonClick };

export const Sound = (audioSource, play, loop) => {
	const audio = new Audio(audioSource);

	audio.loop = loop;

	if (play) {
		audio.play();
	}
};

// export const rollingDiceSound = new Audio(RollingDice);
export const rollingDiceSound = new Audio(Dice);
export const betWinSound = new Audio(bigWin);
export const betLooseSound = new Audio(bigLoose);

export const rangeSliderSound = (
	playbackRate,
	play,
	soundFlag,
	setSoundFlag
) => {
	try {
		const audio = new Audio(heart);

		console.log('audio', !audio.ended);
		if (!audio.ended) {
			audio.play();
		} else {
			audio.pause();
		}

		// audio.playbackRate = playbackRate;
		// audio.play();

		// if (!audio.paused && !audio.ended) {
		// 	audio.play();
		// } else {
		// 	// audio.pause();
		// 	audio.addEventListener('ended', function () {
		// 		audio.play();
		// 	});
		// }

		// if (soundFlag === 0) {
		// 	audio
		// 		.play()
		// 		.then(() => {
		// 			// Audio is playing.
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// 	setSoundFlag(1);
		// }

		// audio.addEventListener('ended', function () {
		// 	// console.log('playbackRate', playbackRate);
		// 	// audio.playbackRate = playbackRate;
		// 	// audio.volume = playbackRate;
		// 	audio.play();
		// 	return audio.pause();
		// });
	} catch (error) {}
};
