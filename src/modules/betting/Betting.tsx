import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import web3 from "../../utils/web3";
import "./Checkbox.css";
import Disclaimer from "shared/Disclaimer/Disclaimer";
import {
  BetBox,
  BetMiddle,
  BetBottom,
  H2,
  FlexColumn,
  Flex,
  H1,
  Chance,
  Range,
  TransChance,
  OddEvenDiv,
  SliderThumb,
  Select,
  Option,
  P,
  ToolTipCont,
  HowToPlay,
} from "./style";
import { MinBetAmount, MaxBetAmount, HouseEdge, HouseEdgeDiviser } from "../blockChain/bettingMethods";
import { convertToEther, convertToWei } from "../../utils/helper";
import { CheckAllowance } from "../blockChain/Routermethods";
import { BETTING_ADDRESS } from "../../config";
import { instanceType, selectReadContractInstance, selectWriteContractInstance } from "../../utils/contracts";
import { LINK_TOKEN_ADDRESS } from "../../config";
import { setWalletBalance } from "logic/action/wallet.action";
import { PrimaryButton } from "shared/button/Button";
import { colors } from "shared/styles/theme";
import { floatNumRegex } from "shared/helpers/regrexConstants";
import WaitingModal from "./modals/WaitingModal";
import WinModal from "./modals/WinModal";
import LooseModal from "./modals/LooseModal";
import Alertmsg from "./modals/Alertmsg";
import HelpIcon from "assets/icons/helpIcon.svg";
import howtoplay from "../../assets/icons/HowToPlay.svg";
import CustomModal from "shared/custom-modal";
import { CheckCont } from "shared/Disclaimer/style";
import RangeSlider from "shared/range-slider/RangeSlider";
import DisableModal from "shared/DisableModal/Disable";
import { heart, rangeSliderSound, rollingDiceSound } from "./Sound";

import betLooseSound from "../../assets/sound/heartbeat.mp3";

import useSound from "use-sound";
import { SocketContext } from "modules/app/context/socket";

