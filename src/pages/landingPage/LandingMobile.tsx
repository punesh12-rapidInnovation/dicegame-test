import Betting from 'modules/betting';
import React from 'react';
import { LandingMobileContainer, SwapFunctionCont } from './styleMobile';

const LandingMobile = () => {
    return (
        <LandingMobileContainer>
            {/* <Betting /> */}
            mobile view

            <SwapFunctionCont>
                <div>Bet</div>
                <div>chat</div>
            </SwapFunctionCont>
        </LandingMobileContainer>
    );
};

export default LandingMobile;