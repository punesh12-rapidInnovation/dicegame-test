import HousePoolModal from 'modules/app/components/HousePoolModal/HousePoolModal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'modules/app/components/header';
import { PrimaryButton } from 'shared/button/Button';
import CustomModal from 'shared/custom-modal';
import { colors } from 'shared/styles/theme';
import { InfoContainer, HousePoolCont, H1, FlexCont, H3, Link, PoolDetailsContainer, PoolDetailsGridItem, PoolDetails, PoolFundsCont, TransactionContainer, VolumeChartLabel, BoxTitle, InfoTextContainer, HouseP } from './style';
import verticalLine from "assets/icons/verticalLine.svg";
import Disclaimer from 'shared/Disclaimer/Disclaimer';
import HousePoolTransaction from 'modules/app/components/HousePoolTransaction/HousePoolTransaction';
import BarChart from 'modules/app/components/barChart/BarChart';
import { instanceType, selectReadContractInstance } from 'utils/contracts';
import { useSelector } from 'react-redux';
import { convertToEther, dateFromTimestamp } from 'utils/helper';
import { CheckCont } from 'shared/Disclaimer/style';
import HousePoolWithdrawModal from 'modules/app/components/HousePoolModal/HousePoolWithdrawModal';
import TransactionWaiting from 'shared/transactionWaiting/TransactionWaiting';
import TransactionError from 'shared/transactionError/TransactionError';
import TransactionSuccess from 'shared/transactionSucess/TransactionSuccess';
import Alertmsg from 'modules/betting/modals/Alertmsg';
import pulseLuckLogo from 'assets/icons/pulseLuckLogo.svg'
import axiosInstance from 'utils/axios';



