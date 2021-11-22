
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import Dice from "assets/icons/loadingDice.svg";


import { useDispatch } from "react-redux";
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
                    style={{ marginBottom: "20px" }}
                    height={"60px"}
                    src={PulseRoll} />
                <Image src={Dice} />

                <InfoText>
                    Result is loading...
                </InfoText>
            </ModalContent>

        </ModalBody>
    );
};
export default WaitingModal;
