import { colors } from 'shared/styles/theme';
import styled from 'styled-components';

import Background from 'assets/images/poolDetailsBg.png'
import housepoolNav from 'assets/images/mobileHousepoolNav.svg'


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
width:90%;
height: 36px;
color:${colors.white};
background: #121213;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
border-radius: 100px;
border:1px solid ${colors.primary}50;
`
export const FunctionStatus = styled.div<any>`
display: flex;
justify-content:center;
align-items:center;
width:55%;
height: 36px;
color:${colors.white};
margin:0;


// background: #121213;
// box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
border-radius: ${(props: any) => (props.activeStatus ? '100px' : 'none')};
// box-shadow: ${(props: any) => (props.activeStatus ? '0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9)' : '0')};
opacity: ${(props: any) => (props.activeStatus ? '1' : '0.4')};
border: ${(props: any) => (props.activeStatus ? `1px solid ${colors.primary}` : 'none')};
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
// border:1px solid ${colors.primary};
Width:98%;
display: flex;
flex-direction: column;
justify-content:center;
align-items:center;
margin:10px;
padding:10px;
color:${colors.white};
`

export const DepositNavCont = styled.div`
display: flex;
justify-content:space-around;
align-items:center;
width:100%;
padding:15px 0;
margin-bottom:12px;
margin-top:-25px;
background-image:url(${housepoolNav});
background-size: cover;
background-repeat: no-repeat;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 1), inset 0px 0px 34px rgba(202, 26, 231, 1);

p{
    color: ${colors.primary};
    font-size:13px;
    font-style: italic;

    &:hover{
        text-direction:underline;
    }

}

button{
    width:35%;
    font-size:12px;
}
`