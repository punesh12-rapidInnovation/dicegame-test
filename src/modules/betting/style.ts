import styled, { keyframes } from "styled-components";
import Chatsection from "../../assets/images/Chatsection.png";
import sendimage from "../../assets/images/send-icon.svg";
import ModalBackground from "../../assets/images/ModalBackground.png";
import { colors, screenSizes } from "shared/styles/theme";
import Sliderthumb from "../../assets/icons/sliderthumb.svg";
import toolTip from "assets/icons/toolTip.png";



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
export const HowToPlay = styled.h2<any>`
  font-size: ${(props) => (props.FontSize ? props.FontSize : "12px")};
  margin-bottom: ${(props) =>
    props.MarginBottom ? props.MarginBottom : "14px"};
  font-weight: 600;
  color: rgba(0, 234, 255, 1);
  position:absolute;
  right:20px;
  top:15px;
  text-decoration:underline;
  text-transform:capitalize;
  display: Flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
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
  width: 100%;
  max-width: 700px;
  height: 640px;
   margin-right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  // padding: 10px 0;
  position:relative;

  @media (max-width: ${screenSizes.mediaS}px) {
    width: 100%;
    margin-right:0;
    margin: 10px 0 ;
}

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
  height: 65%;
  width: 85%;
  color: white;
  font-size: 10px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const animateHeart = keyframes`
  0%
  {
    transform: scale( .80 );
  }
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( .80 );
  }
  60%
  {
    transform: scale( 1 );
  }
  80%
  {
    transform: scale( .80 );
  }
  100%
  {
    transform: scale( .80 );
  }
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
  font-size: ${(props) => (props.FontSize ? props.FontSize : "15px")};
  margin-bottom: ${(props) =>
    props.MarginBottom ? props.MarginBottom : "14px"};
  font-weight: 600;
  color: ${(props) => (props.color ? props.color : colors.white)};


  
  @media (max-width: ${screenSizes.mediaM}px) {
    font-size: ${(props) => (props.FontSizeMobile ? props.FontSize : "12px")};
    font-weight: 400;
    // margin:10px 0;
}
  @media (max-width: ${screenSizes.mediaS}px) {
    font-size: ${(props) => (props.FontSizeMobile ? props.FontSize : "12px")};
    font-weight: 400;
    margin:10px 0;
}
`;
export const H1 = styled.h2<any>`
  font-size: ${(props) => (props.FontSize ? props.FontSize : "18px")};
  color: ${(props) => (props.color ? props.color : colors.white)};

  @media (max-width: ${screenSizes.mediaS}px) {
    font-size: ${(props) => (props.MobileFontSize ? props.MobileFontSize : props.FontSize)};
  }
`;

export const FlexColumn = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  width: ${(props) => props.width || "100%"};
`;

export const Flex = styled.div<any>`
  display: flex;
  justify-content: ${(props) => props.JustifyContent || "space-between"};
  align-content: center;
  width: ${(props) => props.Width || "100%"};
  margin-bottom: ${(props) => props.MarginBottom || "0"}; 
  margin:0;
  padding:0;
  opacity: ${(props) => props.disabled? "0.5": "1"};


  img{
    height:20px;
    cursor:pointer;
  }

  .helpIcon{
    @media (max-width: ${screenSizes.mediaS}px) {
      height:12px;
    }
  }
  .ExpandArrow{
    height:12px;
    width:12px;
    cursor: pointer;
    margin:${(props: any) =>
    props.iconStatus ? '0 5px 12px 5px' : '0 5px'};
    transform: ${(props: any) =>
      props.iconStatus ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: 0.1s;
    @media (max-width: ${screenSizes.mediaS}px) {
      margin:0 5px;
  }

  
@media (max-width: ${screenSizes.mediaS}px) {
  img{
    height:12px;
  }

  label{
    font-size:12px;
    margin:0;    
  }
}
 
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
  ::placeholder {
    color: rgba(112, 7, 255, 1);
  }

  
  @media (min-width: ${screenSizes.mediaM}px) and (max-width: ${screenSizes.mediaL}px) {
    width: 60px;
    font-size:12px;
    padding: 10px;
}
 
  @media (min-width: 680px) and (max-width: ${screenSizes.mediaM}px) {
    width: 50px;
    font-size:10px;
    padding: 10px;
}
  @media (max-width: ${screenSizes.mediaS}px) {
    width: 60px;
    font-size:10px;
    padding: 10px;
}
`;
export const PercentChance = styled.div<any>`
  font-size: ${(props) => (props.FontSize ? props.FontSize : "18px")};
  background: white;
  padding: 10px;
  border-radius: 6px;
  color: rgba(112, 7, 255, 1);
  width: ${(props) => (props.width ? props.width : "60px")};

  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${(props) =>
    props.MarginBottom ? props.MarginBottom : "0"}; ;
    
`;

