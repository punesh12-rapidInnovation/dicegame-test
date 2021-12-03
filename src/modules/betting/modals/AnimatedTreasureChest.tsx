import React from "react";
import OpenTreasureBox from "assets/icons/openTreasureBox.svg";
import PulseCoin from "assets/icons/pulseGoldCoin.svg";
// import { TreasureCont } from "./treasureChestStyle";
import { motion, AnimateSharedLayout } from "framer-motion";

const variants = {
  motion1: {
    scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1],
    x: ["70%", "75%", "80%", "85%", "90%", "95%", "100%", "105%", "110%", "115%", "120%"],
    y: ["0%", "-5%", "-10%", "-5%", "0%", "5%", "10%", "15%", "20%", "25%", "30%"],
    transition: {
      duration: 0.5,
      delay: 0.5,
      yoyo: Infinity,
    },
  },
  motion2: {
    scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1],
    y: ["70%", "75%", "80%", "85%", "90%", "95%", "100%", "105%", "110%", "115%", "120%"],
    x: ["0%", "-5%", "-10%", "-5%", "0%", "5%", "10%", "15%", "20%", "25%", "30%"],
    transition: {
      duration: 0.5,
      delay: 0.5,
      yoyo: Infinity,
    },
  },
};

const AnimatedTreasureChest = () => {
  return (
    <AnimateSharedLayout>
      <motion.div style={{ width: "100px", height: "120px", position: "relative" }}>
        <img
          className="treasureBox"
          style={{ marginTop: "-25%", height: "80px" }}
          src={OpenTreasureBox}
          alt="coins"
        />
        {/* <img className="pulsecoin" id="middle" src={PulseCoin} alt="coins" /> */}
        {/* <img className="pulsecoin2" id="left1" src={PulseCoin} alt="coins" />
      <img className="pulsecoin3" id="left13" src={PulseCoin} alt="coins" />
      <img className="pulsecoin4" id="left14" src={PulseCoin} alt="coins" />
      <img className="pulsecoin5" id="left15" src={PulseCoin} alt="coins" />
      <img className="pulsecoin6" id="left115" src={PulseCoin} alt="coins" />
      <img className="pulsecoin7" id="left125" src={PulseCoin} alt="coins" />
      <img className="pulsecoin8" id="left135" src={PulseCoin} alt="coins" />
      <img className="pulsecoin10" id="left155" src={PulseCoin} alt="coins" /> */}
        <motion.img
          src={PulseCoin}
          style={{ width: "20px", height: "20px", position: "absolute", top: "10%", left: "90%" }}
          animate="motion1"
          variants={variants}
        />
        <motion.img
          src={PulseCoin}
          style={{ width: "20px", height: "20px", position: "absolute", top: "10%", left: "70%" }}
          animate="motion2"
          variants={variants}
        />{" "}
        <motion.img
          src={PulseCoin}
          style={{ width: "20px", height: "20px", position: "absolute", top: "10%", left: "50%" }}
          animate="motion1"
          variants={variants}
        />{" "}
        <motion.img
          src={PulseCoin}
          style={{ width: "20px", height: "20px", position: "absolute", top: "10%", left: "30%" }}
          animate="motion1"
          variants={variants}
        />{" "}
        <motion.img
          src={PulseCoin}
          style={{ width: "20px", height: "20px", position: "absolute", top: "10%", left: "10%" }}
          animate="motion1"
          variants={variants}
        />
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default AnimatedTreasureChest;