const HousePool = () => {

    const [showDepositModal, setshowDepositModal] = useState(false)
    const [showWithdrawModal, setshowWithdrawModal] = useState(false)
    const [showDisclaimer, setshowDisclaimer] = useState(false)
    const [showConnectWalletAlert, setShowConnectWalletAlert] = useState<boolean>(false);
    const [txWaiting, setTxWaiting] = useState<boolean>(false);
    const [txSuccess, setTxSuccess] = useState<boolean>(false);
    const [txError, setTxError] = useState<boolean>(false);
    // const [depositTxs, setDepositTxs] = useState<any>([])
    // const [withdrawTxs, setWithdrawTxs] = useState<any>([])
    const [totalValueLocked, setTotalValueLocked] = useState<any>("0")
    const [totalFunds, setTotalFunds] = useState<any>("0")
    const [poolContributionPercent, setPoolContributionPercent] = useState<any>("0")
    const [liquidityChartData, setLiquidityChartData] = useState<any>([])
    const [hoverLiquidityChartValue, setHoverLiquidityChartValue] = React.useState<any>("")
    const [hoverLiquidityChartDate, setHoverLiquidityChartDate] = React.useState<any>("")
    const [ActionType, setActionType] = useState('');
    const [txLockedTimeLeft, setTxLockedTimeLeft] = useState<any>([]);

    const [depositDoneNumber, setDepositDoneNumber] = useState<any>(0);
    const [withdrawDoneNumber, setWithdrawDoneNumber] = useState<any>(0);


    const { userAddress, walletBalance } = useSelector((state: any) => state.wallet);
    useEffect(() => {

        const getdata = async () => {
            console.log(userAddress);
            const res1 = await axiosInstance.get('/allLiquidity');
            setLiquidityChartData(res1.data);
            if (userAddress) {

                // const res1 = await axiosInstance.get('/allLiquidity');
                // setLiquidityChartData(res1.data);          
                // const res2 = await axiosInstance.get(`/alldeposit/0x6531B1e3745802bb92F3BaFcE20dBb547f39f222`)
                // setDepositTxs(res2.data);
                // const res3 = await axiosInstance.get(`/allwithdraw/0x6531B1e3745802bb92F3BaFcE20dBb547f39f222`)
                // setWithdrawTxs(res3.data);
                //--
                const housepoolInstance = await selectReadContractInstance(
                    instanceType.HOUSEPOOL, // type of instance
                );
                let userItemlength = await housepoolInstance.methods.UserItemlength(`${userAddress}`).call()
                // let y = await housepoolInstance.methods.Users("0x0DBEbDe22004369a8456a020c684cfDf6B81DC66", 0).call()
                console.log("userItemlength", userItemlength);
                let promiseArray = [];
                if (parseFloat(`${userItemlength}`) > 0) {
                    for (let i = 0; i < userItemlength; i++) {
                        promiseArray.push(housepoolInstance.methods.Users(`${userAddress}`, i).call());
                    }
                }
                const usersArray = await Promise.all(promiseArray)
                console.log("TotalFunds", usersArray.reduce((a: any, c: any) => a + parseFloat(c.Balance), 0));
                let totalFunds = usersArray.reduce((a: any, c: any) => a + parseFloat(c.Balance), 0);
                setTotalFunds(totalFunds);

                let totalValueLocked = await housepoolInstance.methods.TotalValueLocked().call();
                setTotalValueLocked(totalValueLocked);
                // console.log("totalValueLocked",totalValueLocked);

                let totalDepositedAmount = await housepoolInstance.methods.TotalDepositedAmount().call();
                if (totalFunds !== 0 && totalDepositedAmount !== 0) {
                    totalFunds = convertToEther(`${totalFunds}`)
                    totalDepositedAmount = convertToEther(`${totalDepositedAmount}`)
                    setPoolContributionPercent((totalFunds / totalDepositedAmount) * 100);
                }
            }
        } //

        getdata();


    }, [userAddress, depositDoneNumber, withdrawDoneNumber])

    const handleDeposit = () => {
        const localChecked = localStorage.getItem("ShowDisclaimer");

        if (localStorage.getItem("Agree") !== "true")
            setshowDisclaimer(true)
        else
            if (!userAddress) setShowConnectWalletAlert(true);
            else setshowDepositModal(true); setActionType('deposit');
    }

    const handleWithDraw = () => {
        const localChecked = localStorage.getItem("ShowDisclaimer");

        if (localStorage.getItem("Agree") !== "true")
            setshowDisclaimer(true)
        else
            if (!userAddress) setShowConnectWalletAlert(true);
            else setshowWithdrawModal(true); setActionType('withdraw')
    }
    return (
        <HousePoolCont>
            <Header extraLogo={pulseLuckLogo} />
            <InfoContainer>
                <InfoTextContainer
                    style={{ margin: "0 5%" }}
                >
                    {/* <H3>Wallet {'>'} Liquidity</H3> */}
                    <H1>HOUSE POOL</H1>
                    {/* <H3>Pulse Token (PLS) </H3> */}
                    <HouseP>Deposit PLS into the House Pool to earn your share of the winnings
                    </HouseP>
                    <Link onClick={() => setshowDisclaimer(true)}>
                        {/* Read our disclaimer to know more */}
                        Read Terms and Conditions
                    </Link>
                </InfoTextContainer>
                <FlexCont
                    style={{ margin: "0 5%" }}
                >
                    <PrimaryButton width="300px"
                        style={{ padding: '25px', fontSize: '18px', marginBottom: "30px" }}
                        onClick={() => handleDeposit()}
                    >DEPOSIT FUNDS (PLS)</PrimaryButton>
                </FlexCont>
            </InfoContainer>
            <PoolDetailsContainer>
                {/* <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 450px) minmax(300px, 1fr)',
                    gridColumnGap: '20px',
                    gridRowGap: '20px',

                    paddingTop: "50px",
                }}> */}
                <PoolDetailsGridItem>
                    {/* <div style={{
                        background: "linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%)",
                        boxShadow: "0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9)",
                        borderRadius: "20px",
                    }}> */}
                    <FlexCont style={{ flexDirection: 'row', justifyContent: "space-around", height: '30%', alignItems: "center", width: '100%', }}>
                        <FlexCont
                            justifyContent="center"
                            alignItems="center"

                        >
                            <h3>liquidity</h3>
                            <h1>${parseFloat(`${convertToEther(`${totalValueLocked}`)}`).toFixed(3)}</h1>
                            <p>{parseFloat(`${convertToEther(`${totalValueLocked}`)}`).toFixed(3)} PLS</p>
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
                            <h1>{parseFloat(`${convertToEther(`${totalFunds}`)}`).toFixed(3)}
                                <span style={{ fontSize: "14px", marginLeft: "5px" }}>({`${parseFloat(`${poolContributionPercent}`).toFixed(4)}%`})</span>
                            </h1>
                            <p>PULSE TOKEN</p>
                        </PoolFundsCont>
                    </FlexCont>
                    <FlexCont
                        style={{ marginBottom: "30px", width: '100%', flexDirection: 'row', justifyContent: 'center', height: '20%' }}
                    >
                        <PrimaryButton
                            width="40%"
                            margin="0 10px"
                            onClick={() => handleDeposit()}
                            style={{ padding: '18px' }}

                        >DEPOSIT FUNDS
                        </PrimaryButton>
                        <PrimaryButton
                            width="45%"
                            margin="0 10px"
                            color={colors.primary}
                            onClick={() => handleWithDraw()}
                            style={{ padding: '18px' }}

                        >WITHDRAW FUNDS</PrimaryButton>
                    </FlexCont>
                    {/* </div> */}
                </PoolDetailsGridItem>
                <PoolDetailsGridItem>
                    {/* <div style={{
                        background: "linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%)",
                        boxShadow: "0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9)",
                        borderRadius: "20px",
                        padding: "20px"
                    }}> */}
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
                    <div style={{ width: '100%', height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {liquidityChartData && liquidityChartData.length ?
                            <BarChart chartData={liquidityChartData} setHoverValue={setHoverLiquidityChartValue} setHoverDate={setHoverLiquidityChartDate} />
                            : <p style={{ opacity: '0.5', color: "white" }}>No data available</p>
                        }
                    </div>
                    {/* </div> */}
                </PoolDetailsGridItem>

                {/* </div> */}

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
                <div style={{ padding: '30px 5%', width: '100%' }}>

                    <h1 style={{ color: "#fff" }}>Transactions</h1>
                    <HousePoolTransaction depositDoneNumber={depositDoneNumber} withdrawDoneNumber={withdrawDoneNumber} />
                </div>
            </TransactionContainer>


            {showDepositModal &&
                <CustomModal
                    show={showDepositModal}
                    toggleModal={() => setshowDepositModal(false)}
                    heading={ActionType === "deposit" ? "DEPOSIT FUNDS" : "WITHDRAW FUNDS"}
                >
                    <HousePoolModal userAddress={userAddress} walletBalance={walletBalance} ActionType={ActionType} txWaiting={txWaiting} depositDoneSuccess={() => setDepositDoneNumber(depositDoneNumber + 1)} closeModal={() => setshowDepositModal(false)} setTxWaiting={setTxWaiting} setTxSuccess={setTxSuccess} setTxError={setTxError} />
                </CustomModal>}

            {showWithdrawModal &&
                <CustomModal
                    show={showWithdrawModal}
                    toggleModal={() => setshowWithdrawModal(false)}
                    heading={"WITHDRAW FUNDS"}
                >
                    <HousePoolWithdrawModal userAddress={userAddress} walletBalance={walletBalance} ActionType={ActionType} txWaiting={txWaiting} withdrawDoneSuccess={() => setWithdrawDoneNumber(withdrawDoneNumber + 1)} closeModal={() => setshowWithdrawModal(false)} setTxWaiting={setTxWaiting} setTxSuccess={setTxSuccess} setTxError={setTxError} />
                </CustomModal>}

            {showConnectWalletAlert &&
                <CustomModal
                    show={showConnectWalletAlert}
                    toggleModal={() => setShowConnectWalletAlert(false)}
                    heading={"Connect To Wallet First"}
                >
                    {/* <HousePoolWithdrawModal userAddress={userAddress} walletBalance={walletBalance} ActionType={ActionType} withdrawDoneSuccess={() => setWithdrawDoneNumber(withdrawDoneNumber+1)}  closeModal={() => setshowWithdrawModal(false)}  /> */}
                </CustomModal>}

            {/* <TransactionWaiting
            show={txWaiting}
            toggleModal={() => setTxWaiting(false)}
            >
            </TransactionWaiting> */}
            <TransactionSuccess
                show={txSuccess}
                toggleModal={() => setTxSuccess(false)}
            >
            </TransactionSuccess>
            <TransactionError
                show={txError}
                toggleModal={() => setTxError(false)}
            >
            </TransactionError>


            {showConnectWalletAlert &&
                <Alertmsg
                    show={showConnectWalletAlert}
                    toggleModal={() => setShowConnectWalletAlert(false)}
                    alertText={'Connect To Wallet First'}

                >
                    {/* <HousePoolWithdrawModal userAddress={userAddress} walletBalance={walletBalance} ActionType={ActionType} withdrawDoneSuccess={() => setWithdrawDoneNumber(withdrawDoneNumber+1)}  closeModal={() => setshowWithdrawModal(false)}  /> */}
                </Alertmsg>}


            <Disclaimer show={showDisclaimer} toggleModal={() => setshowDisclaimer(false)} />
        </HousePoolCont >
    );
};

export default HousePool;