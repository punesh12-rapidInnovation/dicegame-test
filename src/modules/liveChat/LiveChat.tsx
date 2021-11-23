import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import Betting from '../betting';
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
    BoxTitle


} from './style'
import threedot from '../../assets/images/threedot.svg';
import historyicon from '../../assets/icons/history.svg';
import { useSelector } from 'react-redux';
import BarChart from 'modules/app/components/barChart/BarChart';
import { dateFromTimestamp } from 'utils/helper';


const LiveChat = (props: any) => {
    const { connectWallet, setToggleModal, toggleModal } = props
    const { userAddress } = useSelector((state: any) => state.wallet);


    const [messages, setMessages] = useState<any>([])
    const [inputMessage, setInputMessage] = useState('')
    const [hoverVolumeChartValue, setHoverVolumeChartValue] = React.useState<any>("")
    const [hoverVolumeChartDate, setHoverVolumeChartDate] = React.useState<any>("")

    const BASE_URL = 'https://diceroll.rapidinnovation.tech/api/message'

    useEffect(() => {
        const socket = io('wss://diceroll.rapidinnovation.tech');
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
        } catch (err) {
            console.log('err', err);
        }
        return () => {
            socket.disconnect();
        };
    }, [messages]);

    const sendTOAPI = async () => {
        const data: any =
        {
            'username': userAddress,
            'content': inputMessage
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
        }
    }

    const handleInputMessage = (e: any) => {
        const { value } = e.target
        setInputMessage(value)
    }

    const renderChat = () => {
        return messages.map((m: any, index: any) => (
            m.username === userAddress ?
                <OwnMsg key={index}
                >
                    <h1 style={{ fontSize: '11px' }}>
                        {m.content}
                    </h1>
                </OwnMsg>
                :
                <Messagediv key={index}>
                    <h1 style={{ fontSize: '11px' }}>
                        {m.content}
                    </h1>
                </Messagediv>
        ))
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
                        </ChatMiddlediv>
                        <InputParent>
                            <Input
                                onChange={handleInputMessage}
                                value={inputMessage}
                                style={{ width: '100%', height: '100%' }} type="text" placeholder="Type message..." />
                            <Button
                                onClick={() => { sendTOAPI() }}
                                disabled={userAddress === '' || userAddress === null || inputMessage === ''}

                            >
                            </Button>
                        </InputParent>
                    </ChatBox>
                    {/* <div style={{display:"flex",width: '100%'}}> */}
                    <Box style={{ width: '45%', maxWidth: '700px', height: '350px', marginRight: '20px', marginTop: '30px', padding: "20px", background: "#2A1966" }}>
                        <BoxTitle>Your LAST 4 rolls</BoxTitle>
                        <div style={{ width: '100%', boxShadow: "inset 0px 0px 24px #ca1ae733", borderRadius: "20px", color: "#fff", padding: "20px" }}>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td># Date & time</td>
                                    <td>Bet Amount</td>
                                    <td>Min Chance</td>
                                    <td>Gain/Loss</td>
                                </tr>
                                <tr>
                                    <td>#1 - 23|Oct|2022 - 19:11</td>
                                    <td>23.36 PLS</td>
                                    <td>26%</td>
                                    <td>40 PLS</td>
                                </tr>
                            </table>
                        </div>
                    </Box>
                    <Box style={{ width: '45%', marginTop: '30px', maxWidth: '700px', height: '350px', padding: "20px" }}>
                        <BoxTitle>House Pool Size 24 H</BoxTitle>
                        <div style={{ color: "#fff" }}>
                            <span>$ {hoverVolumeChartValue}</span> <span>{dateFromTimestamp(hoverVolumeChartDate)}</span>
                        </div>
                        <div style={{ width: '100%', height: "300px" }}>
                            <BarChart chartData={[{ created_at: 1637193614306, volume_24: 987 }, { created_at: 1637280014325, volume_24: 387 }, { created_at: 1637366414343, volume_24: 687 }]} setHoverValue={setHoverVolumeChartValue} setHoverDate={setHoverVolumeChartDate} />
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