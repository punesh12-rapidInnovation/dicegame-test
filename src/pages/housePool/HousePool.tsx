import HousePoolModal from 'modules/app/components/HousePoolModal/HousePoolModal';
import React from 'react';
import { PrimaryButton } from 'shared/button/Button';
import CustomModal from 'shared/custom-modal';
import { InfoContainer, HousePoolCont, H1, FlexCont, H3, Link, InfoFlexCont, PoolDetailsContainer, PoolDetails } from './style';

const HousePool = () => {
    return (
        <HousePoolCont>
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
                        <Link>Read our disclaimer to know more</Link>
                    </FlexCont>
                    <FlexCont
                        justifyContent="center"
                        alignItems="flex-end"
                    >
                        <PrimaryButton width="50%">DEPOSIT FUNDS (PLS)</PrimaryButton>
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
                        >
                            <FlexCont
                                justifyContent="center"
                                alignItems="center"
                            >
                                <p>liquidity</p>
                                <h1>$61</h1>
                                <p>24.158</p>
                            </FlexCont>
                            <p>vertical line img</p>
                            <FlexCont
                                justifyContent="center"
                                alignItems="center"
                            >
                                <p>liquidity</p>
                                <h1>$61</h1>
                                <p>24.158</p>
                            </FlexCont>

                        </FlexCont>

                    </PoolDetails>


                    <FlexCont
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                    >poolSize</FlexCont>
                    <FlexCont
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <PrimaryButton width="25%">Deposit</PrimaryButton>
                        <PrimaryButton width="25%">Deposit</PrimaryButton>
                    </FlexCont>


                </FlexCont>
                <FlexCont

                    justifyContent="center"
                    alignItems="center"
                >Liquidity graph</FlexCont>
            </PoolDetailsContainer>


            {/* <CustomModal
                show={true}
                heading="DEPOSIT FUNDS"
            >
                <HousePoolModal />
            </CustomModal> */}
        </HousePoolCont >
    );
};

export default HousePool;