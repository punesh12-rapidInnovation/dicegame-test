
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
import { useSelector } from "react-redux";


const LooseModal = (props: any) => {
    const { show, toggleModal, styles, ResultObject, LossAmount } = props;
    const { userAddress } = useSelector((state: any) => state.wallet);


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };


    useEffect(() => {

        try {
            if (show)
                betLooseSound.play();
            else
                betLooseSound.removeEventListener('ended', () => {
                    betLooseSound.pause();
                    betLooseSound.currentTime = 0;
                });


        } catch (error) {

        }


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
                    <p>You’ve lost {
                        userAddress && userAddress.toUpperCase() === ResultObject?.Playeraddress.toUpperCase() ?
                            Number(LossAmount).toFixed(6)
                            : 0
                    } pulse coins</p>
                    <img className="sadFace" src={sadFace} alt="coins" />
                    <img
                        className="treasureBox"
                        style={{ marginTop: "-20%", height: '65px', }}
                        src={CloseTreasureBox} alt="coins" />
                </WinAmountContainer>

                <DiceCont>
                    <RearDice>
                        <img src={Diceback} alt="" />
                    </RearDice>
                    <FrontDice>
                        <p>{
                            userAddress && userAddress.toUpperCase() === ResultObject?.Playeraddress.toUpperCase() && ResultObject.Diceresult
                        } </p>
                        <img src={DiceFront} alt="" />
                    </FrontDice>
                </DiceCont>

                <Text>
                    Better Luck Next Time!!!
                </Text>
                <PrimaryButton
                    width="50%"
                    onClick={() => toggleModal()}
                >REPLAY</PrimaryButton>

            </ModalContent>

        </ModalBody>
    );
};
export default LooseModal;
