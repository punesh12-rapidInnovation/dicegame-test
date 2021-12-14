import React, { useState, useEffect, createRef } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import Betting from '../betting';
import LastRolls from 'modules/LastRolls/LastRolls';
import Emojis from './EmojiComponent/Emojis';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import ChatProfile from '../../assets/icons/ChatProfileIcon.svg';

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
    Betbox,
    Bettop,
    Betmiddle,
    Betbottom,
    Rolldice,
    H2,
    Flexcolumn,
    Flex,
    H1,
    Chance,
    Range,
    Transchance,
    OwnMsg,
    BoxTitle,
    HousePoolChartLabel,
    EmojiButton,
    Emojisdiv,
    OthersMsgIcon,
    OtherMsgAddress,
    Time
} from './style'
import threedot from '../../assets/images/threedot.svg';
import historyicon from '../../assets/icons/history.svg';
import { useSelector } from 'react-redux';
import BarChart from 'modules/app/components/barChart/BarChart';
import { dateFromTimestamp } from 'utils/helper';


const LiveChat = (props: any) => {
    const inputRef = createRef<HTMLInputElement>();
    const messagesEndRef = createRef<HTMLDivElement>();
    const { connectWallet, setToggleModal, toggleModal } = props
    const { userAddress } = useSelector((state: any) => state.wallet);
    const [showEmojis, setshowEmojis] = useState("none");
    const [cursorPosition, setcursorPosition] = useState();
    const [messages, setMessages] = useState<any>([])
    const [inputMessage, setInputMessage] = useState('')
    const [liquidityChartData, setLiquidityChartData] = useState<any>([])
    const [hoverLiquidityChartValue, setHoverLiquidityChartValue] = React.useState<any>("")
    const [hoverLiquidityChartDate, setHoverLiquidityChartDate] = React.useState<any>("")
    const [userTyping, setUserTyping] = useState(false)

    const BASE_URL = 'https://diceroll.rapidinnovation.tech/api/message'
    const socket = io('wss://diceroll.rapidinnovation.tech');

    useEffect(() => {
        try {
            socket.on('connection', () => {
                // Replace event name with connection event name
                console.log('websocket connected');
            });
            // socket.emit('message');
            socket.on('message', (data) => {
                console.log('data', data);
                const updatedData = [...messages, data]
                setMessages(updatedData)
            });
            socket.on('typing', data => {
                console.log('typingdata', data);
                if (data === "stop")
                    setUserTyping(false);
                else
                    setUserTyping(true);
            });
        } catch (err) {
            console.log('err', err);
        }
        return () => {
            socket.disconnect();
        };
    }, [messages]);
    //@ts-ignore
    const pickEmoji = (e: any, { emoji }) => {
        console.log(e.target)
        const ref: any = inputRef.current;
        ref.focus();
        const start = inputMessage.substring(0, ref.selectionStart);
        const end = inputMessage.substring(ref.selectionStart);
        const text = start + emoji + end;
        console.log(e.target);
        setInputMessage(text);
        setcursorPosition(start.length + emoji.lenght);
    }

    const handleShowEmojis = () => {

        if (showEmojis === 'flex') {
            setshowEmojis("none")
        } else {
            //@ts-ignore
            inputRef.current.focus();
            setshowEmojis('flex')
        }
    }

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: "https://diceroll.rapidinnovation.tech/pool",
        });
        const getdata = async () => {
            const res = await axiosInstance.get('/allLiquidity')
            console.log("dataaaa", res);
            setLiquidityChartData(res.data);
        } //
        getdata();
    }, [])

    const sendTOAPI = async () => {
        setUserTyping(false)

        console.log('time', new Date().toISOString()
        );

        const walletConnectOrNot = localStorage.getItem("walletConnected");
        if (inputMessage.trim() === "" || walletConnectOrNot !== 'true') {
            if (walletConnectOrNot !== 'true') {
                window.alert('connectWallettoSendMessage');
            }
            return;
        }
        const data: any =
        {
            'username': userAddress,
            'content': inputMessage,
            'time': new Date().toISOString()
        };

        try {
            const config: any = {
                method: 'post',
                url: BASE_URL,
                data: data
            }
            axios(config)
                .then(function (res) {
                    console.log('response', res);
                })
                .catch(function (err) {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
        finally {
            setInputMessage('')
            setshowEmojis('none')
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendTOAPI();
        }
    }

    const handleInputMessage = (e: any) => {
        const { value } = e.target
        setInputMessage(value)
    }

    const renderChat = () => {
        var today = new Date();
        return messages.map((m: any, index: any) => (
            m.username === userAddress ?
                <OwnMsg key={index}>
                    {m.content}
                    <Time>{m.time.substring(11,16)}</Time>
                </OwnMsg>
                :
                <Messagediv key={index}>
                    <OthersMsgIcon src={ChatProfile} alt="" />
                    <OtherMsgAddress>{m.username.substring(0, 10)}...</OtherMsgAddress>
                    {m.content}
                    <Time>{m.time.substring(11,16)}</Time>
                </Messagediv>


        ))
    }
    const scrollToBottom = () => {
        //@ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        console.log(messagesEndRef.current)
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        //@ts-ignore
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition])

    const handleKeyPress = (e: any) => {
        socket.emit('typing', userAddress)
        //@ts-ignore
        // socket.broadcast.to('typing', userAddress)

    }

    const handleKeyUp = (e: any) => {
        socket.emit('typing', 'stop')
        //@ts-ignore
        // socket.broadcast.to('typing', 'stop')
    }
    return (
        <GlobalChatSection>
            <>
                <Box style={{
                    // display: 'grid',
                    // gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))',
                    // gridColumnGap: '10px',
                    // gridRowGap: '10px',
                    width: '85%',
                    maxWidth: '1300px',
                    minWidth: '1100px',

                    padding: "40px 10px",
                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'
                }}>

                    <Betting />
                    <ChatBox style={{ position: 'relative' }}>

                        <ChatTopdiv><div style={{ textAlign: 'left' }}> <h3 style={{ fontSize: '14px' }}>GLOBAL CHAT</h3>
                            <h5 style={{ fontSize: '11px', color: '#18DEAE' }}>28 PLAYING</h5></div> <img src={threedot} alt="" /></ChatTopdiv>
                        <ChatMiddlediv>
                            {renderChat()}
                            {
                                userTyping ?

                                    <Messagediv >
                                        <OthersMsgIcon src={ChatProfile} alt="" />
                                        <OtherMsgAddress>Typing..</OtherMsgAddress>
                                    </Messagediv>
                                    : ""}
                            <div ref={messagesEndRef} />
                        </ChatMiddlediv>
                        <InputParent>
                            <Input
                                onChange={handleInputMessage}
                                onKeyDown={handleKeyDown}
                                value={inputMessage}
                                //@ts-ignore
                                ref={inputRef}
                                onKeyPress={handleKeyPress}
                                onKeyUp={handleKeyUp}

                                style={{ width: '100%', height: '100%' }} type="text" placeholder="Type message..." />
                            <EmojiButton onClick={handleShowEmojis}></EmojiButton>
                            {
                                <Emojisdiv style={{ display: `${showEmojis}` }}>
                                    <Emojis pickEmoji={pickEmoji} />

                                </Emojisdiv>
                            }
                            <Button
                                onClick={() => { sendTOAPI() }}
                                disabled={userAddress === '' || userAddress === null || inputMessage === ''}

                            >
                            </Button>
                        </InputParent>
                    </ChatBox>
                    <LastRolls />
                    <Box style={{ width: '45%', marginTop: '30px', maxWidth: '700plax', height: '400px', padding: "20px" }}>
                        <BoxTitle>House Pool Size 24 H</BoxTitle>
                        {
                            !hoverLiquidityChartValue && !hoverLiquidityChartDate && liquidityChartData.length ?
                                <>
                                    <HousePoolChartLabel>${parseFloat(liquidityChartData[liquidityChartData.length - 1].liquidity).toFixed(5)}
                                    </HousePoolChartLabel>
                                    <HousePoolChartLabel style={{ paddingLeft: "10px", fontSize: "16px", fontWeight: 600 }}>{dateFromTimestamp(liquidityChartData[liquidityChartData.length - 1].created_at)}</HousePoolChartLabel>
                                </>
                                : !liquidityChartData.length ?
                                    null
                                    : hoverLiquidityChartDate ?
                                        <>
                                            <><HousePoolChartLabel>${parseFloat(hoverLiquidityChartValue).toFixed(5)}</HousePoolChartLabel>
                                                <HousePoolChartLabel style={{ paddingLeft: "10px", fontSize: "16px", fontWeight: 600 }}>{dateFromTimestamp(hoverLiquidityChartDate)}</HousePoolChartLabel> </>
                                        </>
                                        : null
                        }



                        <div style={{ width: '100%', height: "300px" }}>
                            <BarChart chartData={liquidityChartData} setHoverValue={setHoverLiquidityChartValue} setHoverDate={setHoverLiquidityChartDate} />
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
                        display: toggleModal ? "block" : "none"
                    }}
                >
                    <div>
                        <div>
                            <input type="submit"
                                value="Metamask"
                                className="popup-button"
                                onClick={() => { connectWallet(); setToggleModal(false) }}
                            />
                        </div>
                    </div>

                    <input
                        onClick={() => setToggleModal(false)}
                        className="close"
                        type="button" value="Close"

                    />
                </PopupModal>
            </>
        </GlobalChatSection >
    )
};

export default LiveChat;