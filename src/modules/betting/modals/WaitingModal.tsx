
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import RollingDice from "assets/icons/twoRollingDice.gif";
import { useEffect } from "react";
import { rollingDiceSound } from '../Sound';

import {
    ModalBody,
    ModalContent,
    Image,
    InfoText,
} from "./style";

const WaitingModal = (props: any) => {
    const { show, toggleModal, styles } = props;

    // const [play, { stop }] = useSound(heart, { interrupt: true });

    // const handleClickOutside = (e: any) => {
    //     if (e.target === e.currentTarget) {
    //         toggleModal();
    //     }
    // };

    const doubleClick = () => {
        return console.log('double click');
    }

    useEffect(() => {
        /*
            Modern browsers autoplay policy will not allow web application to autoplay any audio/video without user interaction.
        */
        if (show)
            window.addEventListener('load', () => {
                //@ts-ignore
                document.getElementById('modalBody').addEventListener("doubleClick", (e) => {
                    // alert("Test successful");
                    console.log('doubleclick');
                });
            })
    })


    useEffect(() => {

        // document.addEventListener("dblclick", doubleClick);  // trigger double click to autoplay audio/video after reload.

        try {
            const soundOff = localStorage.getItem("soundOff") || "";
            if (soundOff !== 'true') {

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
            }
        } catch (error) {
            console.log(error);

        }
    })


    return (
        <ModalBody
            id='modalBody'
            show={show}
            style={{ ...styles }}
        >
            <ModalContent>
                <Image
                    style={{ marginBottom: "10px" }}
                    src={PulseRoll}
                />
                <Image
                    className="rollingDice"
                    height={"200px"}
                    style={{ margin: "-30px", marginBottom: "5px" }}
                    id="testTarget"

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
