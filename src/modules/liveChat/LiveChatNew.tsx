import React,{useContext,useState,createRef,useEffect,useCallback} from 'react';
import { LiveChatCont, ChatTopDiv, ChatHeaderLeft, ChatMiddleDiv, ChatInputParent,OwnMsg, SendButton, Input, EmojiButton,Emojisdiv,Button  } from './styleNew';
import threeDot from "assets/images/threedot.svg";
import { SocketContext } from 'modules/app/context/socket';
import { useSelector } from "react-redux";
import useOutsideClick from './hooks/useOutsideClick';
import useTyping from './hooks/useTyping';
import axios from 'axios';
import {  Time, Messagediv, OtherMsgAddress, Report, OthersMsgIcon,MobWarningcont,TypingDiv} from './style';
import ChatProfile from "../../assets/icons/ChatProfileIcon.svg";
import ReportIcon from "assets/icons/reportIcon.svg";
import warning from '../../assets/icons/warning.svg';
import { formatAddress } from 'utils/helper';
import Emojis from "./EmojiComponent/Emojis";
import 'emoji-mart/css/emoji-mart.css';
import Alertmsg from 'modules/betting/modals/Alertmsg';
//@ts-ignore
import { Picker } from 'emoji-mart';
const LiveChatNew = () => {
    const { userAddress } = useSelector((state: any) => state.wallet);
    const { socket, liveMessages, setLiveMessages, userTyping, setUserTyping, userTypingAddress } =
        useContext(SocketContext);
    
  const inputRef = createRef<HTMLInputElement>();
  const messagesEndRef = createRef<HTMLDivElement>();
  const [showEmojis, setshowEmojis] = useState("none");
  const [cursorPosition, setcursorPosition] = useState();
  const [inputMessage, setInputMessage] = useState("");
  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertModaltext, setAlertModaltext] = useState("");
  const [UserBlockedOrNot, setUserBlockedOrNot] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<any>([]);
  const [PeopleOnline, setPeopleOnline] = useState<number>(0);
  const [showWarning, setshowWarning] = useState<Boolean>(false);

  const { showEmoji, setShowEmoji, ref,inputref } = useOutsideClick(false)


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
        const axiosInstance = axios.create({
          baseURL: "https://diceroll.rapidinnovation.tech/pool",
        });

        await axiosInstance.get(`/allBlockUser/${address}`).then(function (response) {
          //@ts-ignore
          const counter = response.data.result?.counter;
          if (counter > 10) {
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
    


  const renderChat = useCallback(() => {
    return liveMessages.map((m: any, index: any) =>
      m.username === userAddress ? (
        <OwnMsg key={index}>
          {m.content}
          <Time>{m.time.substring(11, 16)}</Time>
        </OwnMsg>
      ) : (
        <Messagediv key={index} style={{maxWidth:'300px'}}>
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
    
    //@ts-ignore
  // const pickEmoji = (e: any, { emoji }) => {
  //   console.log(e.target);
  //   const ref: any = inputRef.current;
  //   ref.focus();
  //   const start = inputMessage.substring(0, ref.selectionStart);
  //   const end = inputMessage.substring(ref.selectionStart);
  //   const text = start + emoji + end;
  //   console.log(e.target);
  //   setInputMessage(text);
  //   setcursorPosition(start.length + emoji.length);
  // };

  const handleShowEmojis = () => {
    if (showEmojis === "flex") {
      setshowEmojis("none");
    } else {
      //@ts-ignore
      inputRef.current.focus();
      setshowEmojis("flex");
    }
  };

    

    return (
        <LiveChatCont>
            <ChatTopDiv>
                <ChatHeaderLeft>
                    <h1>Global chat</h1>
                    <h5>{PeopleOnline}  Chatting</h5>
                </ChatHeaderLeft>
                <img src={warning} alt=""  width='30px' onMouseOver={() => setshowWarning(true)}
                onMouseOut={() => setshowWarning(false)} style={{ cursor: 'pointer' }} />
              {
                showWarning ? <MobWarningcont></MobWarningcont> : ''
              }
            </ChatTopDiv>
            <ChatMiddleDiv >
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
            </ChatMiddleDiv>
            <ChatInputParent>
                <EmojiButton style={{ width: '20px', height: '20px' }} onClick={handleEmojiShow}></EmojiButton>
                {
                showEmoji && (
                  <Emojisdiv ref={ref}>
                    <Picker
                      onSelect={handleEmojiSelect}
                      title='Pick your emoji…' emoji='point_up'
                  emojiSize={20}
                  style={{width:'300px'}}
                    />
                  </Emojisdiv>
                )
              }
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
                //@ts-ignore
                onClick={() => console.log(ref)}
              />

              <Button onClick={handleSendMessage}></Button>
            </ChatInputParent>

             <Alertmsg
          show={AlertModalState}
          toggleModal={() => setAlertModalState(false)}
          alertText={AlertModaltext}
        />

        </LiveChatCont>
    );
};

export default LiveChatNew;
