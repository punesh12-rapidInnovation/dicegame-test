import React from 'react';

import OpenTreasureBox from "assets/icons/openTreasureBox.svg";
import PulseCoin from "assets/icons/pulseGoldCoin.svg";
import { CoinImg, TreasureCont } from './FramerStyle';
import { AnimateSharedLayout } from 'framer-motion';


const variants = {
    middle: {
        zIndex: 2,
        scale: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2],
        opacity: [0, 1, 0],
        y: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70, -75, -80, -75, -70, -65, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -5, 0, 5, 10],

        transition: {
            duration: 2,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1
        }
    },

    left1: {
        scale: [0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0],
        x: [0, -40],
        y: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70, -75, -80, -75, -70, -65, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -5, 0],

        transition: {
            duration: 2.5,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1.1
        }
    },
    left2: {
        scale: [0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0],
        x: [0, -35, -70],
        y: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -5, 0],

        transition: {
            duration: 2.5,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1.2
        }
    },
    left3: {
        scale: [0, 0.2, 0.4, 0.4, 0.2, 0],
        x: [0, -10, -20, -30],
        y: [-5, -10, -15, -20, -25, -30, -35, -35, -30, -25, -20, -15, -5, 0],

        transition: {
            duration: 2,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1.3
        }
    },

    right1: {
        scale: [0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0],
        x: [10, 50],
        y: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70, -75, -80, -75, -70, -65, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -5, 0],

        transition: {
            duration: 2.5,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1.1
        }
    },
    right2: {
        scale: [0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0],
        x: [10, 35, 70],
        y: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -5, 0],

        transition: {
            duration: 2.5,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1.2
        }
    },
    right3: {
        scale: [0, 0.2, 0.4, 0.4, 0.2, 0],
        x: [10, 30, 50, 70],
        y: [-5, -10, -15, -20, -25, -30, -35, -35, -30, -25, -20, -15, -5, 0],

        transition: {
            duration: 2,
            ease: "easeInOut",
            times: [1],
            repeat: Infinity,
            repeatDelay: 1.3
        }
    }
}


const FramerMotionAnimation = () => {
    return (
        <AnimateSharedLayout>

            <TreasureCont style={{ position: "absolute", right: "0%", top: "-50%" }}>
                <img

                    className="treasureBox"
                    src={OpenTreasureBox}
                    alt="coins"
                />

                <CoinImg
                    animate="middle"
                    variants={variants}
                    className="pulsecoin" id="middle" src={PulseCoin} alt="coins" />
                <CoinImg
                    animate="left1"
                    variants={variants}
                    className="pulsecoin" id="left1" src={PulseCoin} alt="coins" />
                <CoinImg
                    animate="left2"
                    variants={variants}
                    className="pulsecoin" id="left2" src={PulseCoin} alt="coins" />
                <CoinImg
                    animate="left3"
                    variants={variants}
                    className="pulsecoin" id="left3" src={PulseCoin} alt="coins" />

                <CoinImg
                    animate="right1"
                    variants={variants}
                    className="pulsecoin" id="right1" src={PulseCoin} alt="coins" />
                <CoinImg
                    animate="right2"
                    variants={variants}
                    className="pulsecoin" id="right2" src={PulseCoin} alt="coins" />
                <CoinImg
                    animate="right3"
                    variants={variants}
                    className="pulsecoin" id="right3" src={PulseCoin} alt="coins" />

            </TreasureCont>
        </AnimateSharedLayout>
    );
};

export default FramerMotionAnimation;