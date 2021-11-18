import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Crossimg,
  BetResult
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
import { setWalletBalance } from "logic/action/wallet.action";
import CustomModal from "shared/custom-modal";
import { PrimaryButton } from "shared/button/Button";
import { colors } from "shared/styles/theme";
import { floatNumRegex } from "shared/helpers/regrexConstants";


const Betting = () => {

  const [RangeValue, setRangeValue] = useState<number>(1);
  const [BetAmount, setBetAmount] = useState<any>("");
  const [Profit, setProfit] = useState<number>(0);
  const [UserAllowance, setUserAllowance] = useState(false);
  const [BetplacedLoading, setBetplacedLoading] = useState(false);
  const [PlacingBetId, setPlacingBetId] = useState();
  const [ResultObject, setResultObject] = useState<any>()
  const [ResultPopupDisplay, setResultPopupDisplay] = useState<string>("none")
  const [showResultModal, setShowResultModal] = useState(false)
  const [ResultRoll, setResultRoll] = useState("0");
  const [WinLooseMsg, setWinLooseMsg] = useState("")
  const [win, setwin] = useState(false)
  const [PlayerRoll, setPlayerRoll] = useState("0")
  const [OnLoadMin, setOnLoadMin] = useState<any>();
  const [OnLoadMax, setOnLoadMax] = useState<any>();
  const [BetRightOrNotAlert, setBetRightOrNotAlert] = useState(false);
  const [PlacingBet, setPlacingBet] = useState(false);



  window.onbeforeunload = function () {
    if (PlacingBet) {
      return "Leaving this page will reset the wizard";
    }

  };

  const { walletBalance, userAddress } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch()

  const SetMinBetAmount = async () => {
    const MinBet = await MinBetAmount();
    setBetAmount(convertToEther(MinBet));
  };
  const SetMaxBetAmount = async () => {
    const MaxBet = await MaxBetAmount();
    setBetAmount(convertToEther(MaxBet));
  };

  const OnLoadMinBet = async () => {
    const MinBet = convertToEther(await MinBetAmount());
    setOnLoadMin(MinBet);
    console.log(MinBet);
  }
  const OnLoadMaxBet = async () => {
    const MaxBet = convertToEther(await MaxBetAmount());
    setOnLoadMax(MaxBet);
    console.log(MaxBet);
  }



  useEffect(() => {
    if (BetAmount === 0 || BetAmount === "") {
      setBetRightOrNotAlert(false);
    }
    else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) {
      setBetRightOrNotAlert(true);
    } else {
      setBetRightOrNotAlert(false);
    }
  })

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
    const { value } = e.target
    if (value < 20 && floatNumRegex.test(value.toString())) {
      setBetAmount(e.target.value);
    }
    else
      setBetAmount("");
  }

  const OutFocusSetBetamount = () => {
    //@ts-ignore
    if (BetAmount === "") {
      setBetAmount(0)
      console.log("set 0")
    }
  }


  const CallingPlaceBet = async () => {
    if (localStorage.getItem("Loading") === 'true') {
      return;
    } else if (PlacingBet) {
      return;

    } else if (BetAmount === 0) {
      window.alert("BetAmount cannot be 0");
      return;
    } else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) {
      alert("AMOUNT NOT UNDER MINIMUM AND MAXIMUM BETAMOUNT ALLOWED")
    } else {
      if (userAddress) {
        const RollUnder: any = RangeValue + 1
        const BetId = await PlaceBet(userAddress, BetAmount, RollUnder);
        console.log(BetId);
        setPlacingBetId(BetId?.events.LogBet.returnValues.BetID);
        localStorage.setItem('PlacingBetId', BetId?.events.LogBet.returnValues.BetID);


      }
    }
  };


  const ProfitCalculator = async () => {
    const Houseedgeamount = parseInt(await HouseEdge());
    const Houseedgediviseramount = parseInt(await HouseEdgeDiviser());

    const MultipliedBetAmount = BetAmount * 1e18;
    const ProfitInWei =
      ((((((MultipliedBetAmount * (100 - RangeValue)) / RangeValue + MultipliedBetAmount)) * Houseedgeamount) / Houseedgediviseramount) - MultipliedBetAmount);

    const FinalProfit = ProfitInWei / 1e18;
    // const finP = new BigNumber(FinalProfit, 18)

    setProfit(FinalProfit)

  };


  const CheckAllowanceStatus = async () => {
    if (userAddress) {
      const CheckAllowanceResult = await CheckAllowance(
        userAddress,
        BETTING_ADDRESS
      );
      if (CheckAllowanceResult > 1 || CheckAllowanceResult === 1) {
        setUserAllowance(true);
      } else {
        setUserAllowance(false);
      }
    }

  };
  // const AccountAddress: any = localStorage.getItem("address");

  const HandleAllowance = async () => {
    if (userAddress) {
      //create instance of an abi to call any blockChain function
      const lpInstance = await selectInstances(
        instanceType.ERC20TOKEN, // type of instance
        ROUTER_ADDRESS //contract address
      );

      if (true) {
        const approvalAmount = ethers.constants.MaxUint256 //  Infinite number
        await lpInstance.methods
          .approve(BETTING_ADDRESS, approvalAmount)
          .send({
            from: userAddress
          })
          .once('confirmation', function (receipt: any) {
            setUserAllowance(true)
          });

      }
    } else {
      alert("Connect wallet to place bet")
    }
  };

  const ButtonText = () => {
    if (localStorage.getItem("Loading") === 'true') {
      return "Loading Result..."
    } else if (PlacingBet) {
      return "Placing Bet.."

    } else {
      return "Roll Dice"
    }

  }

  const SliderFollower = () => {
    if (RangeValue > 90) {
      return RangeValue - 10;

    } else {
      return RangeValue;

    }
  }

  const PlaceBet = async (
    myAccount: string | null,
    Amount: any,
    Rollunder: number
  ) => {
    //create instance of an abi to call any blockChain function
    const Ethervalue = web3.utils.toWei(Amount.toString(), "ether");
    // const Ethervalue = convertToEther(Amount);

    const lpInstance = await selectInstances(
      instanceType.BETTING, // type of instance
      BETTING_ADDRESS //contract address
    );
    if (true) {
      try {
        setPlacingBet(true);
        const RollDice = await lpInstance.methods.playerRollDice(Rollunder).send({
          from: myAccount,
          value: Ethervalue,
        }).once('confirmation',
          function (receipt: any) {
            setPlacingBet(false);
            setBetplacedLoading(true);
            localStorage.setItem("Loading", 'true');
            window.location.reload();



          });
        console.log(RollDice);
        return RollDice;




      } catch (error: any) {
        if (error.code === 4001) {
          setPlacingBet(false);
        } else {
          localStorage.setItem("Loading", 'false');
        }
      }
    }
  };



  useEffect(() => {
    const LocalBetIt = localStorage.getItem("PlacingBetId");
    console.log(LocalBetIt);
    
    if (userAddress.toUpperCase() === ResultObject?.Playeraddress.toUpperCase()) {
      if (ResultObject?.Status === '0') {
        setResultRoll(ResultObject?.Diceresult);
        setWinLooseMsg("You Lost The Bet,Better Luck Next Time");
        setwin(false)
        setPlayerRoll(ResultObject?.Playernumber);
        setResultPopupDisplay("flex");
        setShowResultModal(true);
        localStorage.setItem('Loading', 'false');

      } else if (ResultObject?.Status === '1') {
        setResultRoll(ResultObject?.Diceresult);
        setWinLooseMsg("Hurray,You Won The Bet");
        setwin(true)

        setPlayerRoll(ResultObject?.Playernumber);
        setResultPopupDisplay("flex");
        setShowResultModal(true);
        localStorage.setItem('Loading', 'false');



      } else {
        console.log('unhandled result')
      }
    } else {
      console.log("not our result")
      console.log(ResultObject?.Playeraddress.toUpperCase())
      console.log(userAddress.toUpperCase());
    }
  }, [ResultObject])


  useEffect(() => {
    const getWalletBalance = async () => {
      try {
        if (userAddress) {
          const balance = await web3.eth.getBalance(userAddress);
          dispatch(setWalletBalance(convertToEther(balance)));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getWalletBalance()
  }, [userAddress, showResultModal])


  useEffect(() => {
    const socket = io('wss://diceroll.rapidinnovation.tech');
    try {
      socket.on('connection', () => {
        // Replace event name with connection event name
        console.log('websocket connected');
      });
      socket.on('betting', (data) => {


        console.log(data);
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
    setPlacingBet(false);
    localStorage.setItem("Loading", 'false');
    setResultPopupDisplay('none');
    setShowResultModal(false);
    setwin(false)
  }


  useEffect(() => {
    ProfitCalculator();
    CheckAllowanceStatus();

  });

  useEffect(() => {

    OnLoadMaxBet();
    OnLoadMinBet();

  }, [BetAmount]);

  useEffect(() => {
    setTimeout(() => {
      OnLoadMaxBet();
      OnLoadMinBet();
      console.log("ran")

    }, 5000);
  }, [ResultObject])



  return (
    <BetBox>
      <BetMiddle>
        <FlexColumn>
          <H2 MarginBottom='16px'>
            BET AMOUNT | AVL BL  :  {walletBalance ? walletBalance : 0} PLS
          </H2>
          <Flex>
            <Chance
              value={BetAmount}
              onChange={BetSetThroughInput}
              onBlur={OutFocusSetBetamount}
              placeholder="0"
            />
            <Flex Width="75%">
              <TransChance onClick={SetMinBetAmount}> MIN</TransChance>
              <TransChance onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 6).toFixed(4))}>
                {
                  OnLoadMin && OnLoadMax ? (((Number(OnLoadMin) + Number(OnLoadMax)) / 6).toFixed(4)) : "-"
                }
              </TransChance>
              <TransChance onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 4).toFixed(4))}>
                {
                  OnLoadMin && OnLoadMax ? (((Number(OnLoadMin) + Number(OnLoadMax)) / 4).toFixed(4)) : "-"
                }
              </TransChance>
              <TransChance onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 2).toFixed(4))}>
                {
                  OnLoadMin && OnLoadMax ? (((Number(OnLoadMin) + Number(OnLoadMax)) / 2).toFixed(4)) : "-"
                }
              </TransChance>

              <TransChance onClick={SetMaxBetAmount}>MAX</TransChance>
            </Flex>
          </Flex>
        </FlexColumn>
        {BetRightOrNotAlert ?
          <H2 style={{ color: 'red', padding: '0', margin: '0', fontSize: '12px' }}>Bet Amount Not Between The Minimum And Maximum Allowed</H2> : <H2 style={{ zIndex: '-2', padding: '0', margin: '0', fontSize: '12px' }}>zzz</H2>}
        <FlexColumn>
          <H2 FontSize="16px">CHANCE OF WINNING</H2>
          <Flex>
            <FlexColumn style={{ width: "30%" }}>
              <PercentChance MarginBottom="12px">
                {RangeValue}%
              </PercentChance>
              <H2 FontSize="14px" style={{ fontWeight: '600' }}>Min Chance</H2>
            </FlexColumn>
            <Flex
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                alignSelf: "flex-start",
                marginTop: "20px",

                position: "relative"
              }}
            >
              <Range
                type="range"
                value={RangeValue}
                onChange={RangeValueChanger}
              ></Range>
              <div style={{
                position: "absolute",
                textAlign: "center",
                width: "120px",
                background: "#533964",
                bottom: "-100px",
                left: `${SliderFollower()}%`,
                transform: 'translate(-50%,-50%)',
                padding: "10px",
                boxShadow: "inset 0px -3px 11px #00eaff",
                clipPath: "polygon(60% 15%, 100% 15%, 100% 100%, 0 100%, 0 15%, 40% 15%, 50% 0)",
              }}>
                Roll under <span style={{ color: colors.primary }}>{RangeValue + 1}</span> to get profit
                of <span style={{ color: colors.primary }}>+{Profit.toFixed(8)} PLS</span>
              </div>
            </Flex>
          </Flex>
        </FlexColumn>
        <Flex style={{ marginTop: "10px" }}>
          <H2 style={{ fontSize: '18px' }} >Roll Under </H2>
          <H1 FontSize="18px">
            {RangeValue + 1}
          </H1>
        </Flex>
        <Flex>
          <H2 style={{ fontSize: '18px' }}>Profit </H2>
          <H1 FontSize="18px">+{(Profit)} PLS</H1>
        </Flex>
      </BetMiddle>
      <BetBottom>
        {UserAllowance ? (
          <PrimaryButton

            onClick={() => CallingPlaceBet()}>{ButtonText()}</PrimaryButton>
        ) : (
          <PrimaryButton onClick={HandleAllowance}>Approve</PrimaryButton>
        )}
      </BetBottom>
      {/* <BetResultPopup style={{ display: `${ResultPopupDisplay}` }}>
        <Crossimg onClick={ResultPopupCloser} src={Cross} alt="" />
        <H1 style={{ fontSize: '20px', color: 'white' }}>Your Roll</H1>
        <H2 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>{userAddress}</H2>
        <PercentChance style={{ width: '150px', height: '80px', fontSize: '40px', marginBottom: '31px', color: '#00EAFF', border: '0.558333px solid #F5B849', backgroundColor: 'transparent', borderRadius: '8px' }}>
          {ResultRoll}
        </PercentChance>
        <H1 style={{ fontSize: '20px', color: 'white' }}>{WinLooseMsg}</H1>
        <H2 style={{ fontSize: '18px', color: '#00EAFF' }}>Roll Under. {PlayerRoll}</H2>
      </BetResultPopup>

 */}


      <CustomModal
        // show={true}
        show={showResultModal}
        toggleModal={() => ResultPopupCloser()}
        heading="Your Roll"
      >
        <BetResult>
          <H2
            color={colors.white}
          >{userAddress}</H2>
          <PercentChance
            fontSize='40px'
            width="150px"
            MarginBottom="30px"
          >
            {ResultRoll}
          </PercentChance>
          <H1
            color={win ? colors.green : colors.red}
          >{WinLooseMsg}</H1>
          <H2>Roll Under. {PlayerRoll}</H2>
        </BetResult>
      </CustomModal>
    </BetBox>
  );
};

export default Betting;
