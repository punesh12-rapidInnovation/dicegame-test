import React, { useState, useEffect, createRef, useRef, useCallback, useContext } from "react";
import { useBeforeunload } from 'react-beforeunload';


import axios from "axios";
import Betting from "../betting";
import LastRolls from "modules/LastRolls/LastRolls";
import Emojis from "./EmojiComponent/Emojis";
import ChatProfile from "../../assets/icons/ChatProfileIcon.svg";
import Alertmsg from "modules/betting/modals/Alertmsg";
import useTyping from "./hooks/useTyping";
import warning from '../../assets/icons/warning.svg';
import warningtext from '../../assets/icons/warningtext.png';
import 'emoji-mart/css/emoji-mart.css';
//@ts-ignore
import { Picker } from 'emoji-mart';
import useOutsideClick from "./hooks/useOutsideClick";

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
  Warningcont,
} from "./style";
import threedot from "assets/images/threedot.svg";
import ReportIcon from "assets/icons/reportIcon.svg";

import { useSelector } from "react-redux";
import BarChart from "modules/app/components/barChart/BarChart";
import { SocketContext } from "modules/app/context/socket";
import { dateFromTimestamp, formatAddress } from "utils/helper";
import axiosInstance from "utils/axios";

const LiveChat = (props: any) => {
  const { userAddress } = useSelector((state: any) => state.wallet);

  const { socket, liveMessages, setLiveMessages, userTyping, setUserTyping, userTypingAddress } =
    useContext(SocketContext);

  const inputRef = createRef<HTMLInputElement>();
  const messagesEndRef = createRef<HTMLDivElement>();
  const { connectWallet, setToggleModal, toggleModal } = props;
  const [showEmojis, setshowEmojis] = useState("none");
  const [cursorPosition, setcursorPosition] = useState();
  const [inputMessage, setInputMessage] = useState("");
  const [liquidityChartData, setLiquidityChartData] = useState<any>([]);
  const [hoverLiquidityChartValue, setHoverLiquidityChartValue] = React.useState<any>("");
  const [hoverLiquidityChartDate, setHoverLiquidityChartDate] = React.useState<any>("");
  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertModaltext, setAlertModaltext] = useState("");
  const [UserBlockedOrNot, setUserBlockedOrNot] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<any>([]);
  const [PeopleOnline, setPeopleOnline] = useState<number>(0);
  const [showWarning, setshowWarning] = useState<Boolean>(false);

  const { showEmoji, setShowEmoji, ref } = useOutsideClick(false)

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();


  const handleEmojiShow = () => { setShowEmoji((v: any) => !v) }
  const handleEmojiSelect = (e: any) => {
    setInputMessage((InputMessage) => (InputMessage += e.native))
  }
  const handleNewMessageChange = (e: any) => { setInputMessage(e.target.value) };

  useEffect(() => {
    setUserTyping(false);
  }, [liveMessages]);

  //@ts-ignore
  const address = JSON.parse(localStorage.getItem("address"));

  useEffect(() => {
    const getBlockStatus = async () => {
      //@ts-ignore
      const address = JSON.parse(localStorage.getItem("address"));
      if (address !== null) {


        await axiosInstance.get(`/allBlockUser/${address}`).then(function (response) {
          //@ts-ignore
          const counter = response.data.result?.counter;
          if (counter > 4) {
            setUserBlockedOrNot(true);
            console.log(UserBlockedOrNot);
            console.log(counter);
          } else {
            console.log(UserBlockedOrNot);
            console.log(counter);
          }
        });
      }
    };

    getBlockStatus();
  }, [address]);

  useEffect(() => {

    const getdata = async () => {
      const res = await axiosInstance.get("/allLiquidity");
      setLiquidityChartData(res.data);
    }; //
    getdata();
  }, []);

  const sendTOAPI = (msg: string) => {
    if (UserBlockedOrNot) {
      console.log(UserBlockedOrNot);
      setAlertModaltext("You Have Been Blocked From Global Chat");
      setAlertModalState(true);
      return;
    } else {
      setUserTyping(false);
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);

      const walletConnectOrNot = localStorage.getItem("walletConnected");
      if (msg.trim() === "" || walletConnectOrNot !== "true") {
        if (walletConnectOrNot !== "true") {
          setAlertModaltext("Connect Wallet to Send Message To Global Chat");
          setAlertModalState(true);
        }
        return;
      }

      const data: any = {
        username: userAddress,
        content: msg,
        time: localISOTime,
      };
      setInputMessage("");

      try {
        console.log("send api ", data);

        //@ts-ignore
        socket.emit("message", data);

        let updatedMessages = liveMessages;
        updatedMessages.push(data);

        setLiveMessages([...updatedMessages]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const renderChat = useCallback(() => {
    return liveMessages.map((m: any, index: any) =>
      m.username === userAddress ? (
        <OwnMsg key={index}>
          {m.content}
          <Time>{m.time.substring(11, 16)}</Time>
        </OwnMsg>
      ) : (
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
    );
  }, [liveMessages]);

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
  }, [userTyping, liveMessages]);

  useEffect(() => {
    //@ts-ignore
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const startTypingMessage = () => {
    if (!socket || UserBlockedOrNot) return;
    if (userAddress == undefined) return;
    //@ts-ignore
    console.log(userAddress)
    socket.emit("typing", userAddress);
    console.log("start typing");
  };

  const stopTypingMessage = () => {
    if (!socket) return;
    //@ts-ignore
    socket.emit("typing", "stop");
    console.log("stop typing");
  };

  const handleSendMessage = () => {
    cancelTyping();
    sendTOAPI(inputMessage);
    setInputMessage("");
  };

  useEffect(() => {
    if (isTyping || showEmoji) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping, showEmoji]);

  useEffect(() => {
    let usersOnline: any = [];
    liveMessages.map((m: any) => {
      if (!usersOnline.includes(m.username.toUpperCase())) {
        usersOnline.push(m.username.toUpperCase());
      }
    });
    setPeopleOnline(usersOnline.length);
    console.log(usersOnline);
  }, [liveMessages]);

  //#region Report
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
        console.log("already reported");
      }
    });

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

      await axiosInstance
        .post("/blockUser", {
          publicAddress: address,
        })
        .then(function (response) {
          console.log(response.status);
          if (response.status === 200) {
            setAlertModaltext("You have reported this user successfully we will take a look into it");
            setAlertModalState(true);
            if (localStorage.getItem("ReportedUsers") === null) {
              localStorage.setItem("ReportedUsers", JSON.stringify([address]));
            } else {
              const Reportedtillnow = JSON.parse(localStorage.getItem("ReportedUsers") || "[]");
              Reportedtillnow.unshift(address);
              localStorage.setItem("ReportedUsers", JSON.stringify(Reportedtillnow));
            }
          }
        });
    } else {
      setAlertModaltext("Global Chat Access Blocked");
      setAlertModalState(true);
    }
  };
  //#endregion

  //#region Emoji
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
  //#endregion

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
            // minWidth: "1100px",

            padding: "40px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Betting />
          <ChatBox style={{ position: "relative" }}>
            <ChatTopdiv >
              <div style={{ textAlign: "left" }}>
                {" "}
                <h3 style={{ fontSize: "14px" }}>GLOBAL CHAT</h3>
                <h5 style={{ fontSize: "11px", color: "#18DEAE" }}>{PeopleOnline} PLAYING</h5>
              </div>{" "}
              <img src={warning} alt="" onMouseOver={() => setshowWarning(true)}
                onMouseOut={() => setshowWarning(false)} style={{ cursor: 'pointer' }} />
              {
                showWarning ? <Warningcont></Warningcont> : ''
              }
            </ChatTopdiv>
            <ChatMiddlediv>
              {renderChat()}
              {userTyping ? (
                <TypingDiv>
                  <OthersMsgIcon src={ChatProfile} alt="" />
                  <OtherMsgAddress>
                    {formatAddress(userTypingAddress)}
                    <br /> is typing..
                  </OtherMsgAddress>
                </TypingDiv>
              ) : (
                // <Messagediv>
                //   <OthersMsgIcon src={ChatProfile} alt="" />
                //   <OtherMsgAddress>Typing..</OtherMsgAddress>
                // </Messagediv>
                ""
              )}
              <div ref={messagesEndRef} />
            </ChatMiddlediv>
            <InputParent>
              <Input
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={startTyping}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                onKeyUp={stopTyping}
                value={inputMessage}
                //@ts-ignore
                ref={inputRef}
                style={{ width: "100%", height: "100%" }}
                type="text"
                placeholder="Type message..."
              />
              <EmojiButton onClick={handleEmojiShow}></EmojiButton>
              {
                showEmoji && (
                  <Emojisdiv ref={ref}>
                    <Picker
                      onSelect={handleEmojiSelect}
                      title='Pick your emoji…' emoji='point_up'
                      emojiSize={20}
                    />
                  </Emojisdiv>
                )
              }
              <Button onClick={handleSendMessage}></Button>
            </InputParent>
          </ChatBox>
          <LastRolls />
          <Box
            style={{
              width: "45%",
              marginTop: "30px",
              maxWidth: "700px",
              height: "400px",
              padding: "20px",
            }}
          >
            <BoxTitle>House Pool Size 24 H</BoxTitle>
            {!hoverLiquidityChartValue && !hoverLiquidityChartDate && liquidityChartData.length ? (
              <>
                <HousePoolChartLabel>
                  ${parseFloat(liquidityChartData[liquidityChartData.length - 1].liquidity).toFixed(5)}
                </HousePoolChartLabel>
                <HousePoolChartLabel
                  style={{
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {dateFromTimestamp(liquidityChartData[liquidityChartData.length - 1].created_at)}
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

            <div style={{ width: "100%", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {liquidityChartData && liquidityChartData.length ?
                <BarChart chartData={liquidityChartData} setHoverValue={setHoverLiquidityChartValue} setHoverDate={setHoverLiquidityChartDate} />
                : <p style={{ opacity: '0.5', color: "white" }}>No data available</p>

              }
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

          <input onClick={() => setToggleModal(false)} className="close" type="button" value="Close" />
        </PopupModal>
        <Alertmsg
          show={AlertModalState}
          toggleModal={() => setAlertModalState(false)}
          alertText={AlertModaltext}
        />
      </>
    </GlobalChatSection>
  );
};

export default LiveChat;

// const StoppedTyping: ReturnType<any> = () => {
//   setTimeout(() => {
//     setUserTyping(false);
//     setUserTypingAddress("0");
//     console.log("setted false");
//   }, 8000);
// };

// const removeReportedUserMessages = (reportAddress: any) => {
//   let messageData: any = [];
//   messages.map((message: any, index: any) => {
//     if (message.username !== reportAddress) {
//       messageData = [...messageData, message];
//     }
//   });
//   setMessages(messageData);
// };

// const handleKeyPress = (e: any) => {
//   if (!socketRef.current || UserBlockedOrNot) return;
//   //@ts-ignore
//   socketRef.current.emit("typing", userAddress);
//   // socket.broadcast.emit('typing', userAddress);
// };
// const handleKeyUp = (e: any) => {
//   if (!socketRef.current) return;
//   //@ts-ignore
//   socketRef.current.emit("typing", "stop");
//   // socket.broadcast.emit('typing', 'stop');
// };