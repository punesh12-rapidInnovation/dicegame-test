import styled from 'styled-components';
import landingTop from '../../../../assets/images/landingtop.png'
import walletoutline from '../../../../assets/icons/walletoutline.png';
import { screenSizes } from 'shared/styles/theme';
import soundOn from "assets/icons/soundOn.svg";

export const HeaderDiv = styled.div`
position: absolute;
height: 10vh;
width: 100%;

.soundCheck{
        margin-right:10px;
}

`


export const HeaderContainer = styled.div`
height: 100px;
width:100%;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
        justify-content: space-between;
-webkit-box-align: center;
-ms-flex-align: center;
        align-items: center;
position: relative;
background: url(${landingTop});
background-color: #000;
background-size: cover;
background-position:right;
margin:0;
padding:0;
background: rgba(0,0,0,0.5);

@media (max-width: ${screenSizes.mediaL}px) {
        height:60px;

        .siteLogo{
                height:20px;
                margin:0 20px;
        }
        .invisibleDiv{
                display:none;
        }
}


`;

export const WalletContainer = styled.div`
display:-webkit-box;
display:-ms-flexbox;
display:flex;
-webkit-box-pack:center;
-ms-flex-pack:center;
        justify-content:center;
-webkit-box-align:center;
-ms-flex-align:center;
        align-items:center;
width:100%;
max-width:180px;
height:45px;
background: #121213;
-webkit-box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
        box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
border-radius: 100px;
margin-right: 20px;

@media (max-width: ${screenSizes.mediaS}px) {
        height:30px;   
        width:200px;   
}
`

export const WalletLogo = styled.img`
z-index: 2;
margin-left:-10px;
@media (max-width: ${screenSizes.mediaS}px) {
        width:45px;
        margin-top:3px;
        margin-right:-10px;
   
}
`
export const Walletoutline = styled.img`
border:2px solid white;
width: 130px;
-webkit-transform: translatex(-30px);
-ms-transform: translatex(-30px);
        transform: translatex(-30px);
-o-object-fit: contain;
   object-fit: contain;

   @media (max-width: ${screenSizes.mediaS}px) {
                width:10px;
                height:10px;   
}
`

export const H1 = styled.h1`
font-size: 14px;
width: 120px;
color: white;
-webkit-transform: translate(-120px,-4px);
-ms-transform: translate(-120px,-4px);
        transform: translate(-120px,-4px);
`

export const SoundCheck = styled.img<any>`
width:30px;
margin-right: 20px;
cursor:pointer;

@media (max-width: ${screenSizes.mediaM}px) {
        margin-right: 10px;     
}
`



