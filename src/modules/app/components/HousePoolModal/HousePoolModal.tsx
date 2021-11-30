import { PrimaryButton } from 'shared/button/Button';
import { FlexCont, H1, HousePoolCont, InputCont } from './style';

import pulseIcon from "assets/icons/pulseIcon.svg";

const HousePoolModal = (props: any) => {
    const { show, toggleModal, styles } = props;


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };

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
                    <p>Balance: 21.56</p>
                </FlexCont>
                <FlexCont
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <p>0.00</p>
                    <FlexCont

                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    > <span > MAX</span>  <img src={pulseIcon} alt="" /> PLS</FlexCont>
                </FlexCont>
            </InputCont>
            <PrimaryButton>Deposit</PrimaryButton>
        </HousePoolCont >
    );
};

export default HousePoolModal;