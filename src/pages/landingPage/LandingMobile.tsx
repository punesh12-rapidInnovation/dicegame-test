import Betting from 'modules/betting';
import LastRollsNew from 'modules/LastRolls/LastRollsNew';
import LiveChatNew from 'modules/liveChat/LiveChatNew';
import React, { useState } from 'react';
import { LandingMobileContainer, FunctionCont, FunctionStatus, ModuleCont, BetActiveTab } from './styleMobile';

const LandingMobile = () => {

    const [activeTab, setActiveTab] = useState('bet')


    return (
        <LandingMobileContainer>

            <FunctionCont>
                <FunctionStatus activeStatus={activeTab === 'bet'} onClick={() => setActiveTab('bet')} >Bet</FunctionStatus>
                <FunctionStatus activeStatus={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>chat</FunctionStatus>
            </FunctionCont>
            <ModuleCont>
                {activeTab === 'bet' && <BetActiveTab >
                    <div>Betting</div>
                    <LastRollsNew />
                    <div>Graph</div>
                </BetActiveTab>}
                {activeTab === 'chat' &&
                    <BetActiveTab>
                        <LiveChatNew />
                    </BetActiveTab>}
            </ModuleCont>
        </LandingMobileContainer>
    );
};

export default LandingMobile;