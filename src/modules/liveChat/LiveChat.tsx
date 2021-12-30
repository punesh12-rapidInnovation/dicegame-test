import React, { useState, useEffect, createRef, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import Betting from "../betting";
import LastRolls from "modules/LastRolls/LastRolls";
import Emojis from "./EmojiComponent/Emojis";
import ChatProfile from "../../assets/icons/ChatProfileIcon.svg";
import Alertmsg from "modules/betting/modals/Alertmsg";
import useTyping from "./hooks/useTyping";

import {
  GlobalChatSection,
  Box,
  ChatBox,
  ChatTopdiv,
  ChatMiddlediv,
  Input,
  Button,
  PopupModal,
  Messagediv,
  InputParent,
  OwnMsg,
  BoxTitle,
  HousePoolChartLabel,
  EmojiButton,
  Emojisdiv,
  OthersMsgIcon,
  OtherMsgAddress,
  Time,
  Report,
  TypingDiv,
  Warningcont
} from "./style";
import warning from '../../assets/icons/warning.svg';
import ReportIcon from "assets/icons/reportIcon.svg";

import { useSelector } from "react-redux";
import BarChart from "modules/app/components/barChart/BarChart";
import { dateFromTimestamp, formatAddress } from "utils/helper";
import { ToolTipCont } from "modules/betting/style";

const LiveChat = (props: any) => {
  const { userAddress, chatMessage } = useSelector((state: any) => state.wallet);

  const inputRef = createRef<HTMLInputElement>();
  const messagesEndRef = createRef<HTMLDivElement>();
  const { connectWallet, setToggleModal, toggleModal } = props;
  const [showEmojis, setshowEmojis] = useState("none");
  const [cursorPosition, setcursorPosition] = useState();
  const [messages, setMessages] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [liquidityChartData, setLiquidityChartData] = useState<any>([]);
  const [hoverLiquidityChartValue, setHoverLiquidityChartValue] =
    React.useState<any>("");
  const [hoverLiquidityChartDate, setHoverLiquidityChartDate] =
    React.useState<any>("");
  const [userTyping, setUserTyping] = useState(false);
  const [userTypingAddress, setUserTypingAddress] = useState("");
  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertModaltext, setAlertModaltext] = useState("");
  const [UserBlockedOrNot, setUserBlockedOrNot] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<any>([])
  const [typingUsers, setTypingUsers] = useState([]);
  const [PeopleOnline, setPeopleOnline] = useState<number>(0);
  const [ShowWarning, setShowWarning] = useState<Boolean>(false);



  const BASE_URL = "https://diceroll.rapidinnovation.tech/api/message";

  const socketRef = useRef();

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const StoppedTyping: ReturnType<any> = () => {

    setTimeout(() => {
      setUserTyping(false);
      setUserTypingAddress("0");
      console.log("setted false")
    }, 8000);
  }

  useEffect(() => {
    setMessages(chatMessage)
    setUserTyping(false);
  }, [chatMessage])



  useEffect(() => {
    //@ts-ignore
    socketRef.current = io("wss://diceroll.rapidinnovation.tech");

    try {
      //@ts-ignore
      socketRef.current.on("connection", () => {
        // Replace event name with connection event name
        console.log("websocket connected");
      });
      // socket.emit('message');
      //@ts-ignore
      //socketRef.current.on("message", (data) => {
      //   console.log("data", data);
      //   const updatedData = [...messages, data];
      //   setMessages(updatedData);
      //setUserTyping(false);

      //});
      //@ts-ignore
      socketRef.current.on("typing", (data) => {
        console.log("typingdata", data);
        if (data === "stop") {
          setUserTyping(false);
          setUserTypingAddress("0");
        } else {
          setUserTyping(true);
          setUserTypingAddress(data);
        }
      });
    } catch (err) {
      console.log("err", err);
    }
    return () => {
      //@ts-ignore
      socketRef.current.disconnect();
    };
  }, [messages]);


  //@ts-ignore
  const address = JSON.parse(localStorage.getItem("address"));

  //@ts-ignore
  useEffect(async () => {
    //@ts-ignore
    const address = JSON.parse(localStorage.getItem("address"));
    if (address !== null) {
      const axiosInstance = axios.create({
        baseURL: "https://diceroll.rapidinnovation.tech/pool",
      });

      await axiosInstance
        .get(`/allBlockUser/${address}`)
        .then(function (response) {
          //@ts-ignore  
          const counter = response.data.result?.counter;
          if (counter > 4) {
            setUserBlockedOrNot(true);
            console.log(UserBlockedOrNot);
            console.log(counter)
          } else {
            console.log(UserBlockedOrNot);
            console.log(counter)

          }
        });
    }
  }, [address]);


  const removeReportedUserMessages = (reportAddress: any) => {
    let messageData: any = [];
    messages.map((message: any, index: any) => {
      if (message.username !== reportAddress) {
        messageData = [...messageData, message];
      }
    })
    setMessages(messageData)
  }

  const HandleReport = async (address: string) => {
    const walletConnectOrNot = localStorage.getItem("walletConnected");
    if (walletConnectOrNot !== "true") {

      setAlertModaltext("Connect Wallet to Send Message To Global Chat");
      setAlertModalState(true);
      return;
    }
    const ReportedUsers = JSON.parse(localStorage.getItem("ReportedUsers") || "[]");
    console.log(ReportedUsers);
    let Reported = false;

    ReportedUsers.map((user: any) => {
      if (user === address) {
        setAlertModalState(true);
        setAlertModaltext("You have already reported this user! ");
        Reported = true;
        console.log("already reported")
      }

    })

    if (Reported) {
      return;
    }

    for (let index = 0; !!blockedUsers && index < blockedUsers.length; index++) {
      if (address == blockedUsers[index]) {
        setAlertModaltext("You have already reported this user! ");
        setAlertModalState(true);
        return;
      }
    }

    if (!UserBlockedOrNot) {
      const axiosInstance = axios.create({
        baseURL: "https://diceroll.rapidinnovation.tech/pool",
      });
      await axiosInstance
        .post("/blockUser", {
          publicAddress: address,
        })
        .then(function (response) {
          console.log(response.status);
          if (response.status === 200) {
            setAlertModaltext(
              "You have reported this user successfully we will take a look into it"
            );
            setAlertModalState(true);
            if (localStorage.getItem("ReportedUsers") === null) {
              localStorage.setItem("ReportedUsers", JSON.stringify([address]));
            } else {
              const Reportedtillnow = JSON.parse(
                localStorage.getItem("ReportedUsers") || "[]"
              );
              Reportedtillnow.unshift(address);
              localStorage.setItem("ReportedUsers", JSON.stringify(Reportedtillnow));
            }
          }
        });
    } else {
      setAlertModaltext("Global Chat Access Blocked")
      setAlertModalState(true);
    }
  };

  //@ts-ignore
  const pickEmoji = (e: any, { emoji }) => {
    console.log(e.target);
    const ref: any = inputRef.current;
    ref.focus();
    const start = inputMessage.substring(0, ref.selectionStart);
    const end = inputMessage.substring(ref.selectionStart);
    const text = start + emoji + end;
    console.log(e.target);
    setInputMessage(text);
    setcursorPosition(start.length + emoji.length);
  };

  const handleShowEmojis = () => {
    if (showEmojis === "flex") {
      setshowEmojis("none");
    } else {
      //@ts-ignore
      inputRef.current.focus();
      setshowEmojis("flex");
    }
  };

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: "https://diceroll.rapidinnovation.tech/pool",
    });
    const getdata = async () => {
      const res = await axiosInstance.get("/allLiquidity");
      setLiquidityChartData(res.data);
    }; //
    getdata();
  }, []);

  const sendTOAPI = async () => {
    if (UserBlockedOrNot) {
      console.log(UserBlockedOrNot);
      setAlertModaltext("You Have Been Blocked From Global Chat");
      setAlertModalState(true);
      return;
    } else {
      setUserTyping(false);
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -1);

      console.log("time", localISOTime);

      const walletConnectOrNot = localStorage.getItem("walletConnected");
      if (inputMessage.trim() === "" || walletConnectOrNot !== "true") {
        if (walletConnectOrNot !== "true") {
          setAlertModaltext("Connect Wallet to Send Message To Global Chat");
          setAlertModalState(true);
        }
        return;
      }
      const data: any = {
        username: userAddress,
        content: inputMessage,
        time: localISOTime,
      };
      setInputMessage('');
      //@ts-ignore
      socketRef.current.emit("message", data);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputMessage = (e: any) => {
    const { value } = e.target;
    setInputMessage(value);
  };

  const renderChat = () => {
    var today = new Date();
    return messages.map((m: any, index: any) =>
      m.username === userAddress ? (
        <OwnMsg key={index}>
          {m.content}
          <Time>{m.time.substring(11, 16)}</Time>
        </OwnMsg>
      ) :
        (
          <Messagediv key={index}>
            <OthersMsgIcon src={ChatProfile} alt="" />
            <OtherMsgAddress>{m.username.substring(0, 10)}...</OtherMsgAddress>
            {m.content}
            <Time>{m.time.substring(11, 16)}</Time>
            <Report onClick={(e) => HandleReport(m.username)}>
              <img src={ReportIcon} alt="" />
              <p> Report Spam</p>
            </Report>
          </Messagediv>
        )
    )
  }
  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userTyping, messages]);

  useEffect(() => {
    //@ts-ignore
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  // const handleKeyPress = (e: any) => {
  //   if (!socketRef.current || UserBlockedOrNot) return;
  //   //@ts-ignore
  //   socketRef.current.emit("typing", userAddress);
  //   // socket.broadcast.emit('typing', userAddress);
  // };
  const Closealert = () => {
    setAlertModalState(false);
  };

  // const handleKeyUp = (e: any) => {
  //   if (!socketRef.current) return;
  //   //@ts-ignore
  //   socketRef.current.emit("typing", "stop");
  //   // socket.broadcast.emit('typing', 'stop');
  // };
  const startTypingMessage = () => {
    if (!socketRef.current || UserBlockedOrNot) return;
    //@ts-ignore
    socketRef.current.emit("typing", userAddress);
    console.log('emiting typing')

  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    //@ts-ignore
    socketRef.current.emit("typing", "stop");
  };


  const handleSendMessage = () => {
    cancelTyping();
    sendTOAPI();
    scrollToBottom();
    setInputMessage("");
  };



  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  useEffect(() => {

    window.onbeforeunload = function () {
      stopTypingMessage();
    };
  })


  useEffect(() => {
    let usersOnline: any = [];
    messages.map((m: any) => (
      usersOnline.includes(m.username.toUpperCase()) ? console.log('already in array')
        : usersOnline.push(m.username.toUpperCase())

    ));
    setPeopleOnline(usersOnline.length);
    console.log(usersOnline);
  }, [messages])


  return (
    <GlobalChatSection>
      <>
        <Box
          style={{
            // display: 'grid',
            // gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))',
            // gridColumnGap: '10px',
            // gridRowGap: '10px',
            width: "85%",
            maxWidth: "1300px",
            minWidth: "1100px",

            padding: "40px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Betting />
          <ChatBox style={{ position: "relative" }}>
            <ChatTopdiv style={{position:'relative'}}>
              <div style={{ textAlign: "left" }}>
                {" "}
                <h3 style={{ fontSize: "14px" }}>GLOBAL CHAT</h3>
                <h5 style={{ fontSize: "11px", color: "#18DEAE" }}>
                  {PeopleOnline} PLAYING
                </h5>
              </div>{" "}
              <img src={warning} alt="" style={{ cursor: 'pointer' }} onMouseOver={() => setShowWarning(true)}
                onMouseOut={() => setShowWarning(false)} />
              {ShowWarning && (
                <Warningcont></Warningcont>
              )}
            </ChatTopdiv>
            <ChatMiddlediv>
              {renderChat()}
              {userTyping && userTypingAddress !== userAddress ? (
                <TypingDiv>
                  <OthersMsgIcon src={ChatProfile} alt="" />
                  <OtherMsgAddress>{formatAddress(userTypingAddress)}<br /> is typing..</OtherMsgAddress>
                </TypingDiv>

                // <Messagediv>
                //   <OthersMsgIcon src={ChatProfile} alt="" /> 
                //   <OtherMsgAddress>Typing..</OtherMsgAddress>
                // </Messagediv>
              ) : (
                ""
              )}
              <div ref={messagesEndRef} />
            </ChatMiddlediv>
            <InputParent>
              <Input
                onChange={handleInputMessage}
                onKeyDown={startTyping}
                onKeyPress={handleKeyDown}
                onKeyUp={stopTyping}
                value={inputMessage}
                //@ts-ignore
                ref={inputRef}
                style={{ width: "100%", height: "100%" }}
                type="text"
                placeholder="Type message..."
              />
              <EmojiButton onClick={handleShowEmojis}></EmojiButton>
              {
                <Emojisdiv style={{ display: `${showEmojis}` }}>
                  <Emojis pickEmoji={pickEmoji} />
                </Emojisdiv>
              }
              <Button
                onClick={handleSendMessage}
              ></Button>
            </InputParent>
          </ChatBox>
          <LastRolls />
          <Box
            style={{
              width: "45%",
              marginTop: "30px",
              maxWidth: "700plax",
              height: "400px",
              padding: "20px",
            }}
          >
            <BoxTitle>House Pool Size 24 H</BoxTitle>
            {!hoverLiquidityChartValue &&
              !hoverLiquidityChartDate &&
              liquidityChartData.length ? (
              <>
                <HousePoolChartLabel>
                  $
                  {parseFloat(
                    liquidityChartData[liquidityChartData.length - 1].liquidity
                  ).toFixed(5)}
                </HousePoolChartLabel>
                <HousePoolChartLabel
                  style={{
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {dateFromTimestamp(
                    liquidityChartData[liquidityChartData.length - 1].created_at
                  )}
                </HousePoolChartLabel>
              </>
            ) : !liquidityChartData.length ? null : hoverLiquidityChartDate ? (
              <>
                <>
                  <HousePoolChartLabel>
                    ${parseFloat(hoverLiquidityChartValue).toFixed(5)}
                  </HousePoolChartLabel>
                  <HousePoolChartLabel
                    style={{
                      paddingLeft: "10px",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {dateFromTimestamp(hoverLiquidityChartDate)}
                  </HousePoolChartLabel>{" "}
                </>
              </>
            ) : null}

            <div style={{ width: "100%", height: "300px" }}>
              <BarChart
                chartData={liquidityChartData}
                setHoverValue={setHoverLiquidityChartValue}
                setHoverDate={setHoverLiquidityChartDate}
              />
            </div>
          </Box>
          {/* </div> */}
          {/* <div style={{display:"flex",width: '100%'}}>
                        <Box style={{width: '100%',minHeight: "50vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
                            <BarChart chartData={[{created_at:19,volume_24:987},{created_at:20,volume_24:387},{created_at:21,volume_24:687}]} setHoverValue={() => {}} setHoverDate={() => {}} />
                        </Box>
                    </div> */}
          {/* <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))',
                    gridColumnGap: '10px',
                    gridRowGap: '10px',
                }}>
                    <div style={{display:"flex",width: '100%'}}>
                        <Box style={{width: '100%',minHeight: "50vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
                            <BarChart chartData={[{created_at:19,volume_24:987},{created_at:20,volume_24:387},{created_at:21,volume_24:687}]} setHoverValue={() => {}} setHoverDate={() => {}} />
                        </Box>
                    </div>
                    <div style={{display:"flex",width: '100%'}}>
                        <Box style={{width: '100%',minHeight: "50vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
                            <BarChart chartData={[{created_at:19,volume_24:987},{created_at:20,volume_24:387},{created_at:21,volume_24:687}]} setHoverValue={() => {}} setHoverDate={() => {}} />
                        </Box>
                    </div>
                </div> */}
        </Box>

        {/* //////////////// */}
        <PopupModal
          style={{
            display: toggleModal ? "block" : "none",
          }}
        >
          <div>
            <div>
              <input
                type="submit"
                value="Metamask"
                className="popup-button"
                onClick={() => {
                  connectWallet();
                  setToggleModal(false);
                }}
              />
            </div>
          </div>

          <input
            onClick={() => setToggleModal(false)}
            className="close"
            type="button"
            value="Close"
          />
        </PopupModal>
        <Alertmsg
          show={AlertModalState}
          toggleModal={() => Closealert()}
          alertText={AlertModaltext}
        />
      </>
    </GlobalChatSection>
  );
};

export default LiveChat;