import React from 'react';
import { LastRollCont, LastRollDetails, LastRollDetailsCont, LastRollHeader } from './styleNew';
import DiceIcon from "assets/icons/Diceicon.svg";
import { PrimaryButton } from 'shared/button/Button';

const LastRollsNew = () => {
    return (
        <LastRollCont>
            <LastRollHeader>
                <h1>

                    Your last rolls
                </h1>
                <img src={DiceIcon} alt="dice-icon" />

            </LastRollHeader>
            <LastRollDetailsCont>
                <LastRollDetails>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                </LastRollDetails>
                <PrimaryButton className="button">SHow more</PrimaryButton>
            </LastRollDetailsCont>

        </LastRollCont>
    );
};

export default LastRollsNew;