export const TransChance = styled.button`
  font-size: 14px;
  border-radius: 6px;
  color: rgba(0, 234, 255, 1);
  width: 45px;
  flex-grow: 1;
  margin-right: 10px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${screenSizes.mediaL}px) {
    width: 45px;
    max-width: 55px;
    font-size:10px;
    padding: 0;
    margin-right: 5px;
}
  @media (max-width: ${screenSizes.mediaM}px) {
    width: 40px;
    max-width: 45px;
    font-size:10px;
    padding: 0;
    margin-right: 5px;
}
  
  @media (max-width: ${screenSizes.mediaS}px) {
    width: 35px;
    max-width: 45px;
    font-size:9px;
    font-weight: 400;
    padding: 0;
    margin-right: 5px;
}
`;



export const Range = styled.input`
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  width: 100%;
  height: 4px;
  margin-bottom: 20px;
  /*background: green;*/
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
  &::-webkit-slider-thumb {
    width: 50px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    
  }
  
  &::-webkit-slider-runnable-track {
    background: ${(props) => {
    return parseFloat(`${props.value}`) >= 50
      ? `linear-gradient(to left, #EB5757 ${100 - parseFloat(`${props.value}`)
      }%, #6FCF97 ${100 - parseFloat(`${props.value}`)}%)`
      : `linear-gradient(to right, #6FCF97 ${props.value}%, #EB5757 ${props.value}%)`;
  }};
    height: 12px;
    border-radius: 10px;
    width: 100%;
    border: none;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 10px;
    border-radius: 50%;
    background: #6FCF97;
    border: 0;
    cursor: pointer;
  }
  ::-moz-range-track {  
  background-color: #EB5757;
   width: 100%;
    height: 12px;
    border-radius: 10px;
    border: none;
    outline: none;
}
  &::-moz-range-progress {
    width: 100%;
    height: 12px;
    border-radius: 10px;
    border: none;
    background: #6FCF97;
    outline: none;
    transition: opacity 0.2s;
  }
`;

export const SliderThumb = styled.div<any>`
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: url(${Sliderthumb});    
    background-repeat: no-repeat;
    background-size: contain;
    animation-name: ${animateHeart};
    animation-duration: ${(props) => (props.duration ? props.duration : '5s')};
    animation-iteration-count: infinite;
    pointer-events: none;
`


export const BetResultPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 550px;
  height: 360px;
  z-index: 2;
  background: url(${ModalBackground});
  background-color: #2a1966;
  box-shadow: 0px 3px 5px #2a1966, inset 0px 0px 24px #ca1ae7;
  border-radius: 10px;
  background-size: cover;
`;
export const Crossimg = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const NotUnder = styled.div`
bottom:-20px;
@media (max-width: ${screenSizes.mediaS}px) {
  bottom:-20px;
  width:100%;
}

`

export const BetResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const OddEvenDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.4);
  margin-bottom: 10px;

  
  @media (max-width: ${screenSizes.mediaS}px) {
    padding: 10px;
    margin-top:30px;
}
`;

export const Select = styled.select`

width: 130px;
height: 32px;
color:${colors.white};
margin:0 5px;
background: linear-gradient(90deg, rgba(239, 8, 150, 0.2) -6.9%, rgba(112, 7, 255, 0.2) 55.31%, rgba(0, 200, 255, 0.2) 107.28%);
border: 2px solid #53084d;
box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
border-radius: 5px;

 Option{
  width: 100px;
  height: 32px;
  border-radius: 10px;
  padding:20px;
  background:#53084d;
  border: 2px solid #53084d;
 }

 @media (max-width: ${screenSizes.mediaS}px) {
  height:25px;
  
  Option{
    height: 10px;
    padding:0;
    margin:0;
  }
}
`

export const Option = styled.option`

`
export const P = styled.p`
color:${colors.primary};
font-weight:900;
font-size:16px;
margin:0 5px;
min-width:50%;
text-align:right;


@media (max-width: ${screenSizes.mediaM}px) {
  font-size:14px;
  font-weight:600;
  margin:0 2px;
}
@media (max-width: ${screenSizes.mediaS}px) {
  font-size:11px;
  font-weight:600;
  margin:0 2px;
}
`

export const ToolTipCont = styled.div`
display: block;
position:absolute;
top:-30%;
left:100%;
z-index:10;
cursor:pointer;
background: url(${toolTip});
background-size:cover;

p{
  display:flex;
  justify-content:center;
  align-items:center;
  min-width:180px;
  width:fit-content;
  height:30px;
  color:${colors.primary};
  font-size:14px;
}

@media (max-width: ${screenSizes.mediaS}px) {
  top:-70%;
  left:-820%;
  -webkit-transform: scaleX(-1);;
  -moz-transform: scaleX(-1);
  p{
    min-width:100px;
    font-size:10px;
    
  -webkit-transform: scaleX(-1);;
  -moz-transform: scaleX(-1);
  }
}



`

