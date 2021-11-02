import styled from 'styled-components';
import landingtop from '../../../../assets/images/landingtop.png'
import walletoutline from '../../../../assets/icons/walletoutline.png';


export const HeaderContainer = styled.div`
height: 10vh;
width:100%;
display: flex;
justify-content: space-between;
align-items: center;
position: relative;
background: url(${landingtop});
background-color: #000;
background-size: cover;
background-position:right;
margin:0;
padding:0;
`;

export const Walletcontainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
max-width:180px;
height:45px;
background: #121213;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 14px rgba(202, 26, 231, 0.9);
border-radius: 100px;
margin-right: 20px;
`

export const WalletLogo = styled.img`
z-index: 2;
margin-left:-10px;
`
export const Walletoutline = styled.img`
width: 130px;
transform: translatex(-30px);
object-fit: contain;
`

export const H1 = styled.h1`
font-size: 14px;
width: 120px;
color: white;
transform: translate(-120px,-4px);
`


