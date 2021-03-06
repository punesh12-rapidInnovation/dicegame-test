import { colors, screenSizes } from 'shared/styles/theme';
import styled from 'styled-components';

interface ModalBodyProps {
	show: boolean;
}

export const HousePoolCont = styled.div`
display:flex;
flex-direction: column;
width: 100%;
justify-content: center;
@media (max-width: ${screenSizes.mediaM}px) {
	font-size: 14px;
}
`

export const H1 = styled.h1`
font-size: 48px;
font-weight: 750;
background: linear-gradient(
            to right,rgba(239, 8, 150, 1), rgba(112, 7, 255, 1),
             rgba(0, 200, 255, 1));
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
@media (max-width: ${screenSizes.mediaM}px) {
	font-size: 28px;
}
`

export const InputCont = styled.div<any>`
width:100%;
/*height:90px;*/
background: #2A1966;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
border-radius: 20px;
margin:8% 0 0 0 ;
padding:20px;

opacity:${(props: any) => (props.isDisabled ? '0.4' : 1)};
pointer-events:${(props: any) => (props.isDisabled ? 'none' : 'unset')};
`
export const FlexCont = styled.div<any>`
display:flex;
flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-end')};
align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
color:${colors.white};
width:${(props) => (props.width ? props.width : '90%')};
margin:${(props) => (props.margin ? props.margin : '0 10px')};
p{
    margin:10px 0;
}

span{
    color:${colors.primary};
    font-weight:bold;
}
img{
    margin:0 10px;
}
`

export const Input = styled.input`
    width: 100%;
	background: transparent;
	color: ${colors.white};
	font-size: 14px;
	line-height: 20px;
	border: none;
	box-sizing: border-box;
	outline: none;
	padding: 0;
	margin: 0;

    ::placeholder{
        color: ${colors.white};
        opacity: 0.5;
    }

	@media (min-width: ${screenSizes.mediaM}px) {
		font-size: 14px;
		line-height: 30px;
	}`
export const Dropdown = styled.div<any>`
    background:linear-gradient(90deg, rgba(239, 8, 150, 0.26) -6.9%, rgba(112, 7, 255, 0.26) 55.31%, rgba(0, 200, 255, 0.26) 107.28%), #2b1967;
    box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
	color: #fff; 
	position: absolute;
	border-radius: 10px;
	width: 100%;
	top: 80px;
	transform: translateX(-4%);
	z-index: 9;
	`

export const WithdrawTimer = styled.div<any>`
	 position: ${(props: any) => (props.isShown ? "static" : "absolute")};
	 visibility: ${(props: any) => (props.isShown ? "visible" : "hidden")};
	/*display: ${(props: any) => (props.timeInSec > 0 ? "block" : "none")};*/
		

	`
