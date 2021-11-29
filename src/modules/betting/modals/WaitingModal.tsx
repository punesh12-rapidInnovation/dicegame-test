
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import RollingDice from "assets/icons/twoRollingDice.gif";
import { useEffect, useState } from "react";
import { rollingDiceSound } from '../Sound';


import {
    ModalBody,
    ModalContent,
    Image,
    InfoText,
} from "./style";



// const useAudio = url => {
//     const [audio] = useState(new Audio(url));
//     const [playing, setPlaying] = useState(false);

//     const play = () => setPlaying(true);
//     const stop = () => setPlaying(false);

//     useEffect(() => {
//         playing ? audio.play() : audio.pause();
//     },
//         [playing]
//     );

//     useEffect(() => {
//         audio.addEventListener('ended', () => setPlaying(false));
//         return () => {
//             audio.removeEventListener('ended', () => setPlaying(false));
//         };
//     }, []);

//     return [playing, play, stop];
// };

const WaitingModal = (props: any) => {
    const { show, toggleModal, styles } = props;


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };

    useEffect(() => {
        if (show) {
            rollingDiceSound.play();
            rollingDiceSound.loop = true;
        }
        else {
            rollingDiceSound.loop = false;
            rollingDiceSound.removeEventListener('ended', () => {
                rollingDiceSound.pause();
                rollingDiceSound.currentTime = 0;
                rollingDiceSound.src = ""
            });
        }
    })

    return (
        <ModalBody
            show={show}
            onMouseDown={handleClickOutside}
            style={{ ...styles }}
        >
            <ModalContent>
                <Image
                    style={{ marginBottom: "10px" }}
                    src={PulseRoll} />
                <Image
                    height={"200px"}
                    style={{ margin: "-30px", marginBottom: "5px" }}

                    src={RollingDice} />
                {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}

                <InfoText>
                    Result is loading...
                </InfoText>
            </ModalContent>

        </ModalBody>
    );
};
export default WaitingModal;
