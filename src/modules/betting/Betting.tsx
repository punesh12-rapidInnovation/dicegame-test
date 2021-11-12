import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import web3 from "../../utils/web3";
import { io } from "socket.io-client";
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
  BetResultPopup,
  Crossimg
} from "./style";
import {
  MinBetAmount,
  MaxBetAmount,
  HouseEdge,
  HouseEdgeDiviser,
} from "../blockChain/bettingMethods";
import Cross from '../../assets/icons/Cross.svg';
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
  const [BetplacedLoading, setBetplacedLoading] = useState(false);
  const [PlacingBetId, setPlacingBetId] = useState();
  const [ResultObject, setResultObject] = useState<any>()
  const [ResultPopupDisplay, setResultPopupDisplay] = useState<string>("none")
  const [ResultRoll, setResultRoll] = useState("0");
  const [WinLooseMsg, setWinLooseMsg] = useState("")
  const [PlayerRoll, setPlayerRoll] = useState("0")



    const { walletBalance } = useSelector((state: any) => state.wallet);
    

  const SetMinBetAmount = async () => {
    const MinBet = await MinBetAmount();
    setBetAmount(convertToEther(MinBet));   
  };
  const SetMaxBetAmount = async () => {
    const MaxBet = await MaxBetAmount();
    setBetAmount(convertToEther(MaxBet));   
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
      setBetAmount(Number(e.target.value));
        } 
     
  }
  
  

  const CallingPlaceBet = async () => {
    if (BetplacedLoading) {
      return;
    } else {
      const myAddress: any = localStorage.getItem("address");
      const RollUnder: any = RangeValue + 1
      const BetId = await PlaceBet(JSON.parse(myAddress), BetAmount, RollUnder);
      setPlacingBetId(BetId.events.LogBet.returnValues.BetID);
    }
  };

  console.log(PlacingBetId);

  const ProfitCalculator = async () => {
    const Houseedgeamount = parseInt(await HouseEdge());
    const Houseedgediviseramount = parseInt(await HouseEdgeDiviser());

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
  const AccountAddress: any = localStorage.getItem("address");

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

  const ButtonText = () => {
     if (BetplacedLoading) {
      return "Loading Result..."
    } else {
      return "Roll Dice"
    }

  }

  const PlaceBet = async (
  myAccount: string | null,
  Amount: any,
  Rollunder: number
) => {
  //create instance of an abi to call any blockChain function
  const Ethervalue = web3.utils.toWei(Amount.toString(), "ether");

  const lpInstance = await selectInstances(
    instanceType.BETTING, // type of instance
    BETTING_ADDRESS //contract address
  );
    if (true) {
    const RollDice = await lpInstance.methods.playerRollDice(Rollunder).send({
      from: myAccount,
      value: Ethervalue,
    }).once('confirmation',
      function (receipt: any) {
                          setBetplacedLoading(true);
                          
                  
                        });
      return RollDice;
  }
  };

  console.log(ResultObject);



  useEffect(() => {
    if (PlacingBetId === undefined) {
      return;
    }
    else if (PlacingBetId === ResultObject?.Betid) {
      console.log("result is ours")
      console.log(typeof PlacingBetId, typeof ResultObject?.Betid)
      if (ResultObject?.Status === '0') {
        setResultRoll(ResultObject?.Diceresult);
        setWinLooseMsg("You Lost The Bet,Better Luck Next Time");
        setPlayerRoll(ResultObject?.Playernumber);
        setResultPopupDisplay("flex");

        
      }else if (ResultObject?.Status === '1') {
        setResultRoll(ResultObject?.Diceresult);
        setWinLooseMsg("Hurray,You Won The Bet");
        setPlayerRoll(ResultObject?.Playernumber);
        setResultPopupDisplay("flex");

        
      } else {
        console.log('unhandled result')
      }
    } else {
      console.log("not our result")
      console.log(ResultObject?.Betid)
    }
    

    
  }, [ResultObject])

  

  
  useEffect(() => {
        const socket = io('wss://diceroll.rapidinnovation.tech');
        try {
            socket.on('connection', () => {
                // Replace event name with connection event name
                console.log('websocket connected');
            });
          socket.on('betting', (data) => {
            
            setResultObject({
              Betid: data.BetID,
              Diceresult: data.DiceResult,
              Playeraddress: data.PlayerAddress,
              Playernumber: data.PlayerNumber,
              Status: data.Status,
              Value: data.Value

            })
            
              
            });
        } catch (err) {
            console.log('err', err);

        }
        
  }, []);

  const ResultPopupCloser = () => {
    setBetplacedLoading(false);
    setResultPopupDisplay('none');

  }
  

  useEffect(() => {
    ProfitCalculator();
    CheckAllowanceStatus();
  });

  return (
    <BetBox>
      <BetMiddle>
        <FlexColumn>
          <H2 MarginBottom = '16px'>
            BET AMOUNT | AVL BL: {walletBalance ? walletBalance : 0} PLS
          </H2>
          <Flex MarginBottom="16px">
            <Chance
              value={BetAmount}
              onChange={(e) => BetSetThroughInput(e) }
            />
            <Flex Width="75%">
              <TransChance onClick={SetMinBetAmount}> MIN</TransChance>
              <TransChance onClick={() => setBetAmount(5)}>5</TransChance>
              <TransChance onClick={() => setBetAmount(6)}>6</TransChance>
              <TransChance onClick={() => setBetAmount(10)}>10</TransChance>

              <TransChance onClick={SetMaxBetAmount}>MAX</TransChance>
            </Flex>
          </Flex>
        </FlexColumn>
        <FlexColumn>
          <H2 FontSize="16px">CHANCE OF WINNING</H2>
          <Flex>
            <FlexColumn style={{ width: "30%" }}>
              <PercentChance MarginBottom="12px">
                {RangeValue}%
              </PercentChance>
              <H2 FontSize="14px">Min Chance</H2>
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
          <H2 >ROLL UNDER </H2>
          <H1 FontSize="16px">
            {RangeValue + 1}
          </H1>
        </Flex>
        <Flex>
          <H2>Profit </H2>
          <H1 FontSize="16px">+{Profit} PLS</H1>
        </Flex>
      </BetMiddle>
          <BetBottom>
        {UserAllowance ? (
          <RollDice onClick={CallingPlaceBet}>{ButtonText()}</RollDice>
              ) : (
          <RollDice onClick={HandleAllowance}>Approve</RollDice>
        )}
      </BetBottom>
      <BetResultPopup style={{ display: `${ResultPopupDisplay}` }}>
        <Crossimg onClick={ResultPopupCloser}  src={Cross} alt="" />
        <H1 style={{fontSize:'20px',color:'white'}}>Your Roll</H1>
        <H2 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>{AccountAddress}</H2>
        <PercentChance style={{width:'150px',height:'80px',fontSize:'40px',marginBottom:'31px',color:'#00EAFF',border: '0.558333px solid #F5B849',backgroundColor:'transparent',borderRadius:'8px'}}>
         {ResultRoll}
        </PercentChance>
        <H1 style={{fontSize:'20px',color:'white'}}>{WinLooseMsg}</H1>
        <H2 style={{fontSize:'18px',color:'#00EAFF'}}>Player NO. {PlayerRoll}</H2>
        
      </BetResultPopup>
    </BetBox>
  );
};

export default Betting;
