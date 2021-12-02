import React from "react";
import OpenTreasureBox from "assets/icons/openTreasureBox.svg";
import PulseCoin from "assets/icons/pulseGoldCoin.svg";
import { TreasureCont } from "./treasureChestStyle";

const AnimatedTreasureChest = () => {
  return (
    <TreasureCont style={{ position: "absolute", right: "-1%" }}>
      <img
        className="treasureBox"
        style={{ marginTop: "-25%", height: "80px" }}
        src={OpenTreasureBox}
        alt="coins"
      />
      <img className="pulsecoin" id="middle" src={PulseCoin} alt="coins" />
      <img className="pulsecoin2" id="left1" src={PulseCoin} alt="coins" />
      <img className="pulsecoin3" id="left13" src={PulseCoin} alt="coins" />
      <img className="pulsecoin4" id="left14" src={PulseCoin} alt="coins" />
      <img className="pulsecoin5" id="left15" src={PulseCoin} alt="coins" />
      {/* <img className="pulsecoin6" id="left16" src={PulseCoin} alt="coins" /> */}
    </TreasureCont>
  );
};

export default AnimatedTreasureChest;
