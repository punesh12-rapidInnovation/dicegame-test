import styled from 'styled-components';
import landingtop from '../../../../assets/images/landingtop.png'


export const HeaderContainer = styled.div`
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
background: black;
position: relative;
background: url(${landingtop});
background-color: #000;
background-size: cover;
background-position:right;
`;

export const Walletcontainer = styled.div`
position: absolute;
right: 50px;
top: 50%;
transform: translatey(-50%);
width: 10%;
display: flex;
justify-content: center;
align-items: center;
`

export const WalletLogo = styled.img`
width: 80px;
z-index: 2;
object-fit: contain;
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


