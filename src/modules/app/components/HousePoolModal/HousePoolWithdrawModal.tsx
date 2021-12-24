import { useState, useEffect } from 'react';
import { PrimaryButton } from 'shared/button/Button';
import { FlexCont, H1, HousePoolCont, Input, InputCont, Dropdown, WithdrawTimer } from './style';

import pulseIcon from "assets/icons/pulseIcon.svg";
import downCarotIcon from 'assets/icons/downCarot.svg'
import { floatNumRegex } from 'shared/helpers/regrexConstants';
import { instanceType, selectInstances } from 'utils/contracts';
import { convertToEther, convertToWei } from 'utils/helper';
import CircleTimer from 'shared/circleTimer/CircleTimer';
import { setWalletBalance } from "logic/action/wallet.action";
import web3 from 'utils/web3';
import { useDispatch } from 'react-redux';

const HousePoolWithdrawModal = (props: any) => {
    const { show, toggleModal, styles, userAddress, walletBalance, ActionType, txWaiting, withdrawDoneSuccess,closeModal,setTxWaiting, setTxSuccess, setTxError } = props;
    const dispatch = useDispatch();
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [depositList, setDepositList] = useState<any>([]);
    const [showDepositList, setShowDepositList] = useState(false)
    const [depositSelected, setDepositSelected] = useState<any>({ presentBalance: 0.00, Balance: 0.00, pendingRewards: 0.00, index: 0 })
    const [loading, setLoading] = useState<any>(false);

    const getdata = async () => {
            try {
                setLoading(true);
                console.log(userAddress);
                if (userAddress) {
                    const housepoolInstance = await selectInstances(
                        instanceType.HOUSEPOOL, // type of instance
                    );
                    let userItemlength = await housepoolInstance.methods.UserItemlength(`${userAddress}`).call()
                    console.log("userItemlength", userItemlength);
                    let promiseArray = [];
                    if (parseFloat(`${userItemlength}`) > 0) {
                        for (let i = 0; i < userItemlength; i++) {
                            promiseArray.push(housepoolInstance.methods.Users(`${userAddress}`, i).call());
                        }
                    }
                    const depositsArray = await Promise.all(promiseArray);
                    console.log("depositsArray", depositsArray);
                    //GetMypresentBalance
                    promiseArray = [];
                    if (parseFloat(`${userItemlength}`) > 0) {
                        for (let i = 0; i < userItemlength; i++) {
                            promiseArray.push(housepoolInstance.methods.GetMypresentBalance(`${userAddress}`, i).call());
                        }
                    }
                    const mypresentBalances = await Promise.all(promiseArray);
                    console.log("mypresentBalances", mypresentBalances);
                    //PendingRewards
                    promiseArray = [];
                    if (parseFloat(`${userItemlength}`) > 0) {
                        for (let i = 0; i < userItemlength; i++) {
                            promiseArray.push(housepoolInstance.methods.PendingRewards(`${userAddress}`, i).call());
                        }
                    }
                    const pendingRewards = await Promise.all(promiseArray);
                    console.log("PendingRewards", pendingRewards);
                    //ReleaseTime
                    const releaseTime = await housepoolInstance.methods.releaseTime().call();
                    console.log("releaseTime", releaseTime);

                    setDepositList(depositsArray.map((item: any, i: number) => ({ ...item, releaseTime: releaseTime, presentBalance: mypresentBalances[i], pendingRewards: pendingRewards[i], 
                        lockedTimePeriod: (parseFloat(item.DepositTime)+parseFloat(releaseTime))-(Date.now()/1000), 
                        isUnlocked:(parseFloat(item.DepositTime)+parseFloat(releaseTime))-(Date.now()/1000)<=0,
                        index: i })))//   10 + (10*i)
                }
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

    useEffect(() => {
        getdata();
    }, [userAddress])

    const unlockDeposit = (depositIndex:number) => {
        const newDepositList = depositList.map((item:any,i:number) => {
            if(i===depositIndex) return ({...item, isUnlocked:true})
            else return item;
        });
        setDepositList(newDepositList);

        if(Object.values(depositSelected).filter(x => x).length){
            setDepositSelected(newDepositList[depositSelected.index]);
        }
    }

    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };


    const handleWithdrawAmount = (e: any) => {
        const { value } = e.target
        if (floatNumRegex.test(value.toString())) {
            setWithdrawAmount(value)
        }
        if (!value) {
            setWithdrawAmount("")
        }
    }

    const handleMaxWithdraw = () => {

        // if (ActionType === "deposit")
        //     // setWithdrawAmount(lpBalance)
        //     setWithdrawAmount('')
        // else
        setWithdrawAmount(convertToEther(depositSelected.presentBalance));
        // setWithdrawAmount(dataForStaking.staked)
    }

    const handleWithdraw = async () => {
        try {
            setTxWaiting(true); setTxSuccess(false); setTxError(false);

            const value = withdrawAmount;

            const housepoolInstance = await selectInstances(
                instanceType.HOUSEPOOL, // type of instance
            );
            const receipt = await housepoolInstance.methods.withdraw(convertToWei(value), depositSelected.index).send({
                from: userAddress,
            })
            console.log("receipt", receipt);
            
            const balance = await web3.eth.getBalance(userAddress);
            dispatch(setWalletBalance(convertToEther(balance)));

            withdrawDoneSuccess();
            setTxWaiting(false); setTxSuccess(true); setTxError(false);
            // resetModal();
            closeModal();

        } catch (error) {
            console.log(error);
            setTxWaiting(false); setTxSuccess(false); setTxError(true);
            // resetModal();
            closeModal();

        }
    }

    // const resetModal = () => {
    //     setDepositSelected({ presentBalance: 0.00, Balance: 0.00, pendingRewards: 0.00, index: 0 });
    //     setWithdrawAmount("");
    //     setShowDepositList(false);
    // }

    // const getLockedTimePeriod = (item:any) => {
    //     console.log("lockedTimePeriod",item.DepositTime+item.releaseTime);
    //     console.log(Date.now()/1000);
        
    //     // const lockedTimePeriod = (parseFloat(item.DepositTime)+parseFloat(item.releaseTime))-(Date.now()/1000);
    //     const lockedTimePeriod = 10 + (item.index*20);
    //   return lockedTimePeriod
    // }
    return (
        <>
        <HousePoolCont>
            <FlexCont
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            margin="0"
            >
                <H1>HOUSE POOL</H1>
                {
                depositList.map((item:any) => 
                <WithdrawTimer timeInSec={item.lockedTimePeriod} isShown={Object.values(depositSelected).filter(x => x).length && item.index === depositSelected.index } >
                  <CircleTimer value={item.lockedTimePeriod} actionAfterTimerOver={() => unlockDeposit(item.index)} ></CircleTimer>
                </WithdrawTimer>
                )}
            </FlexCont>
            <div style={{color:"#fff"}}>
            Withdrawing your funds leads to resetting your remaining balance with Loss and all your rewards will be distributed.
            </div>
            <div style={{
                width: '100%',
                background: '#2A1966',
                boxShadow: '0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7',
                borderRadius: '20px',
                padding: "20px",
                margin: '30px 0 0 0',
                color: "#fff",
                position: "relative",
            }}
            >

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <p>Total Balance: {depositSelected.Balance && parseFloat(convertToEther(depositSelected.Balance))}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {
                        Object.values(depositSelected).filter(x => x).length ?
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img style={{ marginRight: "10px" }} src={pulseIcon} alt="" /><span>Deposit {depositSelected.index + 1}</span>
                            </div>
                            :
                            <div> Select A Deposit</div>
                    }
                    <div style={{cursor: "pointer"}} onClick={() => setShowDepositList(!showDepositList)}> Deposits <img src={downCarotIcon} /> </div>
                </div>

                {showDepositList &&
                    <Dropdown>
                        {
                        depositList.length ?
                        depositList.map((item: any, i: number) =>
                            <>
                                <div key={i} style={{ padding: "10px", display: "flex", alignItems: "center" }}
                                    onClick={() => { setDepositSelected(item); setShowDepositList(false) }}>
                                    <img style={{ marginRight: "10px" }} src={pulseIcon} alt="" />
                                    <span>Deposit {i + 1}</span>
                                </div>

                            </>
                        )
                        :
                        loading?
                        <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                          <span>Loading...</span>
                        </div>
                        :
                        <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                          <span>No Deposits</span>
                        </div>
                        }
                    </Dropdown>}
            </div>
            <InputCont isDisabled={!Object.values(depositSelected).filter(x => x).length || !depositSelected.isUnlocked}>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    margin="0 0 10px 0"
                    width="100%"
                >
                    <div>Input</div>
                    <div>Balance With Loss: {depositSelected.presentBalance ? parseFloat(convertToEther(depositSelected.presentBalance)) : 0.00}</div>
                </FlexCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    margin="0"
                    width="100%"
                >
                    <Input
                        placeholder="0.00"
                        onChange={handleWithdrawAmount}
                        value={withdrawAmount}
                        disabled={depositSelected.presentBalance ? false : true}
                    />
                    <FlexCont

                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    > <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleMaxWithdraw()}
                    > MAX</span>  <img src={pulseIcon} alt="" /> PLS</FlexCont>
                </FlexCont>
            </InputCont>
            <div style={{margin:"10px 0", color:"#fff", textAlign:"right"}}>Pending Rewards: { depositSelected.pendingRewards ?  parseFloat(convertToEther(depositSelected.pendingRewards)): 0.00} PLS</div>
            <PrimaryButton margin={"30px 0 0 0"} onClick={handleWithdraw} disabled={!parseFloat(withdrawAmount) || txWaiting}>Withdraw</PrimaryButton>
        </HousePoolCont >
        </>
    );
};

export default HousePoolWithdrawModal;