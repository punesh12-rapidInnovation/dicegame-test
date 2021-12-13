import { PrimaryButton } from 'shared/button/Button';
import { FlexCont, H1, HousePoolCont, Input, InputCont } from './style';

import pulseIcon from "assets/icons/pulseIcon.svg";
import { useState } from 'react';
import { floatNumRegex } from 'shared/helpers/regrexConstants';

const HousePoolModal = (props: any) => {
    const { show, toggleModal, styles, userAddress, walletBalance, ActionType } = props;
    const [stakeAmount, setStakeAmount] = useState('')


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };


    const handleSendAmount = (e: any) => {
        const { value } = e.target
        if (floatNumRegex.test(value.toString())) {
            setStakeAmount(value)
        }
        if (!value) {
            setStakeAmount("")
        }
    }

    const handleMaxStaked = () => {

        if (ActionType === "deposit")
            // setStakeAmount(lpBalance)
            setStakeAmount('')
        else
            setStakeAmount(Number(walletBalance).toFixed(6));
        // setStakeAmount(dataForStaking.staked)


    }

    return (
        <HousePoolCont>
            <H1>HOUSE POOL</H1>
            <InputCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <p>Input</p>
                    <p>Balance: {!!walletBalance && Number(walletBalance).toFixed(6)}</p>
                </FlexCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Input
                        placeholder="0.00"
                        onChange={handleSendAmount}
                        value={stakeAmount}
                    />
                    <FlexCont

                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    > <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleMaxStaked()}
                    > MAX</span>  <img src={pulseIcon} alt="" /> PLS</FlexCont>
                </FlexCont>
            </InputCont>
            <PrimaryButton>{ActionType === "deposit" ? "Deposit" : "Withdraw"}</PrimaryButton>
        </HousePoolCont >
    );
};

export default HousePoolModal;