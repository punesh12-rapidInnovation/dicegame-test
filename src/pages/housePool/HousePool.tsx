import HousePoolModal from 'modules/app/components/HousePoolModal/HousePoolModal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'modules/app/components/header';
import { PrimaryButton } from 'shared/button/Button';
import CustomModal from 'shared/custom-modal';
import { colors } from 'shared/styles/theme';
import { InfoContainer, HousePoolCont, H1, FlexCont, H3, Link, PoolDetailsContainer, PoolDetails, PoolFundsCont, TransactionContainer, VolumeChartLabel, BoxTitle } from './style';
import verticalLine from "assets/icons/verticalLine.svg";
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import HousePoolTransaction from 'modules/app/components/HousePoolTransaction/HousePoolTransaction';
import BarChart from 'modules/app/components/barChart/BarChart';
import { instanceType, selectInstances } from 'utils/contracts';
import { useSelector } from 'react-redux';
import { convertToEther, dateFromTimestamp } from 'utils/helper';
import { CheckCont } from 'shared/Disclaimer/style';
import HousePoolWithdrawModal from 'modules/app/components/HousePoolModal/HousePoolWithdrawModal';
const HousePool = () => {

    const [showDepositModal, setshowDepositModal] = useState(false)
    const [showWithdrawModal, setshowWithdrawModal] = useState(false)
    const [showDisclaimer, setshowDisclaimer] = useState(false)
    // const [depositTxs, setDepositTxs] = useState<any>([])
    // const [withdrawTxs, setWithdrawTxs] = useState<any>([])
    const [totalValueLocked, setTotalValueLocked] = useState<any>("0")
    const [totalFunds, setTotalFunds] = useState<any>("0")
    const [liquidityChartData, setLiquidityChartData] = useState<any>([])
    const [hoverLiquidityChartValue, setHoverLiquidityChartValue] = React.useState<any>("")
    const [hoverLiquidityChartDate, setHoverLiquidityChartDate] = React.useState<any>("")
    const [ActionType, setActionType] = useState('');

    const { userAddress, walletBalance } = useSelector((state: any) => state.wallet);
    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: "https://diceroll.rapidinnovation.tech/pool",
        });
        const getdata = async () => {
            console.log(userAddress);
            if(userAddress){

                const res1 = await axiosInstance.get('/allLiquidity');
                setLiquidityChartData(res1.data);          
                // const res2 = await axiosInstance.get(`/alldeposit/0x6531B1e3745802bb92F3BaFcE20dBb547f39f222`)
                // setDepositTxs(res2.data);
                // const res3 = await axiosInstance.get(`/allwithdraw/0x6531B1e3745802bb92F3BaFcE20dBb547f39f222`)
                // setWithdrawTxs(res3.data);
                //--
                const housepoolInstance = await selectInstances(
                    instanceType.HOUSEPOOL, // type of instance
                );
                let userItemlength= await housepoolInstance.methods.UserItemlength(`${userAddress}`).call()
                // let y = await housepoolInstance.methods.Users("0x0DBEbDe22004369a8456a020c684cfDf6B81DC66", 0).call()
                console.log("userItemlength", userItemlength);
                let promiseArray = [];
                if (parseFloat(`${userItemlength}`)>0){
                    for(let i = 0; i<userItemlength; i++){
                        promiseArray.push(housepoolInstance.methods.Users(`${userAddress}`, i).call());
                    }
                }
                const usersArray = await Promise.all(promiseArray)
                console.log("TotalFunds",usersArray.reduce((a:any,c:any) => a + parseFloat(c.Balance), 0));
                
                setTotalFunds(usersArray.reduce((a:any,c:any) => a + parseFloat(c.Balance), 0));
                let totalValueLocked = await housepoolInstance.methods.TotalValueLocked().call();
                setTotalValueLocked(totalValueLocked)
                // console.log("totalValueLocked",totalValueLocked);
            }
        } //

        getdata();

        
    }, [userAddress])
    return (
        <HousePoolCont>
            <Header />
            <InfoContainer>
                <FlexCont
                    style={{ padding:"30px 0" }}
                >
                    <H3>Wallet {'>'} Liquidity</H3>
                    <H1>HOUSE POOL</H1>
                    <H3>Pulse Token (PLS) </H3>
                    <p>Choose your odds and roll the dice to win pulse and prizes. Play, Invest, Exchange <br />
                        and Join the Contest with high rewards at Pulseroll</p>
                    <Link onClick={() => setshowDisclaimer(true)}>Read our disclaimer to know more</Link>
                </FlexCont>
                <FlexCont
                
                >
                    <PrimaryButton width="300px"
                        style={{ padding: '25px', fontSize: '18px' }}
                        onClick={() => { setshowDepositModal(true); setActionType('deposit') }}
                    >DEPOSIT FUNDS (PLS)</PrimaryButton>
                </FlexCont>
            </InfoContainer>
            <PoolDetailsContainer>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(450px, 450px) minmax(370px, 2fr)',
                    gridColumnGap: '20px',
                    gridRowGap: '20px',

                    paddingTop:"50px",
                }}>
                    <div style={{
                        background: "linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%)",
                        boxShadow: "0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9)",
                        borderRadius: "20px",
                    }}>
                        <FlexCont style={{ flexDirection: 'row', justifyContent: "space-around", height: '30%', alignItems: "center", width: '100%', padding: '20px 40px' }}>
                            <FlexCont
                                justifyContent="center"
                                alignItems="center"
                                
                            >
                                <h3>liquidity</h3>
                                <h1>${parseFloat(`${convertToEther(`${totalValueLocked}`)}`).toFixed(3)}</h1>
                                <p>{parseFloat(`${convertToEther(`${totalValueLocked}`)}`).toFixed(3)}</p>
                            </FlexCont>
                            {/* <img src={verticalLine} alt="" style={{width:'30%',height:'40px'}}/>
                            <FlexCont
                                justifyContent="center"
                                alignItems="center" style={{ width: '30%', transform: 'translatey(-25px)' }}
                            >
                            <h3>Volume 24h</h3>
                            <h1>$1.89M</h1>
                            <p>124.18%</p>
                            </FlexCont> */}
                        </FlexCont>
                        <FlexCont
                            justifyContent="center"
                            alignItems="center"
                            style={{ width: '100%', height: '50%' }}
                        >
                            <PoolFundsCont>
                                <h5>Your Total Funds</h5>
                                <h1>{parseFloat(`${convertToEther(`${totalFunds}`)}`).toFixed(3)}</h1>
                                <p>PULSE TOKEN</p>
                            </PoolFundsCont>
                        </FlexCont>
                        <FlexCont
                            style={{ marginBottom: "30px", width: '100%', flexDirection: 'row', justifyContent: 'center', height: '20%' }}
                        >
                            <PrimaryButton
                                width="40%"
                                margin="0 10px"
                                onClick={() => { setshowDepositModal(true); setActionType('deposit') }}
                                style={{ padding: '18px' }}

                            >DEPOSIT FUNDS
                            </PrimaryButton>
                            <PrimaryButton
                                width="45%"
                                margin="0 10px"
                                color={colors.primary}
                                onClick={() => { setshowWithdrawModal(true); setActionType('withdraw') }}
                                style={{ padding: '18px' }}

                            >WITHDRAW FUNDS</PrimaryButton>
                        </FlexCont>
                    </div>

                    <div style={{
                        background: "linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%)",
                        boxShadow: "0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9)",
                        borderRadius: "20px",
                        padding: "20px"
                    }}>
                        <BoxTitle>Liquidity 24 H</BoxTitle>
                        <>
                            {
                                !hoverLiquidityChartValue && !hoverLiquidityChartDate && liquidityChartData.length ?
                                    <>
                                        <VolumeChartLabel>${parseFloat(liquidityChartData[liquidityChartData.length - 1].liquidity).toFixed(5)}
                                        </VolumeChartLabel>
                                        <VolumeChartLabel style={{ paddingLeft: "10px", fontSize: "16px", fontWeight: 600 }}>{dateFromTimestamp(liquidityChartData[liquidityChartData.length - 1].created_at)}</VolumeChartLabel>
                                    </>
                                    : !liquidityChartData.length ?
                                        null
                                        : hoverLiquidityChartDate ?
                                            <>
                                                <><VolumeChartLabel>${parseFloat(hoverLiquidityChartValue).toFixed(5)}</VolumeChartLabel>
                                                    <VolumeChartLabel style={{ paddingLeft: "10px", fontSize: "16px", fontWeight: 600 }}>{dateFromTimestamp(hoverLiquidityChartDate)}</VolumeChartLabel> </>
                                            </>
                                            : null
                            }
                        </>
                        <div style={{ width: '100%', height: "300px" }}>
                            <BarChart chartData={liquidityChartData} setHoverValue={setHoverLiquidityChartValue} setHoverDate={setHoverLiquidityChartDate} />
                        </div>
                    </div>
                </div>
            </PoolDetailsContainer>
            {/* <PoolDetailsContainer>
                <PoolDetails style={{width:'450px',margin:'0',marginRight:'30px',height:'500px'}}>
                    <FlexCont style={{flexDirection:'row' ,justifyContent:"space-around",height:'30%',alignItems:"center",width:'100%',padding:'20px 40px'}}>
                        <FlexCont
                                justifyContent="center"
                                alignItems="center"
                                style={{width:'30%',transform:'translatey(-25px)'}}
                                >
                                    <h3>liquidity</h3>
                                    <h1>$61</h1>
                                    <p>24.158</p>
                        </FlexCont>
                        <img src={verticalLine} alt="" style={{width:'30%',height:'40px'}}/>
                        <FlexCont
                                justifyContent="center"
                                alignItems="center" style={{ width: '30%',transform:'translatey(-25px)' }}
                        >
                        <h3>Volume 24h</h3>
                        <h1>$1.89M</h1>
                        <p>124.18%</p>
                        </FlexCont>
                    </FlexCont>
                    <FlexCont
                            justifyContent="center"
                        alignItems="center"
                        style={{width:'100%',height:'50%'}}
                        >
                            <PoolFundsCont>
                                <h5>Your Total Funds</h5>
                                <h1>387536.00</h1>
                                <p>PULSE TOKEN</p>
                            </PoolFundsCont>
                    </FlexCont>
                     <FlexCont
                            style={{ marginBottom: "30px",width:'100%',flexDirection:'row',justifyContent:'center',height:'20%' }}
                        >
                            <PrimaryButton
                                width="40%"
                                margin="0 10px"
                            onClick={() => setshowDepositModal(true)}
                            style={{padding:'18px'}}

                            >DEPOSIT FUNDS
                            </PrimaryButton>
                            <PrimaryButton
                                width="45%"
                                margin="0 10px"
                                color={colors.primary}
                            onClick={() => setshowDepositModal(true)}
                            style={{padding:'18px'}}

                            >WITHDRAW FUNDS</PrimaryButton>
                    </FlexCont>
                </PoolDetails>
                <FlexCont justifyContent="center" alignItems="center">
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
            </PoolDetailsContainer> */}
            <TransactionContainer>
                <h1 style={{color:"#fff"}}>Transactions</h1>
                <HousePoolTransaction />

            </TransactionContainer>

            <CustomModal
                show={showDepositModal}
                toggleModal={() => setshowDepositModal(false)}
                heading={ActionType === "deposit" ? "DEPOSIT FUNDS" : "WITHDRAW FUNDS"}
            >
                <HousePoolModal userAddress={userAddress} walletBalance={walletBalance} ActionType={ActionType} />
            </CustomModal>

            <CustomModal
                show={showWithdrawModal}
                toggleModal={() => setshowWithdrawModal(false)}
                heading={"WITHDRAW FUNDS"}
            >
                <HousePoolWithdrawModal userAddress={userAddress} walletBalance={walletBalance} ActionType={ActionType} />
            </CustomModal>

            
            <Disclaimer show={showDisclaimer} toggleModal={() => setshowDisclaimer(false)} />
         
        </HousePoolCont >
    );
};

export default HousePool;