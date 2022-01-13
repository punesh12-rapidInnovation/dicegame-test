
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import RollingDice from "assets/icons/twoRollingDice.gif";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { heart, rollingDiceSound } from '../Sound';

import Hear from 'assets/sound/HumanHeart.mp3'


import {
    ModalBody,
    ModalContent,
    Image,
    InfoText,
} from "./style";

const WaitingModal = (props: any) => {
    const { show, toggleModal, styles } = props;

    const rollingDiceSound = new Audio(Hear);
    rollingDiceSound.preload = 'metadata'

    // const [play, { stop }] = useSound(heart, { interrupt: true });

    // const handleClickOutside = (e: any) => {
    //     if (e.target === e.currentTarget) {
    //         toggleModal();
    //     }
    // };

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const soundOff = localStorage.getItem("soundOff") || "";
                if (soundOff !== 'true') {

                    if (show) {
                        rollingDiceSound.play();
                        rollingDiceSound.loop = true;
                        // play();

                    }
                    else {
                        rollingDiceSound.loop = false;
                        rollingDiceSound.removeEventListener('ended', () => {
                            rollingDiceSound.pause();
                            rollingDiceSound.currentTime = 0;
                            rollingDiceSound.src = ""
                        });
                        // stop();
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [show]);


    return (
        <ModalBody
            show={show}
            style={{ ...styles }}
        >
            <ModalContent>
                <Image
                    style={{ marginBottom: "10px" }}
                    src={PulseRoll} />
                <Image
                    className="rollingDice"
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
