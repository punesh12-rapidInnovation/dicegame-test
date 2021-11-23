
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
    UserAddress,
    WinAmountContainer,
    FrontDice,
    RearDice,
} from "./style";
import { PrimaryButton } from "shared/button/Button";
import { colors } from "shared/styles/theme";


const LooseModal = (props: any) => {
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
                    // style={{ marginBottom: "20px" }}
                    height={"60px"}
                    src={PulseRoll} />

                <InfoText color={colors.vibrantRed}>Sorry!</InfoText>
                <InfoTextSecondary>you lose!</InfoTextSecondary>
                <WinAmountContainer>
                    <img src={Coins} alt="coins" />
                    <p>You’ve lost 190 pulse coins</p>
                    <img src={sadFace} alt="coins" />
                    <img
                        style={{ marginTop: "-20%", height: '60px' }}
                        src={CloseTreasureBox} alt="coins" />
                </WinAmountContainer>

                <DiceCont>
                    <RearDice>
                        <img src={Diceback} alt="" />
                    </RearDice>
                    <FrontDice>
                        <p>99</p>
                        <img src={DiceFront} alt="" />
                    </FrontDice>
                </DiceCont>

                <UserAddress>
                    0x5f0dad0bed...4e9da
                    <img src={CopyClipboard} alt="copy" />
                </UserAddress>


                <PrimaryButton
                    width="50%"
                >REPLAY</PrimaryButton>

            </ModalContent>

        </ModalBody>
    );
};
export default LooseModal;
