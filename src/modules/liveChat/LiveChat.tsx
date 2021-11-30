import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import Betting from '../betting';
import LastRolls from 'modules/LastRolls/LastRolls';
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
    HousePoolChartLabel


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
    const [liquidityChartData, setLiquidityChartData] = useState<any>([])
    const [hoverLiquidityChartValue, setHoverLiquidityChartValue] = React.useState<any>("")
    const [hoverLiquidityChartDate, setHoverLiquidityChartDate] = React.useState<any>("")

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
                    <LastRolls />
                    <Box style={{ width: '45%', marginTop: '30px', maxWidth: '700plax', height: '400px', padding: "20px" }}>
                        <BoxTitle>House Pool Size 24 H</BoxTitle>
                        {
                            !hoverLiquidityChartValue && !hoverLiquidityChartDate && liquidityChartData.length ? 
                            <>
                            <HousePoolChartLabel>${parseFloat(liquidityChartData[liquidityChartData.length-1].liquidity).toFixed(1)}
                            </HousePoolChartLabel>
                            <HousePoolChartLabel style={{paddingLeft:"10px",fontSize:"16px",fontWeight:600}}>{dateFromTimestamp(liquidityChartData[liquidityChartData.length-1].created_at)}</HousePoolChartLabel>
                            </>
                            : !liquidityChartData.length ?
                            null
                            : hoverLiquidityChartDate ?
                            <>
                              <><HousePoolChartLabel>${parseFloat(hoverLiquidityChartValue).toFixed(1)}</HousePoolChartLabel> 
                              <HousePoolChartLabel style={{paddingLeft:"10px",fontSize:"16px",fontWeight:600}}>{dateFromTimestamp(hoverLiquidityChartDate)}</HousePoolChartLabel> </>
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