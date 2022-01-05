import heart from '../../assets/sound/heartbeat.mp3';
// import win from 'assets/sound/bigWin.wav';
import RollingDice from '../../assets/sound/Dice2.wav';
import bigWin from '../../assets/sound/bigWin.wav';
import bigLoose from '../../assets/sound/bigLoose.wav';

export { heart, bigWin, bigLoose };

export const Sound = (audioSource, play, loop) => {
	const audio = new Audio(audioSource);

	audio.loop = loop;

	if (play) {
		audio.play();
	}
};

// export const rollingDiceSound = new Audio(RollingDice);
export const rollingDiceSound = new Audio(heart);
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

		audio.playbackRate = playbackRate;
		const promise = audio.play();
		console.log('promise', promise);

		if (promise !== undefined) {
			// On older browsers play() does not return anything, so the value would be undefined.
			promise
				.then(() => {
					console.log('audio is playing');
					// Audio is playing.
				})
				.catch((error) => {
					console.log(error);
				});
		}

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
		// });
	} catch (error) {}
};

//     const promise = this.sound.play();
// if (promise !== undefined) { // On older browsers play() does not return anything, so the value would be undefined.
//   promise
//     .then(() => {
//       // Audio is playing.
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
