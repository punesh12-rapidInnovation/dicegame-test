import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import web3 from "../../utils/web3";
import { io } from "socket.io-client";
import "./Checkbox.css";
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
  ToolTipCont

} from "./style";
import { MinBetAmount, MaxBetAmount, HouseEdge, HouseEdgeDiviser } from "../blockChain/bettingMethods";
import { convertToEther } from "../../utils/helper";
import { CheckAllowance } from "../blockChain/Routermethods";
import { BETTING_ADDRESS } from "../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import { LINK_TOKEN_ADDRESS } from "../../config";
import { setWalletBalance } from "logic/action/wallet.action";
import { PrimaryButton } from "shared/button/Button";
import { colors } from "shared/styles/theme";
import { floatNumRegex } from "shared/helpers/regrexConstants";
import WaitingModal from "./modals/WaitingModal";
import WinModal from "./modals/WinModal";
import LooseModal from "./modals/LooseModal";
import Alertmsg from "./modals/Alertmsg";
import Sliderthumb from "assets/icons/sliderthumb.svg";
import QuestionMark from "assets/icons/questionMark.svg";


const Betting = () => {
  const [RangeValue, setRangeValue] = useState<number>(75);
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
  const [showToolTip1, setShowToolTip1] = useState(false)
  const [showToolTip2, setShowToolTip2] = useState(false)
  const [evenOddProfit, setEvenOddProfit] = useState(0)
  const [rangeProfit, setRangeProfit] = useState(0)


  const [Numbers, setNumbers] = useState([]);

  const { walletBalance, userAddress } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    for (let index = 0; index < 100; index += 10) {
      //@ts-ignore
      setNumbers((prev: any) => [...prev, `${index}-${index + 10}`]);
    }
    if (localStorage.getItem("Loading") === "true") {
      setLoader(true);
    }
  }, []);

  useEffect(() => {
    let Address: any;
    const getBalance = async () => {
      let accounts = await web3.eth.getAccounts();
      Address = accounts[0];
    };

    getBalance();

    const socket = io("wss://diceroll.rapidinnovation.tech");
    try {
      socket.on("connection", () => {
        // Replace event name with connection event name
        console.log("websocket connected");
      });
      socket.on("betevent", (data: any) => {
        console.log(data);
        const LocalBetId = localStorage.getItem("PlacingBetId");
        console.log(LocalBetId);
        if (LocalBetId === data.BetID) {
          console.log("ResultObjectupdated");
          setResultObject({
            Betid: data.BetID,
            Diceresult: data.DiceResult,
            Playeraddress: data.PlayerAddress,
            Playernumber: data.PlayerNumber,
            Status: data.Status,
            Date: new Date().toLocaleString(),
            Value: data.Value,
          });
        }
        // if (!!ResultObject && userAddress === ResultObject.PlayerAddress) {

        // StoringLastRolls();
        // setShowResultModal(true)
        // }
      });
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  window.onbeforeunload = function () {
    if (PlacingBet) return "Leaving this page will reset the wizard";
  };

  //#region Bet Amount
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
  };
  const OnLoadMaxBet = async () => {
    const MaxBet = convertToEther(await MaxBetAmount());
    setOnLoadMax(MaxBet);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   OnLoadMaxBet();
    //   OnLoadMinBet();
    // }, 5000);
    OnLoadMaxBet();
    OnLoadMinBet();
  }, [ResultObject]);

  useEffect(() => {
    if (BetAmount === 0 || BetAmount === "") setBetRightOrNotAlert(false);
    else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) setBetRightOrNotAlert(true);
    else setBetRightOrNotAlert(false);

    OnLoadMaxBet();
    OnLoadMinBet();
  }, [BetAmount]);

  const RangeValueChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const RangePercent = parseInt(e.currentTarget.value);
    if (RangePercent > 98) setRangeValue(98);
    else if (RangePercent < 1) setRangeValue(1);
    else setRangeValue(RangePercent);
  };

  const BetSetThroughInput = (e: any) => {
    const { value } = e.target;
    if (value < 20 && floatNumRegex.test(value.toString())) {
      setBetAmount(e.target.value);
    } else setBetAmount("");
  };

  const OutFocusSetBetamount = () => {
    if (BetAmount === "") {
      setBetAmount(0);
      console.log("set 0");
    }
  };

  const CallingPlaceBet = async () => {
    if (localStorage.getItem("Loading") === "true") {
      return;
    } else if (PlacingBet) {
      return;
    } else if (BetAmount === 0) {
      setAlertText("BET AMOUNT CANNOT BE 0")
      setAlertModalState(true);
      return;
    } else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) {
      setAlertText("Amount Not Under Minimum And Maximum Amount Allowed");
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
    const ProfitCalculator = async () => {
      const HouseEdgeAmount = parseInt(await HouseEdge());
      const HouseEdgeDiviserAmount = parseInt(await HouseEdgeDiviser());

      const MultipliedBetAmount = BetAmount * 1e18;
      // const ProfitInWei =
      //   (((MultipliedBetAmount * (100 - RangeValue)) / RangeValue + MultipliedBetAmount) * HouseEdgeAmount) /
      //   HouseEdgeDiviserAmount -
      //   MultipliedBetAmount;

      // const FinalProfit = ProfitInWei / 1e18;

      // setProfit(FinalProfit);


      let tempPlayerProfit = (((
        ((MultipliedBetAmount * (100 - (RangeValue))) /
          (RangeValue) + MultipliedBetAmount)
      ) * HouseEdgeAmount) / HouseEdgeDiviserAmount) -
        MultipliedBetAmount;

      if (evenOdd == 0) {
        tempPlayerProfit = tempPlayerProfit;
      }
      else if (evenOdd == 1 || evenOdd == 2) {
        tempPlayerProfit = tempPlayerProfit + tempPlayerProfit * 10000 / 100000;
      }
      if (rangeLow > 0 || rangeHigh > 0) {
        console.log('reach');

        const midNum = (Number(rangeLow) + Number(rangeHigh)) / 2;

        console.log('check', rangeLow, midNum, rangeHigh, rangeLow > midNum, rangeHigh <= midNum);

        if (rangeHigh > midNum && rangeLow <= midNum) {
          //tempPlayerProfit = tempPlayerProfit + tempPlayerProfit * 10000 / 100000;
          tempPlayerProfit = tempPlayerProfit + tempPlayerProfit * (2 * (((100 - rangeHigh) * 100) / 100000));
          console.log('reach1');

        }
      }
      const finalProfit = tempPlayerProfit / 1e18
      setProfit(finalProfit);
    };

    const CheckAllowanceStatus = async () => {
      if (userAddress) {
        const CheckAllowanceResult = await CheckAllowance(userAddress, BETTING_ADDRESS);
        if (CheckAllowanceResult >= 1) setUserAllowance(true);
        else setUserAllowance(false);
      }
    };

    ProfitCalculator();
    CheckAllowanceStatus();
  }, [BetAmount, RangeValue, evenOdd, rangeLow, rangeHigh, userAddress]);
  //#endregion

  //#region Handle
  const HandleAllowance = async () => {
    if (userAddress) {
      //create instance of an abi to call any blockChain function
      const lpInstance = await selectInstances(
        instanceType.ERC20TOKEN, // type of instance
        LINK_TOKEN_ADDRESS //contract address
      );

      if (true) {
        const approvalAmount = ethers.constants.MaxUint256; //  Infinite number
        await lpInstance.methods
          .approve(BETTING_ADDRESS, approvalAmount)
          .send({
            from: userAddress,
          })
          .once("confirmation", function (receipt: any) {
            setUserAllowance(true);
          });
      }
    } else {
      setAlertText("Connect Wallet To Place Bet");
      setAlertModalState(true);
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

  const SliderFollower = () => {
    if (RangeValue > 90) {
      return RangeValue - 10;
    } else if (RangeValue < 20) {
      return RangeValue + 10;
    } else {
      return RangeValue;
    }
  };

  const HeartBeatSpeed = () => {
    // if (RangeValue > 75) {
    //   return "1.6s";
    // } else if (RangeValue > 50) {
    //   return "1.2s";
    // } else if (RangeValue > 25) {
    //   return "0.8s";
    // } else {
    //   return "0.5s";
    // }

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

  // const CallingPlaceBet = async () => {
  //   if (localStorage.getItem("Loading") === "true") {
  //     return;
  //   } else if (PlacingBet) {
  //     return;
  //   } else if (BetAmount === 0) {
  //     setAlertText("BET AMOUNT CANNOT BE 0");
  //     setAlertModalState(true);
  //     return;
  //   } else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) {
  //     setAlertText("Amount Not Under Minimum And Maximum Amount Allowed");
  //     setAlertModalState(true);
  //   } else {
  //     if (userAddress) {
  //       const RollUnder: any = RangeValue + 1;
  //       const BetId = await PlaceBet(userAddress, BetAmount, RollUnder);
  //       console.log(BetId);
  //       setPlacingBetId(BetId?.events.LogBet.returnValues.BetID);
  //       localStorage.setItem("PlacingBetId", BetId?.events.LogBet.returnValues.BetID);
  //     }
  //   }
  // };

  const PlaceBet = async (myAccount: string | null, Amount: any, Rollunder: number, evenOdd: number) => {
    //create instance of an abi to call any blockChain function
    const Ethervalue = web3.utils.toWei(Amount.toString(), "ether");
    // const Ethervalue = convertToEther(Amount);

    const lpInstance = await selectInstances(
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
          // window.location.reload();
        });
      console.log(RollDice);
      return RollDice;
    } catch (error: any) {

      console.log('errr', error)
      if (error.code === 4001) {
        setPlacingBet(false);

      } else {
        localStorage.setItem("Loading", "false");
        window.location.reload();
      }
    }
  }



  useEffect(() => {
    const LocalBetIt = localStorage.getItem("PlacingBetId");
    console.log(LocalBetIt);

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
        // setBetAmount(0);
        StoringLastRolls();
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
      } else {
        console.log("unhandled result");
      }
    } else {
      console.log(ResultObject?.Betid, LocalBetIt)
      console.log("not our result");
      // console.log(ResultObject?.Playeraddress.toUpperCase());
      // console.log(userAddress.toUpperCase());
    }
  }, [ResultObject]);

  const StoringLastRolls = () => {
    if (localStorage.getItem("LastRolls") === null) {
      localStorage.setItem("LastRolls", JSON.stringify([ResultObject]));
      console.log("not exist ran");
    } else {
      console.log("exist ran");
      const Resulttillnow = JSON.parse(localStorage.getItem("LastRolls") || "[]");
      if (Resulttillnow.length === 10) {
        Resulttillnow.splice(-1);
        console.log(Resulttillnow);
        localStorage.setItem("LastRolls", JSON.stringify(Resulttillnow));
      }
      const PreviousResults = JSON.parse(localStorage.getItem("LastRolls") || "[]");
      PreviousResults.unshift(ResultObject);
      localStorage.setItem("LastRolls", JSON.stringify(PreviousResults));
    }
  };

  //   useEffect(() => {
  // window.addEventListener('storage', () => {
  //   StoringLastRolls();
  // });
  // }, [])

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

  // useEffect(() => {
  //   ProfitCalculator();
  //   CheckAllowanceStatus();
  // });

  useEffect(() => {
    OnLoadMaxBet();
    OnLoadMinBet();
  }, [BetAmount]);

  useEffect(() => {
    setTimeout(() => {
      OnLoadMaxBet();
      OnLoadMinBet();
    }, 5000);


  }, [ResultObject]);

  // useEffect(() => {
  //   let speed = (Number(RangeValue) / 100)
  //   if (RangeValue !== 1 && !loader)
  //     rangeSliderSound(speed.toFixed(2), true, soundFlag, setSoundFlag)
  // }, [RangeValue, loader])
  const handleCheckChange = (value: any, checkNum: Number) => {

    if (checkNum === 1 && !checked1) {
      setChecked1(!checked1);
      setChecked2(false);
      setEvenOdd(1);
    }
    else if (checkNum === 2 && !checked2) {
      setChecked2(!checked2);
      setChecked1(false);
      setEvenOdd(2);
    }
    else if (checked1) {
      setChecked1(!checked1);
      setEvenOdd(0);
    }
    else if (checked2) {
      setChecked2(!checked2);
      setEvenOdd(0);
    }
    else
      setEvenOdd(0);

  }

  useEffect(() => {

    if (evenOdd !== 0)
      setEvenOddProfit(5)
    else
      setEvenOddProfit(0)

    handleRangeProfit(rangeLow, rangeHigh);

  }, [evenOdd, rangeLow, rangeHigh]);


  const handleRangeProfit = (rangeLow: any, rangeHigh: any) => {
    const range: any = `${rangeLow}-${rangeHigh}`;

    switch (range) {
      case '0-10':
        setRangeProfit(20);
        break;
      case '10-20':
        setRangeProfit(18);
        break;
      case '20-30':
        console.log('3');
        setRangeProfit(16);
        break;
      case '30-40':
        setRangeProfit(14);
        break;
      case '40-50':
        setRangeProfit(12);
        break;
      case '50-60':
        setRangeProfit(10);
        break;
      case '60-70':
        setRangeProfit(8);
        break;
      case '70-80':
        setRangeProfit(6);
        break;
      case '80-90':
        setRangeProfit(4);
        break;
      case '90-100':
        setRangeProfit(2);
        break;
      default:
        setRangeProfit(0);
        break;
    }
  }

  const handleSelectValue = (e: any) => {
    const value = e.target.value;
    const first: any = value.split('-')[0];
    const second: any = value.split('-')[1];
    setRangeLow(first);
    setRangeHigh(second);
  }



  return (
    <BetBox>
      <BetMiddle>
        <FlexColumn style={{ position: "relative" }}>
          <H2 MarginBottom="16px">BET AMOUNT | AVL BL : {walletBalance ? walletBalance : 0} PLS</H2>
          <Flex>
            <Chance
              value={BetAmount}
              onChange={BetSetThroughInput}
              onBlur={OutFocusSetBetamount}
              placeholder="0"
            />
            <Flex Width="75%">
              <TransChance onClick={SetMinBetAmount}> MIN</TransChance>
              <TransChance
                onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 6).toFixed(4))}
              >
                {OnLoadMin && OnLoadMax ? ((Number(OnLoadMin) + Number(OnLoadMax)) / 6).toFixed(4) : "-"}
              </TransChance>
              <TransChance
                onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 4).toFixed(4))}
              >
                {OnLoadMin && OnLoadMax ? ((Number(OnLoadMin) + Number(OnLoadMax)) / 4).toFixed(4) : "-"}
              </TransChance>
              <TransChance
                onClick={() => setBetAmount(((Number(OnLoadMin) + Number(OnLoadMax)) / 2).toFixed(4))}
              >
                {OnLoadMin && OnLoadMax ? ((Number(OnLoadMin) + Number(OnLoadMax)) / 2).toFixed(4) : "-"}
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
              Bet Amount Not Between The Minimum And Maximum Allowed
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
          <Flex>
            <Flex
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "95%",
                alignSelf: "flex-start",
                marginTop: "15px",

                position: "relative",
              }}
            >
              <Range type="range" value={RangeValue} onChange={RangeValueChanger}></Range>
              <div
                style={{
                  position: "absolute",
                  textAlign: "center",
                  width: "100px",
                  background: "rgba(0,0,0,0.3)",
                  top: "-35px",
                  left: `${SliderFollower()}%`,
                  transform: "translate(-50%,-50%)",
                  padding: "6px",
                  fontSize: "9px",
                  borderRadius: "22px",
                  border: "1px solid #EF0896",
                }}
              >
                Roll under <span style={{ color: colors.primary }}>{RangeValue + 1}</span>,
                <br />
                Profit
                <span style={{ color: colors.primary }}> +{Profit.toFixed(6)} PLS</span>
              </div>
              <SliderThumb
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: `${RangeValue - 5}%`,
                  transform: "translate(-50%,-50%)",
                }}
                duration={HeartBeatSpeed}
              >
                {" "}
              </SliderThumb>
            </Flex>
          </Flex>
        </FlexColumn>
        <OddEvenDiv style={{ width: "100%" }}>


          <Flex >
            <H2>Select</H2>
            <Flex
              JustifyContent="center"
              style={{ width: "60%", alignItems: 'center', paddingLeft: "10px" }}>
              <Flex style={{ justifyContent: "space-between", width: "50%" }}>
                <label className="container">
                  Odd
                  <input type="checkbox"
                    checked={checked1}
                    onChange={() => handleCheckChange(1, 1)}
                  />
                  <span className="checkmark"></span>
                </label>
              </Flex>
              <Flex style={{ justifyContent: "space-between", width: "50%" }}>
                <label className="container">
                  Even
                  <input type="checkbox"
                    checked={checked2}
                    onChange={() => handleCheckChange(2, 2)}
                  />
                  <span className="checkmark"></span>
                </label>
              </Flex>
              <Flex style={{ width: "40%" }}
                JustifyContent="center"
              >
                <P>{evenOddProfit}%</P>
                <div style={{ position: "relative" }}>
                  <img src={QuestionMark} alt="help"
                    onMouseOver={() => setShowToolTip1(true)}
                    onMouseOut={() => setShowToolTip1(false)}
                  />
                  <ToolTipCont display={showToolTip1}>
                    <p>Additional Profit(in %)</p>
                  </ToolTipCont>
                </div>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <H2>Select Range</H2>
            <Flex style={{ width: "60%", justifyContent: "space-between", alignItems: "center" }}>
              <Select id="rangeFrom" name=""
                style={{ width: "100%" }}
                onChange={handleSelectValue}
              >
                {Numbers.map((data, index) => {
                  return (
                    <Option value={data} key={"rf" + index}>
                      {data}
                      {/* {index} */}
                    </Option>
                  );
                })}
              </Select>

              <Flex style={{ width: "40%" }}
                JustifyContent="center"
              >
                <P>{rangeProfit}%</P>
                <div style={{ position: "relative" }}>
                  <img src={QuestionMark} alt="help"
                    onMouseOver={() => setShowToolTip2(true)}
                    onMouseOut={() => setShowToolTip2(false)}
                  />
                  <ToolTipCont display={showToolTip2}>
                    <p>Additional Profit(in %)</p>
                  </ToolTipCont>
                </div>
              </Flex>

            </Flex>
          </Flex>
        </OddEvenDiv>
        <Flex style={{ marginTop: "10px" }}>
          <H2 style={{ fontSize: "18px" }}>Roll Under </H2>
          <H1 FontSize="48px" color={colors.primary}>{RangeValue + 1}</H1>
        </Flex>
        <Flex>
          <H2 style={{ fontSize: "18px" }}>Profit </H2>
          <H1 color={colors.primary} >+{Profit} PLS</H1>
        </Flex>
      </BetMiddle>
      <BetBottom>
        {UserAllowance ? (
          <PrimaryButton onClick={() => CallingPlaceBet()}>
            {/* // <PrimaryButton onClick={() => handlePlaceBet(userAddress, BetAmount, RangeValue + 1)}> */}
            {ButtonText()}
          </PrimaryButton>
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

      {/* <CustomModal
        // show={true}
        show={showResultModal}
        toggleModal={() => ResultPopupCloser()}
        heading="Your Roll"
      >
        <BetResult>
          <H2 color={colors.white}>{userAddress}</H2>
          <PercentChance fontSize="40px" width="150px" MarginBottom="30px">
            {ResultRoll}
          </PercentChance>
          <H1 color={win ? colors.green : colors.red}>{WinLooseMsg}</H1>
          <H2>Roll Under.{PlayerRoll}</H2>
        </BetResult>
      </CustomModal> */}

      <WaitingModal show={loader && !success && !error} toggleModal={() => toggleModal()} />
      <WinModal
        // show={true}
        show={!loader && success && win && !error}
        toggleModal={() => toggleModal()}
        ResultObject={ResultObject}
        Profit={Profit.toFixed(6)}
      />

      <LooseModal
        // show={true}
        show={!loader && success && !win && !error}
        toggleModal={() => toggleModal()}
        ResultObject={ResultObject}
        LossAmount={BetAmount}
      />

      <Alertmsg show={AlertModalState} toggleModal={() => toggleModal()} alertText={AlertText} />
    </BetBox>
  );
};

export default Betting;
