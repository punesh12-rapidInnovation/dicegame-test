import styled from "styled-components";
import Chatsection from "../../assets/images/Chatsection.png";
import sendimage from "../../assets/images/send-icon.svg";
import toolTip from "assets/icons/toolTip.png";
import smilingFace from "../../assets/images/smiling-face.svg";
import { colors } from "shared/styles/theme";
import warningtext from '../../assets/icons/warningtext.png';
import { screenSizes } from "shared/styles/theme";

export const Box = styled.div`
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.1) -6.9%,
    rgba(112, 7, 255, 0.1) 55.31%,
    rgba(0, 200, 255, 0.1) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
`;

export const BoxTitle = styled.div`
  color: #fff;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
`;

export const PopupModal = styled.button`
  height: 50vh;
  width: 50vh;
  background: lightgray;
  position: absolute;
  top: 20;
  left: 50;
  border-radius: 20px;
`;

export const Report = styled.div`

display:flex;
flex-direction: column;
justify-content: center;

  position: absolute;
  right: -60px;
  top: 50%;
  transform: translatey(-50%);
  cursor: pointer;

  img{
    height:18px;
    margin:5px 0;
  }
  p{
    font-size:8px;
  }
`;

export const ChatBox = styled.div`
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.1) -6.9%,
    rgba(112, 7, 255, 0.1) 55.31%,
    rgba(0, 200, 255, 0.1) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  display: relative;
  width: 45%;
  max-width: 700px;
  height: 580px;
  /*height: 85%;*/

  > * {
    color: white;
  }
`;

export const GlobalChatSection = styled.div`
  // background: rgba(0, 0, 0, 1);
  background:red;
  background-image: url(${Chatsection});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  */ * {
  }
`;

export const Input = styled.input`
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.2) -6.9%,
    rgba(112, 7, 255, 0.2) 55.31%,
    rgba(0, 200, 255, 0.2) 107.28%
  );
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5),
    inset 0px 0px 14px rgba(202, 26, 231, 0.6);
  border: none;
  padding-left: 50px;
  padding-right: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  ::placeholder {
    color: white;
  }
  :focus {
    outline: none;
  }
`;
export const ChatTopdiv = styled.div`
  display: flex;
  width: 100%;
  height: 16%;
  justify-content: space-between;
  align-items: center;
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 16px;
`;
export const ChatMiddlediv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  justify-content: flex-start;
  padding: 0px 20px;
  overflow-y: scroll;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Messagediv = styled.div`
  background: rgba(255, 255, 255, 0.23);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  font-size: 14px;
  max-width: 350px;
  border-top-left-radius: 0;
  margin: 10px 0;
  align-self: flex-start;
  text-align: left;
  word-break: break-word;
  position: relative;
  margin-left: 40px;
  margin-top: 30px;
  min-width: 100px;
  padding-bottom: 30px;
`;
export const TypingDiv = styled.div`
  border-radius: 10px;
  padding: 15px;
  display: flex;
  font-size: 14px;
  max-width: 500px;
  border-top-left-radius: 0;
  margin: 10px 0 0 0 ;
  align-self: flex-start;
  text-align: left;
  word-break: break-word;
  position: relative;
  margin-left: 40px;
  margin-top: 30px;
  min-width: 100px;
`;

export const Warningcont = styled.div`
background: url(${warningtext});
position:absolute;
top:3%;
right:12%;
z-index:10;
width:250px;
height:60px
`

export const MobWarningcont = styled.div`
background: url(${warningtext}) ;
Background-size:contain;
position:absolute;
top:2%;
right:12%;
z-index:10;
width:250px;
height:60px;
@media (max-width: 800px) {
top:2%;
right:18%;
}
`


export const OthersMsgIcon = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-40px, -20px);
`;
export const OtherMsgAddress = styled.h3`
  font-size: 11px;
  line-height: 13px;
  color: #00eaff;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(5px, -20px);
