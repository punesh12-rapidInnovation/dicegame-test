import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PulseRoll from "assets/icons/loadingPulseroll.svg";
import CopyClipboard from "assets/icons/copyClipboard.svg";
import PulseCoin from "assets/icons/pulseGoldCoin.svg";
import Coins from "assets/icons/coins.svg";
import HappyFace from "assets/icons/happyFace.svg";
import DiceFront from "assets/icons/diceFront.svg";
import Diceback from "assets/icons/diceback.svg";
import treasure from "assets/icons/dicegame_coin_animation.gif";

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
import AnimatedTreasureChest from "./AnimatedTreasureChest";
import OpenTreasureBox from "assets/icons/openTreasureBox.svg";

import { betWinSound } from "../Sound";
import FramerMotionAnimation from "./FramerMotionAnimation";

const WinModal = (props: any) => {
  const { show, toggleModal, styles, ResultObject, Profit } = props;

  const [Numbers, setNumbers] = useState([]);

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const { userAddress } = useSelector((state: any) => state.wallet);
  const LocalBetIt = localStorage.getItem("PlacingBetId");

  useEffect(() => {
    for (let index = 0; index < 15; index++) {
      //@ts-ignore
      setNumbers((prev: any) => [...prev, { src: PulseCoin }]);
    }
  }, []);

  useEffect(() => {
    // setTimeout(() => {

    try {
      if (show) betWinSound.play();
      else
        betWinSound.removeEventListener("ended", () => {
          betWinSound.pause();
          betWinSound.currentTime = 0;
        });
    } catch (error) {
      console.log(error);
    }

    // }, 1000);
  }, [show]);

  return (
    <ModalBody show={show} onMouseDown={handleClickOutside} style={{ ...styles }}>
      <ModalContent>
        <Image src={PulseRoll} />

        <InfoText>Congratulations!</InfoText>
        <InfoTextSecondary>you win!</InfoTextSecondary>
        <WinAmountContainer>
          <img src={Coins} alt="coins" />
          <p>You’ve won {
            userAddress && LocalBetIt === ResultObject?.Betid ?
              Number(Profit).toFixed(6)
              : 0
          } pulse coins</p>
          <img src={HappyFace} alt="coins" style={{ marginRight: "20px" }} />
          {/* <img
                        style={{ marginTop: "-25%", height: '80px' }}
                        src={OpenTreasureBox} alt="treasureBox" /> */}
          {/* <AnimatedTreasureChest /> */}
          {/* <FramerMotionAnimation /> */}

          <img src={treasure}
            style={{ marginTop: "-25%", height: "80px" }}
          />
        </WinAmountContainer>

        <DiceCont>
          <RearDice>
            <img src={Diceback} alt="" />
          </RearDice>
          <FrontDice>
            <p>{
              userAddress && LocalBetIt === ResultObject?.Betid && ResultObject.Diceresult
            } </p>
            <img src={DiceFront} alt="" />
          </FrontDice>
        </DiceCont>

        <UserAddress>
          {userAddress}
          <img
            src={CopyClipboard}
            alt="copy"
            onClick={() => {
              navigator.clipboard.writeText(userAddress);
            }}
          />
        </UserAddress>
        <PrimaryButton width="50%" onClick={() => toggleModal()}>
          DONE
        </PrimaryButton>
      </ModalContent>

      <div className="coinShower">
        {Numbers.map((data: any, index) => {
          return <img src={data.src} alt="" key={"cs" + index} />;
        })}
      </div>
    </ModalBody>
  );
};
export default WinModal;
