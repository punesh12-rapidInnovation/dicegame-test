import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
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
  Percentchance,
} from "./style";
import Web3 from "web3";
import historyicon from "../../assets/icons/history.svg";
import { MinBetAmount } from "../blockChain/bettingMethods";
import { convertToEther } from "../../utils/helper";

const Betting = () => {
  const [Rangevalue, setRangevalue] = useState<number>(1);
  const [BetAmount, setBetAmount] = useState<any>();

  const { walletBalance } = useSelector((state: any) => state.wallet);

  const SetMinBetAmount = async () => {
    const MinBet = await MinBetAmount();
    setBetAmount(convertToEther(MinBet));
  };

  const RangeValueChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Rangepercent = parseInt(e.currentTarget.value);
    if (Rangepercent > 98) {
      setRangevalue(98);
      console.log("greater");
    } else if (Rangepercent < 1) {
      setRangevalue(1);
    } else {
      setRangevalue(Rangepercent);
    }
  };

  return (
    <Betbox>
      <Bettop>
        <img src={historyicon} style={{ marginRight: "10px" }} /> YOUR LAST 10
        ROLLS
      </Bettop>
      <Betmiddle>
        <Flexcolumn style={{ width: "100%" }}>
          <H2 style={{ fontSize: "13px" }}>
            BET AMOUNT | AVL BL: {walletBalance ? walletBalance : 0} PLS
          </H2>
          <Flex
            style={{ justifyContent: "space-between", marginBottom: "12px" }}
          >
            <Chance
              value={BetAmount}
              onChange={(e) => console.log(e.target.value)}
            />
            <Flex style={{ width: "75%", maxWidth: "300px" }}>
              <Transchance onClick={SetMinBetAmount}> MIN</Transchance>
              <Transchance onClick={() => setBetAmount(5)}>5</Transchance>
              <Transchance onClick={() => setBetAmount(6)}>6</Transchance>
              <Transchance onClick={() => setBetAmount(10)}>10</Transchance>

              <Transchance onClick={() => setBetAmount(5)}>MAX</Transchance>
            </Flex>
          </Flex>
        </Flexcolumn>
        <Flexcolumn style={{ width: "100%" }}>
          <H2 style={{ marginBottom: "16px" }}>CHANCE OF WINNING</H2>
          <Flex>
            <Flexcolumn style={{ width: "30%" }}>
              <Percentchance style={{ marginBottom: "8px" }}>
                {Rangevalue}%
              </Percentchance>
              <H2 style={{ fontSize: "12px" }}>Min Chance</H2>
            </Flexcolumn>
            <Flex
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
              }}
            >
              <Range
                type="range"
                value={Rangevalue}
                onChange={RangeValueChanger}
              ></Range>
            </Flex>
          </Flex>
        </Flexcolumn>
        <Flex>
          <H2 style={{ marginBottom: "6px" }}>ROLL UNDER </H2>
          <H1 style={{ fontSize: "16px", marginBottom: "6px" }}>
            {Rangevalue + 1}
          </H1>
        </Flex>
        <Flex>
          <H2>Profit </H2>
          <H1 style={{ fontSize: "16px" }}>+5.2551 PLS</H1>
        </Flex>
      </Betmiddle>
      <Betbottom>
        <Rolldice>Roll Dice</Rolldice>
      </Betbottom>
    </Betbox>
  );
};

export default Betting;
