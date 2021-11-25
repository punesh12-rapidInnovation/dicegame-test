
import { useEffect, useState } from 'react'
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import CopyClipboard from "assets/icons/copyClipboard.svg";
import PulseCoin from "assets/icons/pulseGoldCoin.svg";
import Coins from "assets/icons/coins.svg";
import HappyFace from "assets/icons/happyFace.svg";
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
import AnimatedTreasureChest from './AnimatedTreasureChest';

const WinModal = (props: any) => {
    const { show, toggleModal, styles, ResultObject, Profit } = props;

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
                    // height={"60px"}
                    src={PulseRoll} />

                <InfoText>Congratulations!</InfoText>
                <InfoTextSecondary>you win!</InfoTextSecondary>
                <WinAmountContainer>
                    <img src={Coins} alt="coins" />
                    <p>You’ve won {Profit} pulse coins</p>
                    <img src={HappyFace} alt="coins"
                        style={{ marginRight: "20px" }}
                    />
                    <AnimatedTreasureChest />
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

                <UserAddress>
                    0x5f0dad0bed...4e9da
                    <img src={CopyClipboard} alt="copy" />
                </UserAddress>
                <PrimaryButton
                    width="50%"
                    onClick={() => toggleModal()}
                >DONE</PrimaryButton>
            </ModalContent>

            <div
                className="coinShower"
            >
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
                <img src={PulseCoin} alt="" />
            </div>
        </ModalBody>
    );
};
export default WinModal;
