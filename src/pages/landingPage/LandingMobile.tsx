import { Paths } from 'modules/app/components/routes/types';
import Betting from 'modules/betting';
import LastRollsNew from 'modules/LastRolls/LastRollsNew';
import GraphPool from 'modules/liveChat/GraphPool/GraphPool';
import LiveChatNew from 'modules/liveChat/LiveChatNew';
import React, { useState } from 'react';
import { PrimaryButton } from 'shared/button/Button';
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import history from 'shared/helpers/history';
import { LandingMobileContainer, FunctionCont, FunctionStatus, ModuleCont, BetActiveTab, DepositNavCont } from './styleMobile';

const LandingMobile = () => {

    const [activeTab, setActiveTab] = useState('bet')
    const [showDisclaimer, setShowDisclaimer] = useState(false);



    return (
        <LandingMobileContainer>
            <DepositNavCont>
                <p
                    onClick={() => setShowDisclaimer(true)}
                >Read disclaimer</p>
                <PrimaryButton
                    style={{ height: "20px" }}
                    onClick={() => history.push(`${Paths.housePool}`)}>
                    Deposit funds</PrimaryButton>
            </DepositNavCont>

            <FunctionCont>
                <FunctionStatus activeStatus={activeTab === 'bet'} onClick={() => setActiveTab('bet')} >Bet</FunctionStatus>
                <FunctionStatus activeStatus={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>chat</FunctionStatus>
            </FunctionCont>
            <ModuleCont>
                {activeTab === 'bet' && <BetActiveTab >
                    <Betting />
                    <LastRollsNew />
                    <GraphPool />
                </BetActiveTab>}
                {activeTab === 'chat' &&
                    <BetActiveTab>
                        <LiveChatNew />
                    </BetActiveTab>}
            </ModuleCont>


            <Disclaimer
                show={showDisclaimer}
                toggleModal={() => setShowDisclaimer(false)}
            />
        </LandingMobileContainer>
    );
};

export default LandingMobile;