`;

export const Time = styled.h3`
  font-size: 10px;
  line-height: 13px;
  color: #fff;
  position: absolute;
  right: 18px;
  bottom: -10px;
  transform: translate(5px, -20px);
`;

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
  max-width: 400px;
  margin: 10px 0;
  align-self: flex-end;
  text-align: left;
  word-break: break-word;
  min-width: 80px;
  position: relative;
  padding-bottom: 30px;
`;

export const EmojiButton = styled.div`
  background-image: url(${smilingFace});
  background-position: center;
  background-size: contain;
  cursor: pointer;
  border-radius: 12px;
  width: 25px;
  height: 25px;
  border: none;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translatey(-50%);
`;
export const Emojisdiv = styled.div`
  position: absolute;
  left: 20px;
  top: 0%;
@media (max-width: ${screenSizes.mediaS}px) {
    margin:1rem;
    padding:2rem;
    transform: translatey(-800px);
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
  top: 50%;
  transform: translatey(-50%);
`;

export const InputParent = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
`;

export const Betbox = styled.div`
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.1) -6.9%,
    rgba(112, 7, 255, 0.1) 55.31%,
    rgba(0, 200, 255, 0.1) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
  width: 45%;
  max-width: 700px;
  height: 80%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Bettop = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 85%;
  color: #00eaff;
  font-size: 13px;
  text-decoration: underline;
  height: 5%;
  align-items: center;
`;

export const Betmiddle = styled.div`
  height: 70%;
  width: 85%;
  color: white;
  font-size: 8px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

export const Betbottom = styled.div`
  width: 85%;
  height: 15%;
  width: 90%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Rolldice = styled.button`
  width: 100%;
  padding: 17px;
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.2) -6.9%,
    rgba(112, 7, 255, 0.2) 55.31%,
    rgba(0, 200, 255, 0.2) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5),
    inset 0px 0px 14px rgba(202, 26, 231, 0.6);
  border-radius: 10px;
  color: white;
  font-size: 16px;
  border: none;
`;

export const H2 = styled.h2`
  font-size: 15px;
  margin-bottom: 14px;
  font-weight: 600;
`;
export const H1 = styled.h2`
  font-size: 18px;
  margin-bottom: 14px;
  color: #00eaff;
`;

export const Flexcolumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
`;

export const Chance = styled.button`
  font-size: 16px;
  background: white;
  padding: 10px 8px;
  border-radius: 6px;
  color: rgba(112, 7, 255, 1);
  width: 60px;
  font-weight: 600;
  border: none;
`;

export const Transchance = styled.button`
  font-size: 12px;
  border-radius: 6px;
  color: rgba(0, 234, 255, 1);
  width: 45px;
  font-weight: 500;
  background-color: rgba(83, 57, 100, 0.2);
  border: none;
`;

export const Range = styled.input`
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  width: 100%;
  height: 4px;
  background: transparent
    linear-gradient(90deg, #ef0896 -6.9%, #7007ff 55.31%, #00c8ff 107.28%) 0% 0%
    no-repeat padding-box;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
  &::-webkit-slider-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: transparent
      linear-gradient(
        156.93deg,
        #ef0896 -49.7%,
        #7007ff 44.05%,
        #00c8ff 122.38%
      )
      0% 0% no-repeat padding-box;
    border: 0;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
  }
  &::-webkit-slider-runnable-track {
    background: white;
    height: 6px;
    border-radius: 3px;
    width: 100%;
    border: none;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: transparent
      linear-gradient(
        156.93deg,
        #ef0896 -49.7%,
        #7007ff 44.05%,
        #00c8ff 122.38%
      )
      0% 0% no-repeat padding-box;
    border: 0;
    cursor: pointer;
  }
  &::-moz-range-progress {
    width: 100%;
    height: 4px;
    background: transparent linear-gradient(270deg, #16102f 0%, #55b7ff 100%) 0%
      0% no-repeat padding-box;
    outline: none;
    transition: opacity 0.2s;
  }
`;

export const HousePoolChartLabel = styled.span`
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  padding-left: 10px;
`;
