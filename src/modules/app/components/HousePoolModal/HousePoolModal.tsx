import { PrimaryButton } from 'shared/button/Button';
import { FlexCont, H1, HousePoolCont, Input, InputCont } from './style';

import pulseIcon from "assets/icons/pulseIcon.svg";
import { useState } from 'react';
import { floatNumRegex } from 'shared/helpers/regrexConstants';
import { instanceType, selectInstances } from 'utils/contracts';
import { convertToWei } from 'utils/helper';

const HousePoolModal = (props: any) => {
    const { show, toggleModal, styles, userAddress, walletBalance, ActionType } = props;
    const [depositAmount, setDepositAmount] = useState('')


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };


    const handleDepositAmount = (e: any) => {
        const { value } = e.target
        if (floatNumRegex.test(value.toString())) {
            setDepositAmount(value)
        }
        if (!value) {
            setDepositAmount("")
        }
    }

    const handleMaxDeposit = () => {

        // if (ActionType === "deposit")
        //     // setDepositAmount(lpBalance)
        //     setDepositAmount('')
        // else
            setDepositAmount(Number(walletBalance).toFixed(6));
        // setDepositAmount(dataForStaking.staked)
    }

    const handleDeposit = async () => {
        try {
            const value = depositAmount;

            const housepoolInstance = await selectInstances(
                instanceType.HOUSEPOOL, // type of instance
            );
            const receipt = await housepoolInstance.methods.deposit().send({
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
            <InputCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    margin="0 0 10px 0"
                    width="100%"
                >
                    <div>Input</div>
                    <div>Balance: {!!walletBalance && Number(walletBalance).toFixed(6)}</div>
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
                        onChange={handleDepositAmount}
                        value={depositAmount}
                    />
                    <FlexCont

                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    > <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleMaxDeposit()}
                    > MAX</span>  <img src={pulseIcon} alt="" /> PLS</FlexCont>
                </FlexCont>
            </InputCont>
            <PrimaryButton margin={"30px 0 0 0"} onClick={handleDeposit}>{ActionType === "deposit" ? "Deposit" : "Withdraw"}</PrimaryButton>
        </HousePoolCont >
    );
};

export default HousePoolModal;