import styled from "styled-components";
import Chatsection from "../../assets/images/Chatsection.png";
import sendimage from "../../assets/images/send-icon.svg";
import ModalBackground from '../../assets/images/ModalBackground.png';
import { colors } from "shared/styles/theme";
import Sliderthumb from "../../assets/icons/sliderthumb.svg";

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

export const PopupModal = styled.button`
  height: 50vh;
  width: 50vh;
  background: lightgray;
  position: absolute;
  top: 20;
  left: 50;
  border-radius: 20px;
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
  max-width: 700px;

  > * {
    color: white;
  }
`;

export const GlobalChatSection = styled.div`
  background: rgba(0, 0, 0, 1);
  background-image: url(${Chatsection});
  background-position: center;
  background-size: cover;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
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
  padding-left: 20px;
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
  height: 63%;
  justify-content: center;
  padding: 10px 20px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Messagediv = styled.div`
  background: rgba(255, 255, 255, 0.23);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  max-width: 73%;
  border-top-left-radius: 0;
  margin: 10px 0;
  align-self: flex-start;
  text-align: left;
  word-break: break-all;
`;
export const Ownmsg = styled.div`
  background: linear-gradient(
    92.8deg,
    rgba(30, 232, 183, 0.8) 2.13%,
    rgba(172, 51, 191, 0.4) 102.29%
  );
  border-radius: 10px;
  border-bottom-right-radius: 0;
  padding: 15px;
  display: flex;
  max-width: 73%;
  margin: 10px 0;
  align-self: flex-end;
  text-align: left;
  word-break: break-all;
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

export const BetBox = styled.div`
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
  height: 580px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
`;

export const BetTop = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 85%;
  color: #00eaff;
  font-size: 13px;
  text-decoration: underline;
  height: 5%;
  align-items: center;
`;

export const BetMiddle = styled.div`
  height: 70%;
  width: 85%;
  color: white;
  font-size: 10px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BetBottom = styled.div`
  width: 85%;
  height: 15%;
  width: 90%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const RollDice = styled.button`
  width: 100%;
  padding: 17px;
  cursor: pointer;
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

export const H2 = styled.h2<any>`
  font-size: ${props => props.FontSize ? props.FontSize : '15px'};
  margin-bottom: ${props => props.MarginBottom ? props.MarginBottom : '14px'};
  font-weight: 600;
  color: ${props => props.color ? props.color : '#00eaff'};

`;
export const H1 = styled.h2<any>`
  font-size: ${props => props.FontSize ? props.FontSize : '18px'};
  color: ${props => props.color ? props.color : colors.white};

  margin-bottom: 14px;


`;

export const FlexColumn = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  width: ${props => props.width || "100%"};
`;

export const Flex = styled.div<any>`
  display: flex;
  justify-content: ${props => props.JustifyContent || 'space-between'};
  align-content: center;
  width:${props => props.Width || '100%'};
  margin-bottom: ${props => props.MarginBottom || '0'};;
`;

export const Chance = styled.input`
  font-size: 18px;
  background: white;
  padding: 10px;
  border-radius: 6px;
  color: rgba(112, 7, 255, 1);
  width: 90px;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  :focus {
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::placeholder{
    color: rgba(112, 7, 255, 1);
	}
`;
export const PercentChance = styled.div<any>`
  font-size: ${props => props.FontSize ? props.FontSize : '18px'};
  background: white;
  padding: 10px;
  border-radius: 6px;
  color: rgba(112, 7, 255, 1);
  width: ${props => props.width ? props.width : '60px'};

  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${props => props.MarginBottom ? props.MarginBottom : '0'};;
`;

export const TransChance = styled.button`
  font-size: 14px;
  border-radius: 6px;
  color: rgba(0, 234, 255, 1);
  width: 45px;
  flex-grow:1;
  margin-right:10px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;

  :hover{
    background-color: rgba(0,0,0,0.2);

  }
`;

export const Range = styled.input`
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  width: 100%;
  height: 4px;
  /*background: green;*/
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
  &::-webkit-slider-thumb {
    width: 50px;
    height: 50px;
	  background: url(${Sliderthumb});
    background-repeat: no-repeat;
    background-size: contain;
	  border: none;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
  }
  &::-webkit-slider-runnable-track {

    background: ${props => {
    return parseFloat(`${props.value}`) >= 50 ?
      `linear-gradient(to left, #6FCF97 ${100 - parseFloat(`${props.value}`)}%, #EB5757 ${100 - parseFloat(`${props.value}`)}%)`
      :
      `linear-gradient(to right, #EB5757 ${props.value}%, #6FCF97 ${props.value}%)`
  }};
    height: 12px;
    border-radius: 10px;
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

export const BetResultPopup = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 30px;
position: absolute;
top:50%;
left: 50%;
transform: translate(-50%,10%);
width: 550px;
height: 360px;
z-index: 2;
background: url(${ModalBackground});
background-color: #2A1966;
box-shadow: 0px 3px 5px #2A1966, inset 0px 0px 24px #CA1AE7;
border-radius: 10px;
background-size: cover;
`
export const Crossimg = styled.img`
width: 40px;
height: 40px;
position: absolute;
top: 20px;
right: 20px;
cursor: pointer;
`

export const BetResult = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: center;
`
export const OddEvenDiv = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: center;
margin-top: 20px;
padding: 20px;
width: 100%;
border-radius: 10px;
background: rgba(0,0,0,0.5);
`