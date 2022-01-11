
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import RollingDice from "assets/icons/twoRollingDice.gif";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { heart, rollingDiceSound } from '../Sound';


import {
    ModalBody,
    ModalContent,
    Image,
    InfoText,
} from "./style";

const WaitingModal = (props: any) => {
    const { show, toggleModal, styles } = props;


    const [play, { stop }] = useSound(heart, { interrupt: true });

    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };


    useEffect(() => {
        let loading = localStorage.getItem("loading") || "";
        try {

            const soundOff = localStorage.getItem("soundOff") || "";
            if (soundOff !== 'true') {

                if (show && (loading !== null || loading !== undefined) && !!rollingDiceSound) {
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
            }

        } catch (error) {
            console.log(error);

        }
    }, [show, rollingDiceSound])

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
