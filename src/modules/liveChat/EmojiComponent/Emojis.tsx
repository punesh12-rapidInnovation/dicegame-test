import React from 'react'
import PropTypes  from 'prop-types';
import { EmojiPickerContainer, Emojiscontainer } from './style'


interface FuncProps {
    pickEmoji(e: any, { emoji }: { emoji: any; }) : void;
}


const Emojis: React.FC<FuncProps> = ({pickEmoji}) => {
    return (
        <Emojiscontainer>
            {
                <EmojiPickerContainer onEmojiClick={pickEmoji} />
            }
        </Emojiscontainer>
        
    )
};




export default Emojis
