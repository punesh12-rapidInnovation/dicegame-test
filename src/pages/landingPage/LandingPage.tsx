import React from 'react';
import LiveChat from '../../modules/liveChat';
import { Landingdiv } from './style';
import landingtop from '../../assets/images/landingtop.png';

const LandingPage = () => {
    return (
        <Landingdiv>

            <img src={landingtop} style={{ width: '100%' }} alt="" />

            <LiveChat/>

        </Landingdiv>
    );
};

export default LandingPage;