import { useState, useEffect } from 'react';
import { PrimaryButton } from 'shared/button/Button';
import { FlexCont, H1, HousePoolCont, Input, InputCont, Dropdown } from './style';

import pulseIcon from "assets/icons/pulseIcon.svg";
import downCarotIcon from 'assets/icons/downCarot.svg'
import { floatNumRegex } from 'shared/helpers/regrexConstants';
import { instanceType, selectInstances } from 'utils/contracts';
import { convertToEther, convertToWei } from 'utils/helper';
import CircleTimer from 'shared/circleTimer/CircleTimer';

const HousePoolWithdrawModal = (props: any) => {
    const { show, toggleModal, styles, userAddress, walletBalance, ActionType,withdrawDoneSuccess,closeModal } = props;
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [depositList, setDepositList] = useState<any>([]);
    const [showDepositList, setShowDepositList] = useState(false)
    const [depositSelected, setDepositSelected] = useState<any>({ presentBalance: 0.00, Balance: 0.00, pendingRewards: 0.00, index: 0 })


    useEffect(() => {
        const getdata = async () => {
            try {
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

                    setDepositList(depositsArray.map((item: object, i: number) => ({ ...item, releaseTime: releaseTime, presentBalance: mypresentBalances[i], pendingRewards: pendingRewards[i], index: i })))
                }
            } catch (error) {
                console.log(error);

            }
        }
        getdata();
    }, [userAddress])


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

            const value = withdrawAmount;

            const housepoolInstance = await selectInstances(
                instanceType.HOUSEPOOL, // type of instance
            );
            const receipt = await housepoolInstance.methods.withdraw(convertToWei(value), depositSelected.index).send({
                from: userAddress,
            })
            console.log("receipt", receipt);

            withdrawDoneSuccess();
            closeModal();

        } catch (error) {
            closeModal();
            console.log(error);

        }
    }

    return (
        <>
        <HousePoolCont>
            <H1>HOUSE POOL</H1>
            {Object.values(depositSelected).filter(x => x).length ? <CircleTimer value={(depositSelected.DepositTime+depositSelected.releaseTime)-(Date.now()/1000)}></CircleTimer> 
            : null}
            <div style={{
                width: '100%',
                background: '#2A1966',
                boxShadow: '0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7',
                borderRadius: '20px',
                padding: "20px",
                margin: '30px 0 0 0',
                color: "#fff",
                position: "relative",
                cursor: "pointer",
            }}
                onClick={() => setShowDepositList(!showDepositList)}
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
                    <div> Deposits <img src={downCarotIcon} /> </div>
                </div>

                {showDepositList &&
                    <Dropdown>
                        {depositList.length ?
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
                        <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                          <span>No Deposits</span>
                        </div>
                        }
                    </Dropdown>}
            </div>
            <InputCont isDisabled={!Object.values(depositSelected).filter(x => x).length}>
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
            <PrimaryButton margin={"30px 0 0 0"} onClick={handleWithdraw} disabled={!parseFloat(withdrawAmount)}>Withdraw</PrimaryButton>
        </HousePoolCont >
        </>
    );
};

export default HousePoolWithdrawModal;