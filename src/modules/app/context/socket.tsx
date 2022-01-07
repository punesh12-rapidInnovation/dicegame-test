import socketio from "socket.io-client";
import * as React from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "wss://diceroll.rapidinnovation.tech";
// const SOCKET_URL = "ws://localhost:4000";

//@ts-ignore
export const socket = socketio.connect(SOCKET_URL);
// export const socket = io(SOCKET_URL);

const BASE_URL = "https://diceroll.rapidinnovation.tech/api/message";

interface SocketContextInterface {
  socket: any;
  liveMessages: any[];
  setLiveMessages: React.Dispatch<React.SetStateAction<any[]>>;
  userTyping: boolean;
  setUserTyping: React.Dispatch<React.SetStateAction<boolean>>;
  userTypingAddress: string;
  setUserTypingAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const SocketContext = React.createContext({} as SocketContextInterface);

const SocketContextProvider = ({ children }: any) => {
  const [liveMessages, setLiveMessages] = React.useState<any[]>([]);
  const [userTyping, setUserTyping] = React.useState<boolean>(false);
  const [userTypingAddress, setUserTypingAddress] = React.useState<string>("");


  console.log(liveMessages);
  React.useEffect(() => {
    try {
      socket.on("connection", () => {
        // Replace event name with connection event name
        console.log("websocket connected");
      });
      //@ts-ignore
      socket.on("message", (data) => {
        // console.log("data context", data);
        // // setUserTyping(false);
        // let updatedMessages = liveMessages;
        // updatedMessages.push(data);
        // console.log(updatedMessages);

        setLiveMessages((liveMessages) => [...liveMessages,data]);
      });
      //@ts-ignore
      socket.on("typing", (data) => {
        console.log("typingdata", data);
        if (data === "stop") {
          setUserTyping(false);
          setUserTypingAddress("0");
        } else {
          setUserTyping(true);
          setUserTypingAddress(data);
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
