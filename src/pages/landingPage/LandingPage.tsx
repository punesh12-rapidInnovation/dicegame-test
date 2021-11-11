import React from 'react';
import LiveChat from '../../modules/liveChat';
import { Landingdiv, Beonediv, Flexcol, Beoneimagediv,Beoneimg,H1,H2,H3,Playerrank,Rankimg } from './style';
import { Flex, FlexColumn } from '../../modules/betting/style';
import Beoneimage from '../../assets/images/beoneimage.png'
import rectangle from '../../assets/images/rectangle.png'
import playerrank from '../../assets/icons/playerrank.svg'
import PlayersImage from '../../assets/images/PlayersImage.png';
import { RollDice } from '../../modules/betting/style';

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
                <FlexColumn style={{padding:'10px',justifyContent:'center',alignItems:'center',width:'100px'}}>
                    <Rankimg src={playerrank} alt="" />
                    <H3 style={{color:'white',fontSize:'12px',marginTop:'5px'}}>Player Rank</H3>

                    
                </FlexColumn>
                <Flex style={{width:'60%',justifyContent:'flex-end'}}>
                <img src={PlayersImage} alt="" style={{ height: '65px',marginRight:"50px"}} />
                <RollDice style={{width:'230px'}}>DEPOSIT FUNDS</RollDice>
                </Flex>
                
            </Playerrank>



            <LiveChat/>

        </Landingdiv>
    );
};

export default LandingPage;