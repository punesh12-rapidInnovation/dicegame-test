import React from 'react';
import LiveChat from '../../modules/liveChat';
import { Landingdiv, Beonediv, Flexcol, Beoneimagediv,Beoneimg,H1,H2,H3,Playerrank,Rankimg } from './style';
import Beoneimage from '../../assets/images/beoneimage.png'
import rectangle from '../../assets/images/rectangle.png'
import playerrank from '../../assets/icons/playerrank.svg'

const LandingPage = () => {
    return (
        <Landingdiv>
            <Beonediv>
                <Flexcol>
                <H2>EVERYDAY LOTS OF WINS</H2>
                <H1>BE ONE OF THEM</H1>
                <H3>choose you odds and roll the dice to win pulse and prizes,invest,exchange,and join the contest with high rewards at pulserool</H3>
                </Flexcol>
                <Beoneimagediv>
                    <Beoneimg src={Beoneimage} alt="" />
                </Beoneimagediv>
            </Beonediv>
            <Playerrank>
                <Rankimg src={playerrank} alt="" />

            </Playerrank>



            <LiveChat/>

        </Landingdiv>
    );
};

export default LandingPage;