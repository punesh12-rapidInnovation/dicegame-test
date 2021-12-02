import HousePoolModal from 'modules/app/components/HousePoolModal/HousePoolModal';
import React, { useState } from 'react';
import Header from 'modules/app/components/header';
import { PrimaryButton } from 'shared/button/Button';
import CustomModal from 'shared/custom-modal';
import { colors } from 'shared/styles/theme';
import { InfoContainer, HousePoolCont, H1, FlexCont, H3, Link, InfoFlexCont, PoolDetailsContainer, PoolDetails, PoolFundsCont, TransactionContainer, VolumeChartLabel, BoxTitle } from './style';
import verticalLine from "assets/icons/verticalLine.svg";
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import HousePoolTransaction from 'modules/app/components/HousePoolTransaction/HousePoolTransaction';
import BarChart from 'modules/app/components/barChart/BarChart';
const HousePool = () => {

    const [showDepositModal, setshowDepositModal] = useState(false)
    const [showDisclaimer, setshowDisclaimer] = useState(false)
    return (
        <HousePoolCont>
            <Header/>
            <InfoContainer>
                <InfoFlexCont>
                    <FlexCont
                        style={{ marginTop: "-20px" }}
                    >
                        <H3>Wallet {'>'} Liquidity</H3>
                        <H1>HOUSE POOL</H1>
                        <H3>Pulse Token (PLS) </H3>
                        <p>Choose your odds and roll the dice to win pulse and prizes. Play, Invest, Exchange <br />
                            and Join the Contest with high rewards at Pulseroll</p>
                        <Link onClick={() => setshowDisclaimer(true)}>Read our disclaimer to know more</Link>
                    </FlexCont>
                    <FlexCont
                        justifyContent="center"
                        alignItems="center"
                    >
                        <PrimaryButton width="50%"
                            onClick={() => setshowDepositModal(true)}
                        >DEPOSIT FUNDS (PLS)</PrimaryButton>
                    </FlexCont>
                </InfoFlexCont>
            </InfoContainer>
            <PoolDetailsContainer>
                <FlexCont

                    justifyContent="center"
                    alignItems="center"
                >

                    <PoolDetails>
                        <FlexCont
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"

                            style={{ marginTop: "30px" }}
                        >
                            <FlexCont
                                justifyContent="center"
                                alignItems="center"
                            >
                                <h3>liquidity</h3>
                                <h1>$61</h1>
                                <p>24.158</p>
                            </FlexCont>
                            <img src={verticalLine} alt="" />
                            <FlexCont
                                justifyContent="center"
                                alignItems="center"
                            >
                                <h3>Volume 24h</h3>
                                <h1>$61</h1>
                                <p>24.158</p>
                            </FlexCont>

                        </FlexCont>



                        <FlexCont
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PoolFundsCont>
                                <h5>Your Total Funds</h5>
                                <h1>387536.00</h1>
                                <p>PULSE TOKEN</p>
                            </PoolFundsCont>
                        </FlexCont>
                        <FlexCont
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"

                            style={{ marginBottom: "30px" }}
                        >
                            <PrimaryButton
                                width="30%"
                                margin="0 10px"
                                onClick={() => setshowDepositModal(true)}

                            >DEPOSIT FUNDS
                            </PrimaryButton>
                            <PrimaryButton
                                width="30%"
                                margin="0 10px"
                                color={colors.primary}
                                onClick={() => setshowDepositModal(true)}

                            >WITHDRAW FUNDS</PrimaryButton>
                        </FlexCont>
                    </PoolDetails>


                </FlexCont>
                <FlexCont

                    justifyContent="center"
                    alignItems="center"
                >
                    <PoolDetails>
                        <BoxTitle>Volume 24 H</BoxTitle>

                        <>
                        <VolumeChartLabel>$1.27B</VolumeChartLabel> 
                        <VolumeChartLabel style={{paddingLeft:"10px",fontSize:"16px",fontWeight:600}}>23 Oct 2022</VolumeChartLabel> 
                        </>
                        <div style={{ width: '100%', height: "300px" }}>
                            <BarChart chartData={[{created_at:"11/30/2021",liquidity:0.39823},{created_at:"12/1/2021",liquidity:0.39823}]} setHoverValue={()=> {}} setHoverDate={()=> {}} />
                        </div>
                    </PoolDetails>
                </FlexCont>
            </PoolDetailsContainer>
            <TransactionContainer>
                <h1>Transactions</h1>
                <HousePoolTransaction />

            </TransactionContainer>

            <CustomModal
                show={showDepositModal}
                toggleModal={() => setshowDepositModal(false)}
                heading="DEPOSIT FUNDS"
            >
                <HousePoolModal />
            </CustomModal>


            <CustomModal
                show={showDisclaimer}
                heading="DISCLAIMER"
                toggleModal={() => setshowDisclaimer(false)}
            >
                <Disclaimer />
            </CustomModal>

        </HousePoolCont >
    );
};

export default HousePool;