import PlayerRankImg from "assets/icons/playerrank.svg";
import { useEffect } from "react";
import BeOneImage from "assets/images/beoneimage.png";
import axios from "axios";
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
    const [TotalBets, setTotalBets] = useState<number>(0);

    useEffect(() => {
        const GetBetCount = async () => {
            const axiosInstance = axios.create({
          baseURL: "https://diceroll.rapidinnovation.tech/pool",
        });

        await axiosInstance.get(`/betcount`).then(function (response) {
          //@ts-ignore
            const BetCount:number = response.data;
            setTotalBets(BetCount);
        });
        }
        GetBetCount();
      }
    , []);

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
                <Flex style={{width:'50%'}}>
                <FlexColumn style={{width:'140px',alignItems:'center'}}>
                    <h1 style={{fontSize: '16px',lineHeight: '19px',color: '#00EAFF'}}>Total Bets Placed</h1>
                        <h2 style={{ fontSize: '30px', lineHeight: '38px', color: '#FFFFFF' }}>{TotalBets}</h2>
                </FlexColumn>

                <PrimaryButton style={{ width: '300px', marginRight: '10%' }} onClick={() => history.push(`${Paths.housePool}`)}>
                    DEPOSIT FUNDS
                    </PrimaryButton>
                </Flex>
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