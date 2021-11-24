import { colors, screenSizes } from 'shared/styles/theme';
import styled from 'styled-components';
import Dice from "assets/icons/Vectordice.svg";
import DiceFront from "assets/icons/diceFront.svg";
import ModalBackground from "assets/images/ModalBackground.png";


interface ModalBodyProps {
	show: boolean;
}

export const ModalBody = styled.div<ModalBodyProps>`
	display: ${(props) => (props.show ? 'block' : 'none')};
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	backdrop-filter: blur(5px);


	
.coinShower{
	width:100%;
	display:flex;
	justify-content:space-around;
	align-items: center;
	position: absolute;
	top:-70px;
}

.coinShower img{
	width:30px;
	animation: pulseCoinShower 3s infinite;
}

@keyframes pulseCoinShower{
	0% {
		transform:translateY(0);
		opacity:0;
	}
	50% {
		// transform:translateY(0);
		opacity:1;
	}
	70% {
		// transform:translateY(0);
		opacity:1;
	}
	100% {
		transform:translateY(100vh);
		opacity:0;
	}
}

.coinShower img: nth-child(1){
animation-delay:2s;
}
.coinShower img: nth-child(2){
animation-delay:1.5s;
}
.coinShower img: nth-child(3){
animation-delay:3s;
}
.coinShower img: nth-child(4){
animation-delay:2.5s;
}
.coinShower img: nth-child(5){
animation-delay:0.5s;
}
.coinShower img: nth-child(6){
animation-delay:0.8s;
}
.coinShower img: nth-child(7){
	animation-delay:3s;
}
.coinShower img: nth-child(8){
	animation-delay:2s;
}
.coinShower img: nth-child(9){
	animation-delay:4s;
}
.coinShower img: nth-child(10){
	animation-delay:1s;
}
.coinShower img: nth-child(11){
	animation-delay:4s;
}
.coinShower img: nth-child(11){
	animation-delay:0.6s;
}
.coinShower img: nth-child(12){
	animation-delay:2s;
}
.coinShower img: nth-child(13){
	animation-delay:0.4s;
}
 `;

// function getAnimations(items: any, duration: any) {
// 	let str = ''
// 	for (let i = 0; i < items; i += 1) {
// 		str += template(i, items, duration)
// 	}
// 	return str
// }

// function template(i, items, duration) {
// 	const dur = Math.floor(Math.random() * 11);

// 	return `
// 		&:nth-child(${i + 1}) {
// 		  animation-delay: ${`${dur}s`};
// 		 }
// 	  `
// }


export const ModalContent = styled.div<any>`
	padding: 40px;
    background: url(${ModalBackground});
    background-color: #2A1966;
    box-shadow: 0px 3px 5px #2A1966, inset 0px 0px 24px #CA1AE7;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	margin: 0 auto;
	border: none;
	overflow: auto;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-height: 100%;
	max-width: 100%;
	::-webkit-scrollbar {
		width: 0 !important;
	}
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
	width: 80%;
	@media (min-width: ${screenSizes.mediaL}px) {
		width: 524px;
	}
`;

export const ModalContainerHeading = styled.p`
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
	color: ${colors.primary};
	letter-spacing: 0.1em;
	text-transform: uppercase;
	margin: 0;
`;

export const Image = styled.img<any>`
// background:red;
height: ${(props) => props.height ? props.height : '60px'};
	@media (max-width: ${screenSizes.mediaM}px) {
	}
`;
export const InfoText = styled.p<any>`
	font-size: 43px;
    font-family :BalooDa;
    font-weight :700;
	margin-bottom: 10px;
	color: ${(props) => props.color ? props.color : colors.yellow};
    @media (max-width: ${screenSizes.mediaM}px) {
	}
`;
export const InfoTextSecondary = styled.p`
	font-size: 24px;
    font-family:AvenirLTStd;
    // font-weight :900;
    text-transform: uppercase;
	// margin: 10px;
    letter-spacing: 2px;
	color: ${(props) => props.color ? props.color : colors.yellow};

    @media (max-width: ${screenSizes.mediaM}px) {
	}
`;

export const DiceCont = styled.div`
display:block;
position: relative;
margin-left:3rem;
margin-top:2rem;
`

export const FrontDice = styled.div`
position: relative;
p{
    position:absolute;
    top:25%;
    left:25%;
    font-size:43px;
    font-family:AvenirLTStd;
    font-weight :750;
}
`
export const RearDice = styled.div`
position:absolute;
top:-20%;
right:60%;

`

export const WinAmountContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width:98%;
height:54px;
border: 2px solid #F2C94C;
border-radius:15px;
margin-top:40px ;
position:relative;

p{
    color: ${colors.white};
    font-family: AvenirLTStd;
    font-size:18px;
    font-weight:900;
    margin:0 10px;
}
`

export const UserAddress = styled.p`
display: flex;
justify-content:center;
align-items:center;
color: ${colors.white};
margin:10px 0 ;
cursor: default;

img{
	margin:0 5px;
	cursor: pointer;
}
`
export const Text = styled.p`
color: ${colors.white};
font-size: 22px;
font-family: AvenirLTStd;
font-weight: 400;
margin:5px 0 ;
`

