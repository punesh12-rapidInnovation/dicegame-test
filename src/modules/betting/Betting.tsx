import React,{useState} from 'react';
import {
    GlobalChatSection,
    Box,
    ChatBox,
    ChatTopdiv,
    ChatMiddlediv,
    Input,
    Button,
    PopupModal,
    Ownmsg,
    Messagediv,
    InputParent,
    Betbox,
    Bettop,
    Betmiddle,
    Betbottom,
    Rolldice,
    H2,
    Flexcolumn,
    Flex,
    H1,
    Chance,
    Range,
    Transchance,
    Percentchance


} from './style'
import Web3 from 'web3';
import historyicon from '../../assets/icons/history.svg';
import threedot from '../../assets/images/threedot.svg';
import { Betting_Abi,Contract_Address } from '../blockChain/abi';



const Betting = () => {
    const [Rangevalue, setRangevalue] = useState('');
    const [BetAmount, setBetAmount] = useState();



    const web3 = new Web3(Web3.givenProvider);


    // @ts-ignore
    const PulseRoll = new web3.eth.Contract(Betting_Abi, Contract_Address)
    


    


    const GetMinBet = async() => {
        const MinBetAmount = await PulseRoll.methods.minBet().call();
        const Balance = await PulseRoll.methods.contractBalance().call();
        console.log(MinBetAmount / 1e18);
        console.log(Balance / 1e18);

    }



    return (
        <Betbox>
                    <Bettop><img src={historyicon} style={{ marginRight: '10px' }} /> YOUR LAST 10 ROLLS</Bettop>
                    <Betmiddle>
                        <Flexcolumn style={{ width: '100%' }}>
                            <H2 style={{ fontSize: '13px' }}>BET AMOUNT | AVL BL: PLS</H2>
                            <Flex style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
                        <Chance type='number' value={BetAmount} onChange={(e) =>  console.log(e.target.value)}/>
                                <Flex style={{ width: '75%', maxWidth: '300px' }}>
                                    <Transchance onClick={GetMinBet}> MIN</Transchance>
                                    <Transchance>5</Transchance>
                                    <Transchance>6</Transchance>
                                    <Transchance>10</Transchance>

                                    <Transchance>MAX</Transchance>
                                </Flex>

                            </Flex>


                        </Flexcolumn>
                        <Flexcolumn style={{ width: '100%' }}>
                            <H2 style={{ marginBottom: '16px' }}>CHANCE OF WINNING</H2>
                            <Flex>

                                <Flexcolumn style={{ width: '30%' }}>

                                    <Percentchance style={{ marginBottom: '8px' }}>{Rangevalue}%</Percentchance>
                                    <H2 style={{ fontSize: '12px' }}>Min Chance</H2>
                                </Flexcolumn>
                                <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '70%' }}>
                                    <Range type="range" value={Rangevalue} onChange={(event) => setRangevalue(event.target.value)}></Range>
                                </Flex>

                            </Flex>

                        </Flexcolumn>
                        <Flex>
                            <H2 style={{ marginBottom: '6px' }}>ROLL UNDER </H2>
                            <H1 style={{ fontSize: '16px', marginBottom: '6px' }}>{parseInt(Rangevalue) + 1}</H1>

                        </Flex>
                        <Flex>
                            <H2 >Profit </H2>
                            <H1 style={{ fontSize: '16px' }}>+5.2551 PLS</H1>

                        </Flex>


                    </Betmiddle>
                    <Betbottom>
                        <Rolldice>Roll Dice</Rolldice>
                    </Betbottom>
                </Betbox>
    );
};                                                                               

export default Betting;