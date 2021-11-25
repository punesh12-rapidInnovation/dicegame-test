
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import Dice from "assets/icons/Vectordice.svg";
import CopyClipboard from "assets/icons/copyClipboard.svg";
import CloseTreasureBox from "assets/icons/closeTreasureBox.svg";
import Coins from "assets/icons/coins.svg";
import sadFace from "assets/icons/sadFace.svg";
import DiceFront from "assets/icons/diceFront.svg";
import Diceback from "assets/icons/diceback.svg";

import {
    ModalBody,
    ModalContent,
    Image,
    InfoText,
    InfoTextSecondary,
    DiceCont,
    Text,
    WinAmountContainer,
    FrontDice,
    RearDice,
} from "./style";
import { PrimaryButton } from "shared/button/Button";
import { colors } from "shared/styles/theme";
import { betLooseSound } from "../Sound";
import { useEffect } from "react";


const LooseModal = (props: any) => {
    const { show, toggleModal, styles, ResultObject, LossAmount } = props;


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };


    useEffect(() => {
        if (show)
            betLooseSound.play();
        else
            betLooseSound.removeEventListener('ended', () => {
                betLooseSound.pause();
                betLooseSound.currentTime = 0;
            });
    }, [show])


    return (
        <ModalBody
            show={show}
            onMouseDown={handleClickOutside}
            style={{ ...styles }}
        >
            <ModalContent>
                <Image
                    // style={{ marginBottom: "20px" }}
                    height={"60px"}
                    src={PulseRoll} />

                <InfoText color={colors.vibrantRed}>Sorry!</InfoText>
                <InfoTextSecondary color={colors.vibrantRed} >you lose!</InfoTextSecondary>
                <WinAmountContainer>
                    <img src={Coins} alt="coins" />
                    <p>You’ve lost {LossAmount} pulse coins</p>
                    <img src={sadFace} alt="coins" />
                    <img
                        style={{ marginTop: "-20%", height: '65px', }}
                        src={CloseTreasureBox} alt="coins" />
                </WinAmountContainer>

                <DiceCont>
                    <RearDice>
                        <img src={Diceback} alt="" />
                    </RearDice>
                    <FrontDice>
                        <p>{!!ResultObject && ResultObject.Diceresult}</p>
                        <img src={DiceFront} alt="" />
                    </FrontDice>
                </DiceCont>

                <Text>
                    Better Luck Next Time!!!
                </Text>


                <PrimaryButton
                    width="50%"
                >REPLAY</PrimaryButton>

            </ModalContent>

        </ModalBody>
    );
};
export default LooseModal;
