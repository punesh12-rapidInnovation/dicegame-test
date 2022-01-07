import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";
import sendimage from "../../assets/images/send-icon.svg";

import sendImage from "assets/images/send-icon.svg";
import smilingFace from "assets/images/smiling-face.svg";





export const LiveChatCont = styled.div`
background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.1) -6.9%,
    rgba(112, 7, 255, 0.1) 55.31%,
    rgba(0, 200, 255, 0.1) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  height: 580px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  position:relative;
`
export const ChatTopDiv = styled.div`
  display: flex;
  justify-content:space-between;
  width: 100%;
img{
    margin:0 40px;
}
`;
export const ChatHeaderLeft = styled.div`
color: ${colors.white};
margin:20px 40px;

h1{
    font-size:16px;
}
h5{
    color: ${colors.primary};
    margin-top:5px;
    font-size:12px;
}
`;

export const ChatMiddleDiv = styled.div`
 display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  justify-content: flex-start;
  padding: 0px 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  color:${colors.white};

  ::-webkit-scrollbar {
    display: none;
  }

 
`;
export const ChatInputParent = styled.div`
display: flex;
align-items:center;
background:red;
width:100%;
height:60px;
margin-bottom:-10px;
 
background: linear-gradient(90deg, rgba(239, 8, 150, 0.2) -6.9%, rgba(112, 7, 255, 0.2) 55.31%, rgba(0, 200, 255, 0.2) 107.28%);
box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
border-radius: 0px 0px 20px 20px;
`;

export const SendButton = styled.button`
  background-image: url(${sendImage});
  background-position: center;
  background-size: contain;
  cursor: pointer;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  border: none;
  margin:10px;
`;
export const EmojiButton = styled.button`
  background-image: url(${smilingFace});
  background-position: center;
  background-size: contain;
  background-color: transparent;
  cursor: pointer;
  border-radius: 12px;
  width: 25px;
  height: 25px;
  border: none;
  margin:10px;
`;

export const Emojisdiv = styled.div`
  position: absolute;
  left: 20px;
  bottom: 5%;
  @media (max-width: ${screenSizes.mediaS}px) {
    bottom:8%;
}
`;

export const Button = styled.button`
  background-image: url(${sendimage});
  background-position: center;
  background-size: contain;
  cursor: pointer;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  border: none;
  position: absolute;
  right: 12px;
  bottom: 2%;
`;

export const Input = styled.input`
flex-grow:1;
background-color: transparent;
outline:none;
border:none;
color:${colors.white};
font-size:14px;
padding-right:60px;

::placeholder {
    color:${colors.white};
}
`

export const OwnMsg = styled.div`
  background: linear-gradient(
    92.8deg,
    rgba(30, 232, 183, 0.8) 2.13%,
    rgba(172, 51, 191, 0.4) 102.29%
  );
  border-radius: 10px;
  border-bottom-right-radius: 0;
  padding: 15px;
  display: flex;
  font-size: 14px;
  max-width: 300px;
  margin: 10px 0;
  align-self: flex-end;
  text-align: left;
  word-break: break-word;
  min-width: 80px;
  position: relative;
  padding-bottom: 30px;
`;


