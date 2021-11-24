import React from 'react';
import OpenTreasureBox from "assets/icons/openTreasureBox.svg";
import PulseCoin from "assets/icons/pulseGoldCoin.svg";
import { TreasureCont } from './treasureChestStyle';


const AnimatedTreasureChest = () => {
    return (
        <TreasureCont>
            <img
                style={{ marginTop: "-25%", height: '80px' }}
                src={OpenTreasureBox} alt="coins" />
            <img
                className="pulsecoin" id='middle'
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin2" id='left1'
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin3"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin4"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin5"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin6"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin7"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin8"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin9"
                src={PulseCoin} alt="coins" />
            <img
                className="pulsecoin10"
                src={PulseCoin} alt="coins" />
        </TreasureCont>
    );
};

export default AnimatedTreasureChest;