import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";

import {
  BetBox,
  BetMiddle,
  BetBottom,
  RollDice,
  H2,
  FlexColumn,
  Flex,
  H1,
  Chance,
  Range,
  TransChance,
  PercentChance,
} from "./style";
import {
  MinBetAmount,
  HouseEdge,
  HouseEdgeDiviser,
  PlaceBet,
} from "../blockChain/bettingMethods";
import { convertToEther } from "../../utils/helper";
import { CheckAllowance } from "../blockChain/Routermethods";
import { BETTING_ADDRESS } from "../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import { ROUTER_ADDRESS } from "../../config";


const Betting = () => {
  const [RangeValue, setRangeValue] = useState<number>(1);
  const [BetAmount, setBetAmount] = useState<number>(0);
  const [Profit, setProfit] = useState<number>(0);
  const [MyAddress, setMyAddress] = useState<any>();
  const [UserAllowance, setUserAllowance] = useState(false);

    const { walletBalance } = useSelector((state: any) => state.wallet);
    

  const SetMinBetAmount = async () => {
    const MinBet = await MinBetAmount();
    setBetAmount(convertToEther(MinBet));   
  };

  const RangeValueChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const RangePercent = parseInt(e.currentTarget.value);
    if (RangePercent > 98) {
      setRangeValue(98);
      console.log("greater");
    } else if (RangePercent < 1) {
      setRangeValue(1);
    } else {
      setRangeValue(RangePercent);
    }
    };
    
    const BetSetThroughInput = (e: any) => {
        if (e.target.value <= 10) {
            setBetAmount(e.target.value)
        } 
     
 }

  const CallingPlaceBet = () => {
    const myAddress: any = localStorage.getItem("address");
    PlaceBet(JSON.parse(myAddress), BetAmount, RangeValue);
  };

  const ProfitCalculator = async () => {
    const Houseedgeamount = await HouseEdge();
    const Houseedgediviseramount = await HouseEdgeDiviser();

    const Profit =
      (((BetAmount * (100 - RangeValue)) / RangeValue + BetAmount) *
        Houseedgeamount) /
        Houseedgediviseramount -
      BetAmount;
    const showingProfit = (Math.round(Profit * 100) / 100).toFixed(5);
    setProfit(parseFloat(showingProfit));
    };
    

  const CheckAllowanceStatus = async () => {
      const myAddress: any = localStorage.getItem("address");

      if (myAddress) {
             const CheckAllowanceResult = await CheckAllowance(
                  JSON.parse(myAddress),
                  BETTING_ADDRESS
              );
              if (CheckAllowanceResult > 1 || CheckAllowanceResult === 1) {
                  setUserAllowance(true);
              } else {
                  setUserAllowance(false);
              }
      } 
          
    };

    const HandleAllowance = async () => {
        const myAddress: any = localStorage.getItem("address");
        if (myAddress) {
            const OwnerAddress: string = JSON.parse(myAddress);
            //create instance of an abi to call any blockChain function
            const lpInstance = await selectInstances(
                instanceType.ERC20TOKEN, // type of instance
                ROUTER_ADDRESS //contract address

            );
            
            if (true) {
                const approvalAmount = ethers.constants.MaxUint256 //  Infinite number
                const CheckAllowanceResult = await lpInstance.methods
                    .approve(BETTING_ADDRESS, approvalAmount)
                    .send({ from: OwnerAddress })
                    .once('confirmation',
                        function (receipt: any) {
                  
                            setUserAllowance(true)
                  
                        });
      
            }
        } else {
            alert("Connect wallet to place bet")
        }
};

  useEffect(() => {
    ProfitCalculator();
    CheckAllowanceStatus();
  });

  return (
    <BetBox>
      <BetMiddle>
        <FlexColumn style={{ width: "100%" }}>
          <H2 style={{ fontSize: "13px" }}>
            BET AMOUNT | AVL BL: {walletBalance ? walletBalance : 0} PLS
          </H2>
          <Flex
            style={{ justifyContent: "space-between", marginBottom: "12px" }}
          >
            <Chance
              value={BetAmount}
              onChange={(e) => BetSetThroughInput(e) }
            />
            <Flex style={{ width: "75%", maxWidth: "300px" }}>
              <TransChance onClick={SetMinBetAmount}> MIN</TransChance>
              <TransChance onClick={() => setBetAmount(5)}>5</TransChance>
              <TransChance onClick={() => setBetAmount(6)}>6</TransChance>
              <TransChance onClick={() => setBetAmount(10)}>10</TransChance>

              <TransChance onClick={() => setBetAmount(10)}>MAX</TransChance>
            </Flex>
          </Flex>
        </FlexColumn>
        <FlexColumn style={{ width: "100%" }}>
          <H2 style={{ marginBottom: "16px" }}>CHANCE OF WINNING</H2>
          <Flex>
            <FlexColumn style={{ width: "30%" }}>
              <PercentChance style={{ marginBottom: "8px" }}>
                {RangeValue}%
              </PercentChance>
              <H2 style={{ fontSize: "12px" }}>Min Chance</H2>
            </FlexColumn>
            <Flex
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
              }}
            >
              <Range
                type="range"
                value={RangeValue}
                onChange={RangeValueChanger}
              ></Range>
            </Flex>
          </Flex>
        </FlexColumn>
        <Flex>
          <H2 style={{ marginBottom: "6px" }}>ROLL UNDER </H2>
          <H1 style={{ fontSize: "16px", marginBottom: "6px" }}>
            {RangeValue + 1}
          </H1>
        </Flex>
        <Flex>
          <H2>Profit </H2>
          <H1 style={{ fontSize: "16px" }}>+{Profit} PLS</H1>
        </Flex>
      </BetMiddle>
          <BetBottom>
        {UserAllowance ? (
          <RollDice onClick={CallingPlaceBet}>Roll Dice</RollDice>
              ) : (
          <RollDice onClick={HandleAllowance}>Approve</RollDice>
        )}
      </BetBottom>
    </BetBox>
  );
};

export default Betting;
