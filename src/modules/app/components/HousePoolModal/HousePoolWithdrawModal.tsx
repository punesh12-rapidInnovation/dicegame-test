import { useState,useEffect } from 'react';
import { PrimaryButton } from 'shared/button/Button';
import { FlexCont, H1, HousePoolCont, Input, InputCont } from './style';

import pulseIcon from "assets/icons/pulseIcon.svg";
import { floatNumRegex } from 'shared/helpers/regrexConstants';
import { instanceType, selectInstances } from 'utils/contracts';
import { convertToEther, convertToWei } from 'utils/helper';

const HousePoolWithdrawModal = (props: any) => {
    const { show, toggleModal, styles, userAddress, walletBalance, ActionType } = props;
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [depositList, setDepositList] = useState<any>([]);
    const [showDepositList, setShowDepositList] = useState(false)
    const [depositSelected, setDepositSelected] = useState({presentBalance:0.00,index:0})


    useEffect(() => {
        const getdata = async () => {
            try {
                console.log(userAddress);
                if(userAddress){
                    const housepoolInstance = await selectInstances(
                        instanceType.HOUSEPOOL, // type of instance
                    );
                    let userItemlength= await housepoolInstance.methods.UserItemlength(`${userAddress}`).call()
                    console.log("userItemlength", userItemlength);
                    let promiseArray = [];
                    if (parseFloat(`${userItemlength}`)>0){
                        for(let i = 0; i<userItemlength; i++){
                            promiseArray.push(housepoolInstance.methods.Users(`${userAddress}`, i).call());
                        }
                    }
                    const depositsArray = await Promise.all(promiseArray);
                    console.log("depositsArray",depositsArray);
                    //GetMypresentBalance
                    promiseArray = [];
                    if (parseFloat(`${userItemlength}`)>0){
                        for(let i = 0; i<userItemlength; i++){
                            promiseArray.push(housepoolInstance.methods.GetMypresentBalance(`${userAddress}`, i).call());
                        }
                    }
                    const mypresentBalances = await Promise.all(promiseArray);
                    console.log("mypresentBalances",mypresentBalances);
                    // /PendingRewards
                    // promiseArray = [];
                    // if (parseFloat(`${userItemlength}`)>0){
                    //     for(let i = 0; i<userItemlength; i++){
                    //         promiseArray.push(housepoolInstance.methods.PendingRewards(`${userAddress}`, i).call());
                    //     }
                    // }
                    // const pendingRewards = await Promise.all(promiseArray);
                    // console.log("PendingRewards",pendingRewards);
                    
                    setDepositList(depositsArray.map((item:object,i:number) => ({...item, presentBalance: mypresentBalances[i], index:i})))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getdata();
    },[userAddress])


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

        if (ActionType === "deposit")
            // setWithdrawAmount(lpBalance)
            setWithdrawAmount('')
        else
            setWithdrawAmount(Number(walletBalance).toFixed(6));
        // setWithdrawAmount(dataForStaking.staked)
    }

    const handleWithdraw = async () => {
        try {
            const value = withdrawAmount;

            const housepoolInstance = await selectInstances(
                instanceType.HOUSEPOOL, // type of instance
            );
            const receipt = await housepoolInstance.methods.withdraw(value, depositSelected.index).send({
                from: userAddress,
                value: convertToWei(value),
            })
            console.log("receipt",receipt);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <HousePoolCont>
            <H1>HOUSE POOL</H1>
            <div style={{
                width:'100%',
                // height:'20px',
                background: '#2A1966',
                boxShadow: '0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7',
                borderRadius: '20px',
                padding:"20px",
                margin:'30px 0 0 0' ,
                color:"#fff",
                position:"relative"
            }}>
                <div onClick={() => setShowDepositList(!showDepositList)}>
                    Select A Deposit
                </div>
                {showDepositList && 
                <div style={{background: '#fff', color:"#000",position:"absolute",
                width: '100%',
                bottom: '-60px',
                transform: 'translateX(-4%)',
                }}>
                    { depositList.map((item:any,i:number) => 
                    <>
                    <div key={i} onClick={() => {setDepositSelected(item);setShowDepositList(false)}}>{convertToEther(item.Balance)}</div>
                    <hr/>
                    </>
                    )}
                </div>}
            </div>
            <InputCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <p>Input</p>
                    <p>Balance: {depositSelected.presentBalance && convertToEther(depositSelected.presentBalance)}</p>
                </FlexCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Input
                        placeholder="0.00"
                        onChange={handleWithdrawAmount}
                        value={withdrawAmount}
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
            <PrimaryButton onClick={handleWithdraw}>Withdraw</PrimaryButton>
        </HousePoolCont >
    );
};

export default HousePoolWithdrawModal;