import React from 'react';
import { LiveChatCont, ChatTopDiv, ChatHeaderLeft, ChatMiddleDiv, ChatInputParent, SendButton, Input, EmojiButton } from './styleNew';
import threeDot from "assets/images/threedot.svg";


const LiveChatNew = () => {
    return (
        <LiveChatCont>
            <ChatTopDiv>
                <ChatHeaderLeft>
                    <h1>Global chat</h1>
                    <h5>28 PLAYING</h5>
                </ChatHeaderLeft>
                <img src={threeDot} alt="" />
            </ChatTopDiv>
            <ChatMiddleDiv>
                body
            </ChatMiddleDiv>
            <ChatInputParent>
                {/* input */}
                <EmojiButton />
                <Input
                    type="text"
                    placeholder="Type message..."

                />
                <SendButton />
            </ChatInputParent>

        </LiveChatCont>
    );
};

export default LiveChatNew;