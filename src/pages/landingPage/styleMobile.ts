import { colors } from 'shared/styles/theme';
import styled from 'styled-components';

import Background from 'assets/images/poolDetailsBg.png'


export const LandingMobileContainer = styled.div`
width:100%;
height:auto;
min-height:100vh;
display: flex;
flex-direction: column;
align-items:center;
background-size: cover;
background-repeat: no-repeat;
background-color: #000;
background-image:url(${Background});
padding-top:25%;
`
export const FunctionCont = styled.div`
display: flex;
justify-content:center;
align-items:center;
width:50%;
height: 36px;
color:${colors.white};

background: #121213;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
border-radius: 100px;
border:2px solid ${colors.primary}50;
`
export const FunctionStatus = styled.div<any>`
display: flex;
justify-content:center;
align-items:center;
width:55%;
height: 36px;
color:${colors.white};
margin:0 -5px;


// background: #121213;
// box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
border-radius: ${(props: any) => (props.activeStatus ? '100px' : 'none')};
// box-shadow: ${(props: any) => (props.activeStatus ? '0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9)' : '0')};
opacity: ${(props: any) => (props.activeStatus ? '1' : '0.4')};
border: ${(props: any) => (props.activeStatus ? `2px solid ${colors.primary}` : 'none')};
`


export const ModuleCont = styled.div<any>`
// border:1px solid ${colors.primary};
Width:100%;
display: flex;
justify-content:center;
margin:10px 0;
color:${colors.white};
`
export const BetActiveTab = styled.div<any>`
border:1px solid ${colors.primary};
Width:100%;
display: flex;
flex-direction: column;
justify-content:center;
align-items:center;
margin:10px;
padding:10px;
color:${colors.white};

`