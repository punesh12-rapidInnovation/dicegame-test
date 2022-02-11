import { useState } from 'react';
import { Paths } from 'modules/app/components/routes/types';
import history from 'shared/helpers/history';
import Betting from 'modules/betting';
import LastRollsNew from 'modules/LastRolls/LastRollsNew';
import GraphPool from 'modules/liveChat/GraphPool/GraphPool';
import LiveChatNew from 'modules/liveChat/LiveChatNew';
import { PrimaryButton } from 'shared/button/Button';
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import { BetActiveTab, DepositNavCont, FunctionCont, FunctionStatus, LandingMobileContainer, ModuleCont } from './styleMobile';
import DepositCard from 'modules/DepositCard/DepositCard';

const LandingMobile = () => {

    const [activeTab, setActiveTab] = useState('bet')
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    return (
        <LandingMobileContainer>
            <DepositNavCont>
                <p
                    onClick={() => setShowDisclaimer(true)}
                >
                    {/* Read disclaimer */}
                    Read Terms and Conditions
                </p>
                <PrimaryButton
                    onClick={() => history.push(`${Paths.housePool}`)}>
                    HOUSE POOL</PrimaryButton>
            </DepositNavCont>
            <FunctionCont>
                <FunctionStatus activeStatus={activeTab === 'bet'} onClick={() => setActiveTab('bet')} >Bet</FunctionStatus>
                <FunctionStatus activeStatus={activeTab === 'Deposit'} onClick={() => setActiveTab('Deposit')}>Deposit Funds</FunctionStatus>
            </FunctionCont>
            <ModuleCont>
                {activeTab === 'bet' && <BetActiveTab >
                    <Betting />
                    <LastRollsNew />
                    <GraphPool />
                </BetActiveTab>}
                {activeTab === 'Deposit' &&
                    <BetActiveTab>
                        <DepositCard />
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