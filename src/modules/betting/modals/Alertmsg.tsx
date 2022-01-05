import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import AnimatedTreasureChest from "./AnimatedTreasureChest";
import OpenTreasureBox from "assets/icons/openTreasureBox.svg";

import { betWinSound } from "../Sound";

const Alertmsg = (props: any) => {
  const { show, toggleModal, styles, alertText, Profit } = props;

  const [Numbers, setNumbers] = useState([]);

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const { userAddress } = useSelector((state: any) => state.wallet);

  useEffect(() => {
    for (let index = 0; index < 15; index++) {
      //@ts-ignore
      setNumbers((prev: any) => [...prev, { src: PulseCoin }]);
    }
  }, []);

  // console.log('number', Numbers);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (show) betWinSound.play();
  //     else
  //       betWinSound.removeEventListener("ended", () => {
  //         betWinSound.pause();
  //         betWinSound.currentTime = 0;
  //       });

  //   }, 1000);

  // }, [show]);

  return (
    <ModalBody show={show} onMouseDown={handleClickOutside} style={{ ...styles }}>
      <ModalContent style={{ width: '600px', height: '150px', position: 'absolute', top: '50%', left: '50%' }}>
        <InfoText style={{ fontSize: '18px', color: 'white' }}>{alertText}</InfoText>

      </ModalContent>


    </ModalBody>
  );
};
export default Alertmsg;
