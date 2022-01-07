import PlayerRankImg from "assets/icons/playerrank.svg";
import BeOneImage from "assets/images/beoneimage.png";
import PlayersImage from "assets/images/PlayersImage.png";
import { Paths } from 'modules/app/components/routes/types';
import Betting from 'modules/betting';
import { Flex, FlexColumn } from 'modules/betting/style';
import LastRollsNew from 'modules/LastRolls/LastRollsNew';
import GraphPool from 'modules/liveChat/GraphPool/GraphPool';
import LiveChatNew from 'modules/liveChat/LiveChatNew';
import { Link } from 'pages/housePool/style';
import { useState } from 'react';
import { PrimaryButton } from 'shared/button/Button';
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import history from 'shared/helpers/history';
import {
    Beonediv, Beoneimagediv,
    Beoneimg, Flexcol, H1,
    H2,
    H3, LandingDesktopContainer, LowerModuleCont, ModuleBox, ModuleCont, ModuleParentCont, PlayerRank,
    Rankimg, UpperModuleCont
} from './styleDesktop';

const LandingDesktop = () => {
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    return (
        <LandingDesktopContainer>
            <Beonediv>
                <Flexcol style={{ transform: "translateY(15%)" }}>
                    <H2>EVERY DAY LOTS OF WINS</H2>
                    <H1>BE ONE OF THEM</H1>
                    <H3>
                        Choose you odds and roll the dice to win pulse and
                        prizes,invest,exchange,and join the contest with high rewards at
                        pulseroll
                    </H3>
                    <Link
                        style={{ marginTop: "20px" }}
                        onClick={() => setShowDisclaimer(true)}
                    >
                        Read our disclaimer to know more
                    </Link>
                </Flexcol>
                <Beoneimagediv>
                    <Beoneimg src={BeOneImage} alt="" />
                </Beoneimagediv>
            </Beonediv>
            <PlayerRank>
                <FlexColumn
                    style={{
                        padding: "10px",
                        margin: " 0 5%",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100px",
                    }}
                >
                    <Rankimg src={PlayerRankImg} alt="" />
                </FlexColumn>

                <PrimaryButton style={{ width: '300px', marginRight: '10%' }} onClick={() => history.push(`${Paths.housePool}`)}>
                    DEPOSIT FUNDS
                </PrimaryButton>
            </PlayerRank>

            <ModuleParentCont>

                <ModuleCont>
                    <UpperModuleCont>
                        <ModuleBox>
                            <Betting />
                        </ModuleBox>
                        <ModuleBox>
                            <LiveChatNew />
                        </ModuleBox>
                    </UpperModuleCont>
                    <LowerModuleCont>
                        <ModuleBox>
                            <LastRollsNew />
                        </ModuleBox>
                        <ModuleBox>

                            <GraphPool />
                        </ModuleBox>

                    </LowerModuleCont>
                </ModuleCont>
            </ModuleParentCont>



            <Disclaimer
                show={showDisclaimer}
                toggleModal={() => setShowDisclaimer(false)}
            />
        </LandingDesktopContainer>
    );
};

export default LandingDesktop;