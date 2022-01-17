import DiceIcon from "assets/icons/Diceicon.svg";
import { setLastRollData } from "logic/action/wallet.action";
import ResultsModal from 'modules/betting/modals/ResultsModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from 'shared/button/Button';
import { convertToEther } from 'utils/helper';
import LossIcon from "../../assets/icons/Lossicon.svg";
import WinIcon from "../../assets/icons/Winicon.svg";
import { H1, LastRollCont, LastRollDetails, LastRollDetailsCont, LastRollHeader, TABLE, TD, TR } from './styleNew';



const LastRollsNew = (props: any) => {

    const [showResultModal, setShowResultModal] = useState(false);
    const [LastRolls, setLastRolls] = useState<any>([])

    const { lastRollsData } = useSelector((state: any) => state.wallet);
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("LastRolls") !== null) {
            const lastRolls = JSON.parse(localStorage.getItem("LastRolls") || "");
            setLastRolls(lastRolls)
            // dispatch(setLastRollData(lastRolls))

        }
    }, [lastRollsData])

    const NoResultMessage = () => {
        if (localStorage.getItem("LastRolls") === null) {
            return 'No Previous Result Was Found';
        } else {
            return;
        }
    };

    return (
        <LastRollCont>
            <LastRollHeader>
                <h1>Your last rolls</h1>
                <img src={DiceIcon} alt="dice-icon" />

            </LastRollHeader>
            <LastRollDetailsCont>
                <LastRollDetails>
                    <TABLE>
                        <tbody>

                        <TR header key="">

                            <TD header># DATE AND TIME</TD>
                            <TD>BET AMOUNT</TD>
                            <TD>MIN CHANCE</TD>
                            <TD>GAIN/LOSS</TD>
                        </TR>
                        <H1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-30%)', width: '300px' }}>{NoResultMessage()}</H1>
                        {LastRolls.slice(0, 4).map((Roll: any, index: any) => (
                            <TR key={"lr" + index}>
                                <TD style={{ textAlign: "left" }}>
                                    #{index + 1} - {Roll.Date}
                                </TD>
                                <TD>{Roll.BetAmount.substring(0, 8)}</TD>
                                <TD>{Roll.Playernumber - 1}%</TD>
                                {Roll.Status === "1" ? (
                                    <TD>
                                        {" "}
                                        <img src={WinIcon} style={{ marginRight: "5px" }} alt='win-arrow' />
                                        {(convertToEther(Roll.Value) - Roll.BetAmount).toFixed(5)}
                                    </TD>
                                ) : (
                                    <TD>
                                        <img src={LossIcon} style={{ marginRight: "5px" }} alt='lost-arrow' />
                                        {convertToEther(Roll.Value).substring(0, 7)}
                                    </TD>
                                )}
                            </TR>
                        ))}
                            </tbody>
                    </TABLE>
                </LastRollDetails>
                <PrimaryButton className="button"
                    onClick={() => setShowResultModal(true)}
                >Show more</PrimaryButton>
            </LastRollDetailsCont>

            <ResultsModal
                show={showResultModal}
                toggleModal={() => setShowResultModal(false)}
            />

        </LastRollCont>
    );
};

export default LastRollsNew;