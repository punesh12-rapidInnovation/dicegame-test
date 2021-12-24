import Betting from 'modules/betting';
import React, { useState } from 'react';
import { LandingDesktopContainer, LowerModuleCont, UpperModuleCont } from './styleDesktop';
import { ModuleCont } from './styleDesktop';
import Beoneimage from "../../assets/images/beoneimage.png";
import playerrank from "../../assets/icons/playerrank.svg";
import PlayersImage from "../../assets/images/PlayersImage.png";
import {
    Beonediv,
    Flexcol,
    Beoneimagediv,
    Beoneimg,
    H1,
    H2,
    H3,
    Playerrank,
    Rankimg,
} from "./styleDesktop";
import { Link } from 'pages/housePool/style';
import { Flex, FlexColumn } from 'modules/betting/style';
import { PrimaryButton } from 'shared/button/Button';
import history from 'shared/helpers/history';
import { Paths } from 'modules/app/components/routes/types';
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import LiveChat from 'modules/liveChat';
import LiveChatNew from 'modules/liveChat/LiveChatNew';
import LastRolls from 'modules/LastRolls/LastRolls';
import LastRollsNew from 'modules/LastRolls/LastRollsNew';

const LandingDesktop = () => {
    const [showDisclaimer, setshowDisclaimer] = useState(false);

    return (
        <LandingDesktopContainer>

            <Beonediv>
                <Flexcol style={{ transform: "translatey(15%)" }}>
                    <H2>EVERY DAY LOTS OF WINS</H2>
                    <H1>BE ONE OF THEM</H1>
                    <H3>
                        Choose you odds and roll the dice to win pulse and
                        prizes,invest,exchange,and join the contest with high rewards at
                        pulseroll
                    </H3>
                    <Link
                        style={{ marginTop: "20px" }}
                        onClick={() => setshowDisclaimer(true)}
                    >
                        Read our disclaimer to know more
                    </Link>
                </Flexcol>
                <Beoneimagediv>
                    <Beoneimg src={Beoneimage} alt="" />
                </Beoneimagediv>
            </Beonediv>
            <Playerrank>
                <FlexColumn
                    style={{
                        padding: "10px",
                        margin: " 0 5%",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100px",
                    }}
                >
                    <Rankimg src={playerrank} alt="" />
                </FlexColumn>
                <Flex style={{
                    width: "50%", justifyContent: "flex-end", margin: " 0 5%",
                }}>
                    <img
                        src={PlayersImage}
                        alt=""
                        style={{ height: "65px", marginRight: "50px" }}
                    />
                    <PrimaryButton onClick={() => history.push(`${Paths.housePool}`)}>
                        DEPOSIT FUNDS
                    </PrimaryButton>
                </Flex>
            </Playerrank>

            <ModuleCont>
                <UpperModuleCont>
                    <Betting />
                    {/* <LiveChat /> */}
                    {/* <p>Livechat</p> */}
                    <LiveChatNew />
                </UpperModuleCont>
                <LowerModuleCont>
                    {/* <p>last 10 rolls</p> */}
                    {/* <p>liquidity graph</p> */}
                    <LastRollsNew />
                    <LiveChatNew />

                </LowerModuleCont>
            </ModuleCont>


            <Disclaimer
                show={showDisclaimer}
                toggleModal={() => setshowDisclaimer(false)}
            />
        </LandingDesktopContainer>
    );
};

export default LandingDesktop;