const Betting = () => {
  const [RangeValue, setRangeValue] = useState<number>(98);
  const [BetAmount, setBetAmount] = useState<any>("");
  const [Profit, setProfit] = useState<number>(0);
  const [UserAllowance, setUserAllowance] = useState(false);
  const [BetplacedLoading, setBetplacedLoading] = useState(false);
  const [PlacingBetId, setPlacingBetId] = useState();
  const [ResultObject, setResultObject] = useState<any>();
  const [ResultPopupDisplay, setResultPopupDisplay] = useState<string>("none");
  const [showResultModal, setShowResultModal] = useState(false);
  const [ResultRoll, setResultRoll] = useState("0");
  const [WinLooseMsg, setWinLooseMsg] = useState("");
  const [win, setwin] = useState(false);
  const [PlayerRoll, setPlayerRoll] = useState("0");
  const [OnLoadMin, setOnLoadMin] = useState<any>();
  const [OnLoadMax, setOnLoadMax] = useState<any>();
  const [BetRightOrNotAlert, setBetRightOrNotAlert] = useState(false);
  const [PlacingBet, setPlacingBet] = useState(false);
  const [soundFlag, setSoundFlag] = useState(0);
  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertText, setAlertText] = useState("");

  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [evenOdd, setEvenOdd] = useState(0);
  const [rangeLow, setRangeLow] = useState(0);
  const [rangeHigh, setRangeHigh] = useState(0);
  const [showToolTip1, setShowToolTip1] = useState(false);
  const [showToolTip2, setShowToolTip2] = useState(false);
  const [evenOddProfit, setEvenOddProfit] = useState(0);
  const [rangeProfit, setRangeProfit] = useState(0);
  const [Numbers, setNumbers] = useState([]);
  const [showHowToPlay, setshowHowToPlay] = useState(false);
  const [showDisclaimer, setshowDisclaimer] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [Disable, setDisable] = useState<boolean>(false);
  const [rollDiceDisableOrNot, setrollDiceDisableOrNot] = useState<Boolean>(false);
  const [multiplier, setMultiplier] = useState(0);

  const [play] = useSound(heart, { interrupt: true });


  useEffect(() => {
    play();
  }, [RangeValue])

  const { walletBalance, userAddress } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    for (let index = 0; index <= 100; index++) {
      //@ts-ignore
      // setNumbers((prev: any) => [...prev, `${index}-${index + 10}`]);
      setNumbers((prev: any) => [...prev, index]);
    }
    if (localStorage.getItem("Loading") === "true") {
      setLoader(true);
    }
  }, []);

  //@ts-ignore
  useEffect(() => {
    const localChecked = localStorage.getItem("ShowDisclaimer");
    const Loading = localStorage.getItem("Loading");
    if (Loading === "true") {
      setshowDisclaimer(false);
    } else if (localChecked === null || localChecked === "false") {
      setshowDisclaimer(true);
    } else {
      setshowDisclaimer(false);
    }
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      let Address: any;
      let accounts = await web3.eth.getAccounts();
      Address = accounts[0];
    };

    getBalance();

    const connect = () => {
      try {
        socket.on("connection", () => {
          // Replace event name with connection event name
          console.log("websocket connected");
        });
        socket.on("betevent", (data: any) => {
          console.log(data);
          const LocalBetId = localStorage.getItem("PlacingBetId");
          let betId;
          if (PlacingBetId) betId = PlacingBetId;
          else betId = LocalBetId;
          if (betId === data.BetID) {
            console.log("ResultObjectupdated");
            setResultObject({
              Betid: data.BetID,
              Diceresult: data.DiceResult,
              Playeraddress: data.PlayerAddress,
              Playernumber: data.PlayerNumber,
              Status: data.Status,
              Date: new Date().toLocaleString(),
              Value: data.Value,
              BetAmount: localStorage.getItem("BetAmount"),
            });
          } else {
            console.log(data.BetID);
          }
        });
      } catch (err) {
        console.log("err", err);
      }
    };

    connect();
  }, [PlacingBetId]);

  window.onbeforeunload = function () {
    if (PlacingBet) return "Leaving this page will reset the wizard";
  };

  //#region Bet Amount
  const [playBetSound] = useSound(betLooseSound);

  const SetMinBetAmount = async () => {
    setBetAmount(((10 / 100) * Number(OnLoadMax)).toFixed(8));

    // playBetSound();
  };
  const SetMaxBetAmount = async () => {
    setBetAmount(OnLoadMax);
  };

  useEffect(() => {
    if (BetAmount === 0 || BetAmount === "") setBetRightOrNotAlert(false);
    else if (Number(BetAmount) < Number(OnLoadMin) || Number(BetAmount) > Number(OnLoadMax))
      setBetRightOrNotAlert(true);
    else setBetRightOrNotAlert(false);
  }, [BetAmount]);

  const RangeValueChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const RangePercent = parseInt(e.currentTarget.value);
    if (RangePercent > 98) setRangeValue(98);
    else if (RangePercent < 1) setRangeValue(1);
    else setRangeValue(RangePercent);

    // let speed = (Number(RangePercent) / 50)
    let speed = 50 / Number(RangePercent);
    // play();

    // rangeSliderSound(speed.toFixed(2), true, soundFlag, setSoundFlag);
  };


  const BetSetThroughInput = (e: any) => {
    const { value } = e.target;
    console.log("value", value);

    if (floatNumRegex.test(value.toString())) {
      setBetAmount(value);
    }
    if (!value) setBetAmount("");
  };

  // const OutFocusSetBetamount = () => {
  //   if (BetAmount === "") {
  //     setBetAmount(0);
  //     console.log("set 0");
  //   }
  // };

  const CallingPlaceBet = async () => {
    if (localStorage.getItem("Loading") === "true") {
      return;
    } else if (PlacingBet) {
      return;
    } else if (localStorage.getItem("Agree") !== "true") {
      setshowDisclaimer(true);
    } else if (BetAmount === 0) {
      setAlertText("BET AMOUNT CANNOT BE 0");
      setAlertModalState(true);
      return;
    } else if (Number(BetAmount) < Number(OnLoadMin) || Number(BetAmount) > Number(OnLoadMax)) {
      let text = `Bet amount should be between ${OnLoadMin} and ${OnLoadMax} `
      setAlertText(text);
      setAlertModalState(true);
    } else {
      if (userAddress) {
        const RollUnder: any = RangeValue + 1;
        const BetId = await PlaceBet(userAddress, BetAmount, RollUnder, evenOdd);
        console.log(BetId);
        setPlacingBetId(BetId?.events.LogBet.returnValues.BetID);
        localStorage.setItem("PlacingBetId", BetId?.events.LogBet.returnValues.BetID);
      }
    }
  };

  useEffect(() => {
    const CheckAllowanceStatus = async () => {
      if (userAddress) {
        const CheckAllowanceResult = await CheckAllowance(userAddress, BETTING_ADDRESS);
        if (CheckAllowanceResult >= 1) setUserAllowance(true);
        else setUserAllowance(false);
      }
    };
    CheckAllowanceStatus();
  }, [userAddress]);
  //#endregion

  //#region Handle
  const HandleAllowance = async () => {
    setDisableButton(true);
    try {
      if (userAddress) {
        //create instance of an abi to call any blockChain function
        const lpInstance = await selectWriteContractInstance(
          instanceType.ERC20TOKEN, // type of instance
          LINK_TOKEN_ADDRESS //contract address
        );

        const approvalAmount = ethers.constants.MaxUint256; //  Infinite number
        await lpInstance.methods
          .approve(BETTING_ADDRESS, approvalAmount)
          .send({
            from: userAddress,
          })
          .once("confirmation", function (receipt: any) {
            setUserAllowance(true);
            setDisableButton(false);
          });
      } else {
        setAlertText("Connect Wallet To Place Bet");
        setAlertModalState(true);
        setDisableButton(false);
      }
    } catch (error) {
      setDisableButton(false);
    }
  };

  const ButtonText = () => {
    if (localStorage.getItem("Loading") === "true") {
      return "Loading Result...";
    } else if (PlacingBet) {
      return "Placing Bet..";
    } else {
      return "Roll Dice";
    }
  };

  const HeartBeatSpeed = () => {
    if (loader || success) return "20s";
    else return `${RangeValue / 25}s`;
  };

  const toggleModal = () => {
    setLoader(false);
    setSuccess(false);
    setError(false);
    setAlertModalState(false);
    setBetAmount("");
    // setRangeValue(1);
    // window.location.reload();
  };
  //#endregion

  const PlaceBet = async (myAccount: string | null, Amount: any, Rollunder: number, evenOdd: number) => {
    const Ethervalue = convertToWei(Number(Amount).toFixed(8).toString());

    const lpInstance = await selectWriteContractInstance(
      instanceType.BETTING, // type of instance
      BETTING_ADDRESS //contract address
    );
    try {
      setPlacingBet(true);
      const RollDice = await lpInstance.methods
        .playerRollDice(Rollunder, evenOdd, rangeLow, rangeHigh)
        .send({
          from: myAccount,
          value: Ethervalue,
        })
        .once("transactionHash", function (res: any) {
          setLoader(true);
        })
        .once("confirmation", function (receipt: any) {
          setPlacingBet(false);
          setBetplacedLoading(true);
          localStorage.setItem("Loading", "true");
          localStorage.setItem("BetAmount", BetAmount);
          // window.location.reload();
        });
      console.log(RollDice);
      return RollDice;
    } catch (error: any) {
      console.log("errr", error);
      if (error.code === 4001) {
        setPlacingBet(false);
      } else {
        localStorage.setItem("Loading", "false");
        setPlacingBet(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const LocalBetIt = localStorage.getItem("PlacingBetId");
    console.log("result recieved");

    if (userAddress && LocalBetIt === ResultObject?.Betid) {
      if (ResultObject?.Status === "0") {
        setResultRoll(ResultObject?.Diceresult);
        setWinLooseMsg("You Lost The Bet,Better Luck Next Time");
        setwin(false);
        setLoader(false);
        setSuccess(true);
        setPlayerRoll(ResultObject?.Playernumber);
        setResultPopupDisplay("flex");
        setShowResultModal(true);
        localStorage.setItem("Loading", "false");
        localStorage.setItem("BetAmount", "0");
        // setBetAmount(0);
        StoringLastRolls();
        localStorage.setItem("BetAmount", "0");
      } else if (ResultObject?.Status === "1") {
        setResultRoll(ResultObject?.Diceresult);
        setWinLooseMsg("Hurray,You Won The Bet");
        setwin(true);
        setLoader(false);
        setSuccess(true);
        setPlayerRoll(ResultObject?.Playernumber);
        setResultPopupDisplay("flex");
        setShowResultModal(true);
        localStorage.setItem("Loading", "false");
        // setBetAmount(0);
        StoringLastRolls();
        localStorage.setItem("BetAmount", "0");
      } else {
        console.log("unhandled result");
      }
    } else {
      console.log(ResultObject?.Betid, LocalBetIt);
    }
  }, [ResultObject]);

  const StoringLastRolls = () => {
    const AllValue = JSON.parse(localStorage.getItem("LastRolls") || "[]");
    const FirstValue = AllValue[0];
    if (FirstValue != undefined) {
      if (FirstValue.Betid == ResultObject.Betid) {
        return;
      } else {
        console.log(FirstValue.Betid == ResultObject.Betid);
      }
    }
    console.log("storingcalled");
    if (localStorage.getItem("LastRolls") === null) {
      localStorage.setItem("LastRolls", JSON.stringify([ResultObject]));
      console.log("not exist ran");
    } else {
      console.log("exist ran");
      const Resulttillnow = JSON.parse(localStorage.getItem("LastRolls") || "[]");
      if (Resulttillnow.length === 10) {
        Resulttillnow.splice(-1);
        // console.log(Resulttillnow);
        localStorage.setItem("LastRolls", JSON.stringify(Resulttillnow));
      }
      const PreviousResults = JSON.parse(localStorage.getItem("LastRolls") || "[]");
      PreviousResults.unshift(ResultObject);
      localStorage.setItem("LastRolls", JSON.stringify(PreviousResults));
    }
  };

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
    };
    getWalletBalance();
  }, [userAddress, showResultModal]);

  const handleCheckChange = (value: any, checkNum: Number) => {
    if (checkNum === 1 && !checked1) {
      setChecked1(!checked1);
      setChecked2(false);
      setEvenOdd(1);
    } else if (checkNum === 2 && !checked2) {
      setChecked2(!checked2);
      setChecked1(false);
      setEvenOdd(2);
    } else if (checked1) {
      setChecked1(!checked1);
      setEvenOdd(0);
    } else if (checked2) {
      setChecked2(!checked2);
      setEvenOdd(0);
    } else setEvenOdd(0);
  };

  useEffect(() => {
    // if (evenOdd !== 0) setEvenOddProfit(2);
    // else setEvenOddProfit(0);

    // if (evenOdd === 0)
    //   setEvenOddProfit(0);
    console.log("RangeCheckRan");
    //@ts-ignore
    const numberRangeLow = parseInt(rangeLow);
    //@ts-ignore
    const numberRangeHigh = parseInt(rangeHigh);
    if (numberRangeLow === numberRangeHigh && numberRangeLow !== 0) {
      setrollDiceDisableOrNot(true);
    } else if (numberRangeLow > numberRangeHigh) {
      setrollDiceDisableOrNot(true);
    } else if (numberRangeLow === 0 && numberRangeHigh > numberRangeLow) {
      setrollDiceDisableOrNot(true);
      console.log(numberRangeLow, numberRangeHigh);
    } else {
      setrollDiceDisableOrNot(false);
      console.log(numberRangeLow, numberRangeHigh);
    }
  }, [rangeLow, rangeHigh]);

  const handleSelectValue1 = (e: any) => {
    const value = e.target.value;
    setRangeLow(value);
  };
  const handleSelectValue2 = (e: any) => {
    const value = e.target.value;
    setRangeHigh(value);
  };

  // new approcah for betting -start

  const Multiplier = async (
    RangeValue: number,
    isRangeTrue: boolean,
    _OddEvenStatus: number,
    rangeLow: number,
    rangeHigh: number
  ) => {
    const rollUnder: number = RangeValue + 1;
    // const totalChances: number = 99;

    // let multiplier: number = totalChances / RangeValue;
    // if (_OddEvenStatus == 0) {
    //   multiplier = multiplier;
    //   setEvenOddProfit(0);

    // } else if (_OddEvenStatus == 1 || _OddEvenStatus == 2) {

    //   let oddEvenMultiplier = rollUnder / (rollUnder / 2)
    //   setEvenOddProfit(oddEvenMultiplier)
    //   multiplier = multiplier + oddEvenMultiplier; //The multiplier has fixed as 2
    // }
    // if (isRangeTrue === true) {
    //   let range = rangeHigh - rangeLow; //3-1
    //   let totalChances = (100 - range) / 2;

    //   if (Number(rangeLow) < Number(rangeHigh))
    //     setRangeProfit(totalChances)
    //   else
    //     setRangeProfit(0)

    //   // let totalChances = range / 2;
    //   // multiplier +=totalChances/range;//2/98
    //   multiplier += totalChances;
    // }

    // return multiplier;

    const BETTING_INSTANCE = await selectReadContractInstance(instanceType.BETTING);
    // console.log('logs', rollUnder, _OddEvenStatus, isRangeTrue, rangeLow, rangeHigh);

    const multiplier = await BETTING_INSTANCE.methods
      .GetMultiplier(rollUnder, _OddEvenStatus, isRangeTrue, rangeLow, rangeHigh)
      .call();

    return convertToEther(multiplier);
  };

  const CutHouseEdge = async (payout: number) => {
    const HouseEdgeAmount: number = await HouseEdge();
    const HouseEdgeDivisor: number = await HouseEdgeDiviser();

    if (HouseEdgeAmount || HouseEdgeDivisor) {
      const finalPayout = payout * (HouseEdgeAmount / HouseEdgeDivisor); //get this things from the contract
      // const finalPayout = payout * (900 / 1000)//get this things from the contract
      return finalPayout;
    }
  };
  const setMaxBet = async (multiplier: any) => {
    const HOUSEPOOL_INSTANCE = await selectReadContractInstance(instanceType.HOUSEPOOL);
    const maxProfit = await HOUSEPOOL_INSTANCE.methods.maxProfit().call();

    if (maxProfit) {
      const maxBet = convertToEther(maxProfit) / multiplier;
      setOnLoadMax(maxBet.toFixed(8));
      setOnLoadMin(((10 / 100) * Number(maxBet)).toFixed(8));
      return maxBet;
    }
  };

  useEffect(() => {
    const getMultiplier = async () => {
      const multiplier = await Multiplier(
        RangeValue,
        rangeLow >= 0 && rangeHigh > 0,
        evenOdd,
        rangeLow,
        rangeHigh
      );
      setMultiplier(multiplier);
    };
    getMultiplier();

    setMaxBet(multiplier);

    calcTempPlayerProfit(RangeValue, evenOdd, BetAmount, rangeLow, rangeHigh);
  }, [RangeValue, BetAmount, userAddress, evenOdd, rangeLow, rangeHigh, multiplier]);

  const calcTempPlayerProfit = async (
    rangeValue: any,
    _OddEvenStatus: any,
    betValue: number,
    rangeLow: any,
    rangeHigh: any
  ) => {
    const rollUnder: number = rangeValue + 1;
    try {
      // const returnedAmount: number = betValue * multiplier;

      // const House: any = await CutHouseEdge(returnedAmount);
      // const profit: number = House - betValue;

      // const finalProfit = convertToWei(profit.toFixed(18).toString());

      // setProfit(finalProfit);

      const BETTING_INSTANCE = await selectReadContractInstance(instanceType.BETTING);

      const profit = await BETTING_INSTANCE.methods
        .GetProfit(rollUnder, _OddEvenStatus, rangeLow, rangeHigh, convertToWei(betValue.toString()))
        .call();

      setProfit(profit);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('Profit', Profit);

  // new approcah for betting -end

  return (
    <BetBox>
      <HowToPlay onClick={() => setshowHowToPlay(true)} style={{ color: "rgba(0, 234, 255, 1)" }}>
        <img src={howtoplay} width="20px" height="15px" />
        How to Play
      </HowToPlay>
      <BetMiddle>
        <FlexColumn style={{ position: "relative" }}>
          <H2 MarginBottom="16px" style={{ marginTop: "10px" }}>BET AMOUNT | AVL BL : {walletBalance ? walletBalance : 0} PLS</H2>
          <Flex>
            <Chance
              value={BetAmount}
              onChange={BetSetThroughInput}
              // onBlur={OutFocusSetBetamount}
              placeholder="0"
            />
            <Flex Width="75%">
              <TransChance onClick={SetMinBetAmount}> MIN</TransChance>
              <TransChance
                onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 6).toFixed(8))}
              >
                {OnLoadMin && OnLoadMax ? ((Number(OnLoadMin) + Number(OnLoadMax)) / 6).toFixed(5) : "-"}
              </TransChance>
              <TransChance
                onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 4).toFixed(8))}
              >
                {OnLoadMin && OnLoadMax ? ((Number(OnLoadMin) + Number(OnLoadMax)) / 4).toFixed(5) : "-"}
              </TransChance>
              <TransChance
                onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 2).toFixed(8))}
              >
                {OnLoadMin && OnLoadMax ? ((Number(OnLoadMin) + Number(OnLoadMax)) / 2).toFixed(5) : "-"}
              </TransChance>

              <TransChance onClick={SetMaxBetAmount}>MAX</TransChance>
            </Flex>
          </Flex>
          {BetRightOrNotAlert ? (
            <H2
              style={{
                color: "red",
                padding: "0",
                margin: "0",
                fontSize: "12px",
                position: "absolute",
                bottom: "-20px",
              }}
            >
              Bet amount should be between {OnLoadMin} and {OnLoadMax}
              {/* Bet Amount Not Between The Minimum And Maximum Allowed */}
            </H2>
          ) : (
            <H2
              style={{
                zIndex: "-2",
                padding: "0",
                margin: "0",
                fontSize: "12px",
                position: "absolute",
                bottom: "-20px",
              }}
            >
              zzz
            </H2>
          )}
        </FlexColumn>

        <FlexColumn>
          <H2 FontSize="16px" style={{ marginBottom: "40px", marginTop: "30px" }}>
            CHANCE OF WINNING
          </H2>
          <Flex JustifyContent="center">
            <RangeSlider
              value={RangeValue}
              onChange={RangeValueChanger}
              HeartBeatSpeed={HeartBeatSpeed}
              Profit={Profit}
            />
          </Flex>
        </FlexColumn>
        <OddEvenDiv style={{ width: "100%" }}>
          <Flex style={{ flexDirection: "column", width: "100%" }}>
            <Flex>
              <H2>Select</H2>
              <Flex
                JustifyContent="center"
                style={{
                  width: "60%",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <Flex style={{ justifyContent: "space-between", width: "60%" }}>
                  <label className="container">
                    Odd
                    <input type="checkbox" checked={checked1} onChange={() => handleCheckChange(1, 1)} />
                    <span className="checkmark"></span>
                  </label>
                </Flex>
                <Flex style={{ justifyContent: "space-between", width: "50%" }}>
                  <label className="container">
                    Even
                    <input type="checkbox" checked={checked2} onChange={() => handleCheckChange(2, 2)} />
                    <span className="checkmark"></span>
                  </label>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              <H2>Select Range</H2>
              <Flex
                style={{
                  width: "60%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Select id="rangeFrom" name="" style={{ width: "100%" }} onChange={handleSelectValue1}>
                  {Numbers.map((data, index) => {
                    return (
                      <Option value={data} key={"rf" + index}>
                        {data}
                        {/* {index} */}
                      </Option>
                    );
                  })}
                </Select>

                <Select id="rangeFrom" name="" style={{ width: "100%" }} onChange={handleSelectValue2}>
                  {Numbers.map((data, index) => {
                    return (
                      <Option value={data} key={"rf" + index}>
                        {data}
                        {/* {index} */}
                      </Option>
                    );
                  })}
                </Select>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              padding: "0",
            }}
          >
            <Flex style={{ width: "100%" }} JustifyContent="center">
              <P>+{Number(multiplier).toFixed(3)}x</P>
              <div style={{ position: "relative" }}>
                <img
                  src={HelpIcon}
                  alt="help"
                  onMouseOver={() => setShowToolTip2(true)}
                  onMouseOut={() => setShowToolTip2(false)}
                />
                {showToolTip2 && (
                  <ToolTipCont>
                    <p>Multiplier(in X)</p>
                  </ToolTipCont>
                )}
              </div>
            </Flex>
          </Flex>
        </OddEvenDiv>

        <Flex style={{ marginTop: "10px" }}>
          <H2 fontSize="18px" FontSizeMobile="16px">
            Roll Under{" "}
          </H2>
          <H1 FontSize="48px" color={colors.primary}>
            {RangeValue + 1}
          </H1>
        </Flex>
        <Flex style={{ alignItems: "center" }}>
          <H2 fontSize="18px" FontSizeMobile="16px">
            Profit{" "}
          </H2>
          <H1 MobileFontSize="13px" color={colors.primary}>
            +{convertToEther(Profit.toString())} PLS
          </H1>
        </Flex>
      </BetMiddle>
      <BetBottom>
        {UserAllowance ? (
          <PrimaryButton disabled={rollDiceDisableOrNot} onClick={() => CallingPlaceBet()}>
            {/* // <PrimaryButton onClick={() => handlePlaceBet(userAddress, BetAmount, RangeValue + 1)}> */}
            {ButtonText()}
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={HandleAllowance} disabled={disableButton}>
            Approve
          </PrimaryButton>
        )}
      </BetBottom>

      <WaitingModal
        // show={true}
        show={loader && !success && !error}
        toggleModal={() => toggleModal()}
      />
      <WinModal
        // show={true}
        show={!loader && success && win && !error}
        toggleModal={() => toggleModal()}
        ResultObject={ResultObject}
        Profit={convertToEther(Profit.toString())}
      />

      <LooseModal
        // show={true}
        show={!loader && success && !win && !error}
        toggleModal={() => toggleModal()}
        ResultObject={ResultObject}
        LossAmount={BetAmount}
      />

      <Alertmsg show={AlertModalState} toggleModal={() => toggleModal()} alertText={AlertText} />
      <CustomModal show={showHowToPlay} heading="HOW TO PLAY" toggleModal={() => setshowHowToPlay(false)}>
        <h3
          style={{
            marginTop: "30px",
            color: "white",
            fontSize: "12px",
            margin: "40px 0px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolnc non blandit.
          <br />
          <br />
          Eget felis eget nunc lobortis. Sed risus pi ut ornare lectus sit amet. Venenatis a condimentum vitae
          sapien pellentesque habitant morbi tristique. Nisl nunc mi ipsum faucibus vitae aliquet nec. Mattis
          enim ut tellus elementum sagittis vitae et. Mattis vulputate enim nulla aliquet.
          <br />
          <br />
          Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Est ultricies Pellentesque
          pulvinar pellentesque habitant morbi tristique senectus. Cursus risus at ultrices mi.
          <br />
          <br />
          Duis ut diam quam nulla porttitor massa id neque aliquam. Feugiat scelerisqu attis aliquam faucibus
          purus in massa tempor.
        </h3>
      </CustomModal>
      <Disclaimer show={showDisclaimer} toggleModal={() => setshowDisclaimer(false)} />
    </BetBox >
  );
};

export default Betting;
