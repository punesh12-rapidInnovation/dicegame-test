import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import {
    GlobalChatSection,
    Box,
    ChatBox,
    ChatTopdiv,
    ChatMiddlediv,
    Input,
    Button,
    PopupModal,
    Ownmsg,
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
    Transchance


} from './style'
import threedot from '../../assets/images/threedot.svg';
import historyicon from '../../assets/icons/history.svg';


const LiveChat = (props: any) => {
    const { walletAddress, connectWallet, setToggleModal, toggleModal } = props

    const [messages, setMessages] = useState<any>([])
    const [inputMessage, setinputMessage] = useState('')
    const [Rangevalue, setRangevalue] = useState('')





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


    // useEffect(() => {
    //     window.addEventListener('keyup', (event) => {
    //         if (event.code === '13') {
    //             if (walletAddress !== '' && inputMessage !== '') {
    //                 sendTOAPI()
    //                 console.log('runnig');

    //             }
    //         }
    //     });
    // })

    const sendTOAPI = async () => {

        const data =
        {
            'username': walletAddress,
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
            setinputMessage('')
        }



    }

    const handleInputMessage = (e: any) => {
        const { value } = e.target
        setinputMessage(value)
    }

    const renderchat = () => {
        return messages.map((m: any, index: any) => (
            m.username === walletAddress ?
                <Ownmsg key={index}
                >
                    <h1 style={{ fontSize: '11px' }}>
                        {m.content}
                    </h1>
                </Ownmsg>
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
            <Box style={{ height: '75%', width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Betbox>
                    <Bettop><img src={historyicon} style={{ marginRight: '10px' }} /> YOUR LAST 10 ROLLS</Bettop>
                    <Betmiddle>
                        <Flexcolumn style={{ width: '100%' }}>
                            <H2 style={{ fontSize: '13px' }}>BET AMOUNT | AVL BL:963 PLS</H2>
                            <Flex style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
                                <Chance>5</Chance>
                                <Flex style={{ width: '75%', maxWidth: '300px' }}>
                                    <Transchance>MIN</Transchance>
                                    <Transchance>5</Transchance>
                                    <Transchance>6</Transchance>
                                    <Transchance>10</Transchance>

                                    <Transchance>MAX</Transchance>
                                </Flex>

                            </Flex>


                        </Flexcolumn>
                        <Flexcolumn style={{ width: '100%' }}>
                            <H2 style={{ marginBottom: '16px' }}>CHANCE OF WINNING</H2>
                            <Flex>

                                <Flexcolumn style={{ width: '30%' }}>

                                    <Chance style={{ marginBottom: '8px' }}>{Rangevalue}%</Chance>
                                    <H2 style={{ fontSize: '12px' }}>Min Chance</H2>
                                </Flexcolumn>
                                <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '70%' }}>
                                    <Range type="range" value={Rangevalue} onChange={(event) => setRangevalue(event.target.value)}></Range>
                                </Flex>

                            </Flex>

                        </Flexcolumn>
                        <Flex>
                            <H2 style={{ marginBottom: '6px' }}>ROLL UNDER </H2>
                            <H1 style={{ fontSize: '16px', marginBottom: '6px' }}>44</H1>

                        </Flex>
                        <Flex>
                            <H2 >Profit </H2>
                            <H1 style={{ fontSize: '16px' }}>+5.2551 PLS</H1>

                        </Flex>


                    </Betmiddle>
                    <Betbottom>
                        <Rolldice>Roll Dice</Rolldice>
                    </Betbottom>
                </Betbox>
                <ChatBox style={{ height: '80%', width: '45%', position: 'relative' }}>


                    <ChatTopdiv><div style={{ textAlign: 'left' }}> <h3 style={{ fontSize: '14px' }}>GLOBAL CHAT</h3>
                        <h5 style={{ fontSize: '11px', color: '#18DEAE' }}>28 playing</h5></div> <img src={threedot} alt="" /></ChatTopdiv>
                    <ChatMiddlediv>
                        {renderchat()}
                    </ChatMiddlediv>
                    <InputParent>
                        <Input
                            onChange={handleInputMessage}
                            value={inputMessage}
                            style={{ width: '100%', height: '100%' }} type="text" placeholder="Type message..." />
                        <Button
                            onClick={() => { sendTOAPI() }}
                            disabled={walletAddress === '' || inputMessage === ''}

                        >
                        </Button>
                    </InputParent>


                </ChatBox>
            </Box>

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
        </GlobalChatSection >
    )
};

export default LiveChat;