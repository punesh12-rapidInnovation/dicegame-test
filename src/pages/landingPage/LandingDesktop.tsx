import BeOneImage from "assets/images/beoneimage.png";
import axios from "axios";
import { Paths } from 'modules/app/components/routes/types';
import Betting from 'modules/betting';
import { Flex, FlexColumn } from 'modules/betting/style';
import LastRollsNew from 'modules/LastRolls/LastRollsNew';
import GraphPool from 'modules/liveChat/GraphPool/GraphPool';
import { Link } from 'pages/housePool/style';
import { useEffect, useState } from "react";
import { PrimaryButton } from 'shared/button/Button';
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import history from 'shared/helpers/history';
import DepositCard from "modules/DepositCard/DepositCard";
import {
    Beonediv, Beoneimagediv,
    Beoneimg, Flexcol, H1,
    H2,
    H3, LandingDesktopContainer, LowerModuleCont, ModuleBox, ModuleCont, ModuleParentCont, PlayerRank,
    PulseGradient,
    Rankimg, UpperModuleCont
} from './styleDesktop';

const LandingDesktop = () => {
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [TotalPlayers, setTotalPlayers] = useState<number>(0);

    useEffect(() => {
        const GetBetCount = async () => {
            const axiosInstance = axios.create({
                baseURL: "https://dicegame-dev.rapidinnovation.tech/pool",
            });
            await axiosInstance.get(`/betcount`).then(function (response) {
                //@ts-ignore
                const PlayerCount: number = response.data;
                //@ts-ignore
                setTotalPlayers(PlayerCount?.playerCount);
            });
        }
        GetBetCount();
    }
        , []);



    return (
        <LandingDesktopContainer>
            <Beonediv>
                <Flexcol style={{ transform: "translateY(15%)" }}>
                    {/* <H2>EVERY DAY LOTS OF WINS</H2> */}
                    <H1>Is Lady <PulseGradient>LUCK</PulseGradient> on <br />your side?</H1>
                    <H3>
                        Or <span style={{ color: "#ca1ae7" }}>POOL</span> with the house?
                    </H3>
                    <Link
                        style={{ marginTop: "20px" }}
                        onClick={() => setShowDisclaimer(true)}
                    >
                        {/* Read our disclaimer to know more */}
                        Read Terms and Conditions
                    </Link>
                </Flexcol>
                <Beoneimagediv>
                    <Beoneimg src={BeOneImage} alt="" />
                    <PrimaryButton style={{ width: '50%' }} onClick={() => history.push(`${Paths.housePool}`)}>
                        HOUSE POOL
                    </PrimaryButton>
                </Beoneimagediv>
            </Beonediv>
            {/* <PlayerRank>
                <FlexColumn
                    style={{
                        padding: "10px",
                        margin: " 0 5%",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100px",
                    }}
                >
                </FlexColumn>
                <Flex style={{ width: '50%' }}>
                    <FlexColumn style={{ minWidth: '140px', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '16px', lineHeight: '19px', color: '#00EAFF' }}>Total Players</h1>
                        <h2 style={{ fontSize: '30px', lineHeight: '38px', color: '#FFFFFF' }}>{TotalPlayers}</h2>
                    </FlexColumn>

                    <PrimaryButton style={{ width: '300px', marginRight: '10%' }} onClick={() => history.push(`${Paths.housePool}`)}>
                    HOUSE POOL
                        {/* DEPOSIT FUNDS */}
            {/* </PrimaryButton> */}
            {/* </Flex > */}
            {/* </PlayerRank > * /} */}

            < ModuleParentCont >

                <ModuleCont>
                    <UpperModuleCont>
                        <ModuleBox>
                            <Betting />
                        </ModuleBox>
                        <ModuleBox>
                            <LastRollsNew />
                        </ModuleBox>
                    </UpperModuleCont>
                    <LowerModuleCont>
                        <ModuleBox>
                            <DepositCard />
                        </ModuleBox>
                        <ModuleBox>
                            <GraphPool />
                        </ModuleBox>

                    </LowerModuleCont>
                </ModuleCont>
            </ModuleParentCont >







            <Disclaimer
                show={showDisclaimer}
                toggleModal={() => setShowDisclaimer(false)}
            />
        </LandingDesktopContainer >
    );
};

export default LandingDesktop;