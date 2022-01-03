import styled from "styled-components"

import Bg404 from 'assets/images/404-bg.svg'
import { colors, screenSizes } from "shared/styles/theme";


export const NotFoundCont = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

background: rgba(0, 0, 0, 1);
background-image: url(${Bg404});
background-position: center;
background-size: cover;
background-color:${colors.black};
height: 100vh;
width: 100%;
display: flex;
justify - content: center;
align - items: center;

img{
    height:45%;
}

@media (max-width: ${screenSizes.mediaS}px) {
    img{
        width:60%;
        height:auto;
    }
}
`;

export const Button = styled.button`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.5) -6.9%, rgba(112, 7, 255, 0.5) 55.31%, rgba(0, 200, 255, 0.5) 107.28%);
box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
border-radius: 10px;
border:none;
color:${colors.white};
padding: 15px 25px;
text-transform:uppercase;
cursor:pointer;

@media (max-width: ${screenSizes.mediaS}px) {
    padding: 10px 15px;
    margin:15x;
    font-size:12px;
}
`;


