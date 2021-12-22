import React from 'react';
import { FunctionContainer, LandingDesktopContainer, LowerContainer, UpperContainer } from './styleDesktop';

const LandingDesktop = () => {
    return (
        <LandingDesktopContainer>
            landing desktop

            <FunctionContainer>
                <UpperContainer>
                    <div>betting</div>
                    <div>livechat</div>
                </UpperContainer>
                <LowerContainer>
                    <div>last rolls</div>
                    <div>graoh</div>
                </LowerContainer>
            </FunctionContainer>
        </LandingDesktopContainer>
    );
};

export default LandingDesktop;