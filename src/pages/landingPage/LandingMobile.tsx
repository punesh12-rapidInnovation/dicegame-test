import Betting from 'modules/betting';
import React, { useState } from 'react';
import { LandingMobileContainer, FunctionCont, FunctionStatus, ModuleCont } from './styleMobile';

const LandingMobile = () => {

    const [activeTab, setActiveTab] = useState('bet')


    return (
        <LandingMobileContainer>
            {/* <Betting /> */}
            mobile view

            <FunctionCont>
                <FunctionStatus activeStatus={activeTab === 'bet'} onClick={() => setActiveTab('bet')} >Bet</FunctionStatus>
                <FunctionStatus activeStatus={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>chat</FunctionStatus>
            </FunctionCont>
            <ModuleCont>
                {activeTab === 'bet' && "bet"}
                {activeTab === 'chat' && "chat"}
            </ModuleCont>
        </LandingMobileContainer>
    );
};

export default LandingMobile;