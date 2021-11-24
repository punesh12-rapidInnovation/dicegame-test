
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


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };

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

                <InfoText>
                    Result is loading...
                </InfoText>
            </ModalContent>

        </ModalBody>
    );
};
export default WaitingModal;
