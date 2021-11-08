import React, { useState, useEffect } from "react";
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
import historyicon from "../../assets/icons/history.svg";
import {
  MinBetAmount,
  HouseEdge,
  HouseEdgeDiviser,
  RollDice,
} from "../blockChain/bettingMethods";
import { convertToEther } from "../../utils/helper";
import { CheckAllowance } from "../blockChain/Routermethods";
import { BETTING_ADDRESS } from "../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import { ROUTER_ADDRESS } from "../../config";


const Betting = () => {
  const [Rangevalue, setRangevalue] = useState<number>(1);
  const [BetAmount, setBetAmount] = useState<number>(0);
  const [Profit, setProfit] = useState<number>(0);
  const [myAddress, setmyAddress] = useState<any>();
  const [userAllowance, setuserAllowance] = useState(false);

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

  const CallingRollDice = () => {
    const myAddress: any = localStorage.getItem("address");
    RollDice(JSON.parse(myAddress), BetAmount, Rangevalue);
  };

  const ProfitCalculator = async () => {
    const Houseedgeamount = await HouseEdge();
    const Houseedgediviseramount = await HouseEdgeDiviser();

    const Profit =
      (((BetAmount * (100 - Rangevalue)) / Rangevalue + BetAmount) *
        Houseedgeamount) /
        Houseedgediviseramount -
      BetAmount;
    console.log(Profit);
    const showingprofit = (Math.round(Profit * 100) / 100).toFixed(5);
    console.log(showingprofit);
    setProfit(parseFloat(showingprofit));
    //    ((useramount * (100 - (rollUnder- 1))) /
    //     (rollUnder-1) +useramount)
    // ) * houseEdge) / houseEdgeDivisor) -
    // useramount
    };
    

  const CheckUserAllowance = async () => {
      const myAddress: any = localStorage.getItem("address");

      if (myAddress) {
          console.log(myAddress)
               
          
        
               const CheckAllowanceResult = await CheckAllowance(
                  JSON.parse(myAddress),
                  BETTING_ADDRESS
              );
              if (CheckAllowanceResult > 1 || CheckAllowanceResult === 1) {
                  setuserAllowance(true);
              } else {
                  setuserAllowance(false);
              }
          }
    };

    const setAllowance = async () => {
        const myAddress: any = localStorage.getItem("address");
        if (myAddress) {
            const OwnerAddress: string = JSON.parse(myAddress);
            //create instance of an abi to call any blockChain function
            const lpInstance = await selectInstances(
                instanceType.ERC20TOKEN, // type of instance
                ROUTER_ADDRESS //contract address

            );
            if (true) {
                const CheckAllowanceResult = await lpInstance.methods
                    .approve(BETTING_ADDRESS, 1000000000000)
                    .send({ from: OwnerAddress })
                    .once('confirmation',
                        function (receipt: any) {
                  
                            setuserAllowance(true)
                  
                        });
      
            }
        } else {
            alert("Connect wallet to place bet")
        }
};

  useEffect(() => {
    ProfitCalculator();
    CheckUserAllowance();
  });

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
          <H1 style={{ fontSize: "16px" }}>+{Profit} PLS</H1>
        </Flex>
      </Betmiddle>
          <Betbottom>
        {userAllowance ? (
          <Rolldice onClick={CallingRollDice}>Roll Dice</Rolldice>
              ) : (
          <Rolldice onClick={setAllowance}>Approve</Rolldice>
        )}
      </Betbottom>
    </Betbox>
  );
};

export default Betting;
