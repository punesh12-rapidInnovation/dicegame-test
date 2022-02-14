import * as React from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://pulseroll-subs.pulseluck.com";
// const SOCKET_URL = "ws://localhost:4000";

//@ts-ignore
export const socket = io(SOCKET_URL);


interface SocketContextInterface {
  socket: any;
  liveMessages: any[];
  setLiveMessages: React.Dispatch<React.SetStateAction<any[]>>;
  userTyping: boolean;
  setUserTyping: React.Dispatch<React.SetStateAction<boolean>>;
  userTypingAddress: string;
  setUserTypingAddress: React.Dispatch<React.SetStateAction<string>>;
  ResultObject: any;
  setResultObject: any;
}

export const SocketContext = React.createContext({} as SocketContextInterface);

const SocketContextProvider = ({ children }: any) => {
  const [liveMessages, setLiveMessages] = React.useState<any[]>([]);
  const [userTyping, setUserTyping] = React.useState<boolean>(false);
  const [userTypingAddress, setUserTypingAddress] = React.useState<string>("");
  const [ResultObject, setResultObject] = React.useState<any>();
  const [PlacingBetId, setPlacingBetId] = React.useState();


  console.log(liveMessages);
  React.useEffect(() => {
    try {
      socket.on("connection", () => {
        // Replace event name with connection event name
        console.log("websocket connected");
      });
      //@ts-ignore
      // socket.on("message", (data) => {
      //    console.log("data context", data);
      //   // // setUserTyping(false);
      //   // let updatedMessages = liveMessages;
      //   // updatedMessages.push(data);
      //   // console.log(updatedMessages);

      //   setLiveMessages((liveMessages) => [...liveMessages,data]);
      // });
      // //@ts-ignore
      // socket.on("typing", (data) => {
      //   console.log("typingdata", data);
      //   if (data === "stop") {
      //     setUserTyping(false);
      //     setUserTypingAddress("0");
      //   } else {
      //     setUserTyping(true);
      //     setUserTypingAddress(data);
      //   }
      // });

      socket.on("betevent", (data: any) => {
        console.log('data', data);
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

      socket.on("disconnect", () => {
        console.log("disconnected context");
      });
    } catch (err) {
      console.log("err", err);
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        liveMessages,
        setLiveMessages,
        setUserTyping,
        userTyping,
        setUserTypingAddress,
        userTypingAddress,
        ResultObject,
        setResultObject
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
