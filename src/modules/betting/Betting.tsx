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
  BetResult,
  OddEvenDiv,
  SliderThumb,
  Select,
  Option,
} from "./style";
import { MinBetAmount, MaxBetAmount, HouseEdge, HouseEdgeDiviser } from "../blockChain/bettingMethods";
import Cross from "../../assets/icons/Cross.svg";
import { convertToEther, convertToWei } from "../../utils/helper";
import { CheckAllowance } from "../blockChain/Routermethods";
import { BETTING_ADDRESS } from "../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import { ROUTER_ADDRESS } from "../../config";
import { setWalletBalance } from "logic/action/wallet.action";
import CustomModal from "shared/custom-modal";
import { PrimaryButton } from "shared/button/Button";
import { colors } from "shared/styles/theme";
import { floatNumRegex } from "shared/helpers/regrexConstants";
import { rangeSliderSound, rollingDiceSound, Sound } from "./Sound";
import WaitingModal from "./modals/WaitingModal";
import WinModal from "./modals/WinModal";
import LooseModal from "./modals/LooseModal";
import Sliderthumb from "../../assets/icons/sliderthumb.svg";

const Betting = () => {
  const [RangeValue, setRangeValue] = useState<number>(1);
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

  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [Numbers, setNumbers] = useState([]);

  useEffect(() => {
    for (let index = 0; index < 100; index++) {
      //@ts-ignore
      setNumbers((prev: any) => [...prev, index]);
    }
    if (localStorage.getItem("Loading") === "true") {
      setLoader(true);
    }
  }, []);

  window.onbeforeunload = function () {
    if (PlacingBet) {
      return "Leaving this page will reset the wizard";
    }
  };

  const { walletBalance, userAddress } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

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
    if (BetAmount === 0 || BetAmount === "") {
      setBetRightOrNotAlert(false);
    } else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) {
      setBetRightOrNotAlert(true);
    } else {
      setBetRightOrNotAlert(false);
    }
  });

  const RangeValueChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const RangePercent = parseInt(e.currentTarget.value);
    if (RangePercent > 98) {
      setRangeValue(98);
    } else if (RangePercent < 1) {
      setRangeValue(1);
    } else {
      setRangeValue(RangePercent);
    }
  };

  const BetSetThroughInput = (e: any) => {
    const { value } = e.target;
    if (value < 20 && floatNumRegex.test(value.toString())) {
      setBetAmount(e.target.value);
    } else setBetAmount("");
  };

  const OutFocusSetBetamount = () => {
    //@ts-ignore
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
      window.alert("BetAmount cannot be 0");
      return;
    } else if (BetAmount < OnLoadMin || BetAmount > OnLoadMax) {
      alert("AMOUNT NOT UNDER MINIMUM AND MAXIMUM BETAMOUNT ALLOWED");
    } else {
      if (userAddress) {
        const RollUnder: any = RangeValue + 1;
        const BetId = await PlaceBet(userAddress, BetAmount, RollUnder);
        console.log(BetId);
        setPlacingBetId(BetId?.events.LogBet.returnValues.BetID);
        localStorage.setItem("PlacingBetId", BetId?.events.LogBet.returnValues.BetID);
      }
    }
  };

  const ProfitCalculator = async () => {
    const Houseedgeamount = parseInt(await HouseEdge());
    const Houseedgediviseramount = parseInt(await HouseEdgeDiviser());

    const MultipliedBetAmount = BetAmount * 1e18;
    const ProfitInWei =
      (((MultipliedBetAmount * (100 - RangeValue)) / RangeValue + MultipliedBetAmount) * Houseedgeamount) /
      Houseedgediviseramount -
      MultipliedBetAmount;

    const FinalProfit = ProfitInWei / 1e18;
    // const finP = new BigNumber(FinalProfit, 18)

    setProfit(FinalProfit);
  };

  const CheckAllowanceStatus = async () => {
    if (userAddress) {
      const CheckAllowanceResult = await CheckAllowance(userAddress, BETTING_ADDRESS);
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
      alert("Connect wallet to place bet");
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
    if (RangeValue > 75) {
      return "1.6s";
    } else if (RangeValue > 50) {
      return "1.2s";
    } else if (RangeValue > 25) {
      return "0.8s";
    } else {
      return "0.5s";
    }
  };

  const handlePlaceBet = async (walletAddress: string, betAmount: number, rollUnder: number) => {
    try {
      const lpInstance = await selectInstances(
        instanceType.BETTING, // type of instance
        BETTING_ADDRESS //contract address
      );
      await lpInstance.methods
        .playerRollDice(rollUnder)
        .send({
          from: walletAddress,
          value: convertToWei(betAmount),
        })
        .once("transactionHash", function (res: any) {
          setLoader(true);
        })
        .once("confirmation", function (receipt: any) {
          // setSuccess(true)
        });
    } catch (error) {
      console.log("error", error);
      setLoader(false);
      setSuccess(false);
      setError(true);
    }
  };

  const toggleModal = () => {
    setLoader(false);
    setSuccess(false);
    setError(false);
    // setBetAmount("");
    // setRangeValue(1);
    // window.location.reload();
  };

  useEffect(() => {
    const socket = io("wss://diceroll.rapidinnovation.tech");
    try {
      socket.on("connection", () => {
        // Replace event name with connection event name
        console.log("websocket connected");
      });
      socket.on("betevent", (data) => {
        console.log(data);
        setResultObject({
          Betid: data.BetID,
          Diceresult: data.DiceResult,
          Playeraddress: data.PlayerAddress,
          Playernumber: data.PlayerNumber,
          Status: data.Status,
          Date: new Date().toLocaleString(),
          Value: data.Value,
        });
        // if (!!ResultObject && userAddress === ResultObject.PlayerAddress) {

        // StoringLastRolls();
        // setShowResultModal(true)
        // }
      });
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  const PlaceBet = async (myAccount: string | null, Amount: any, Rollunder: number) => {
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
        const RollDice = await lpInstance.methods
          .playerRollDice(Rollunder)
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
        if (error.code === 4001) {
          setPlacingBet(false);
        } else {
          localStorage.setItem("Loading", "false");
        }
      }
    }
  };

  useEffect(() => {
    const LocalBetIt = localStorage.getItem("PlacingBetId");
    console.log(LocalBetIt);

    if (userAddress && userAddress.toUpperCase() === ResultObject?.Playeraddress.toUpperCase()) {
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
        StoringLastRolls();
      } else {
        console.log("unhandled result");
      }
    } else {
      console.log("not our result");
      console.log(ResultObject?.Playeraddress.toUpperCase());
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
    }, 5000);
  }, [ResultObject]);

  // useEffect(() => {
  //   let speed = (Number(RangeValue) / 100)
  //   if (RangeValue !== 1 && !loader)
  //     rangeSliderSound(speed.toFixed(2), true, soundFlag, setSoundFlag)
  // }, [RangeValue, loader])

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
                <span style={{ color: colors.primary }}>+{Profit.toFixed(6)} PLS</span>
              </div>
              <SliderThumb style={{
                position: "absolute",
                top: "-20px",
                left: `${RangeValue - 5}%`,
                transform: "translate(-50%,-50%)",
              }} duration={HeartBeatSpeed} > </SliderThumb>

            </Flex>
          </Flex>
        </FlexColumn>
        <OddEvenDiv style={{ width: "100%" }}>
          <Flex>
            <H2>Select</H2>
            <Flex style={{ width: "40%", justifyContent: "center" }}>
              <Flex style={{ justifyContent: "center", marginRight: "16px" }}>
                <label className="container">
                  Odd
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </Flex>
              <Flex style={{ justifyContent: "center" }}>
                <label className="container">
                  Even
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <H2>Select Range</H2>
            <Flex style={{ width: "40%", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "12px" }}>From</p>
              <Select id="rangeFrom" name="">
                {Numbers.map((data, index) => {
                  return (
                    <Option value={index + 1} key={"rf" + index}>
                      {index + 1}
                    </Option>
                  );
                })}
              </Select>
              <p style={{ fontSize: "12px" }}>To</p>
              <Select id="rangeTo" name="">
                {Numbers.map((data, index) => {
                  return (
                    <Option value={index + 2} key={"rt" + index}>
                      {index + 2}
                    </Option>
                  );
                })}
              </Select>
            </Flex>
          </Flex>
        </OddEvenDiv>
        <Flex style={{ marginTop: "10px" }}>
          <H2 style={{ fontSize: "18px" }}>Roll Under </H2>
          <H1 FontSize="18px">{RangeValue + 1}</H1>
        </Flex>
        <Flex>
          <H2 style={{ fontSize: "18px" }}>Profit </H2>
          <H1 FontSize="18px">+{Profit} PLS</H1>
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
    </BetBox>
  );
};

export default Betting;
