import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";


export const FooterCont = styled.div<any>`
display:flex;
justify-content:space-between;
align-items:center;
width:85%;
background:transparent;
// background:red;
padding:20px 0 ;
color:${colors.white};
margin-left:auto;
margin-right:auto;
z-index:10;

span{
    color: ${colors.primary};
    cursor: pointer;
}
 
@media (max-width: ${screenSizes.mediaM}px) {
    p{ 
        font-size:12px;
        width:50%;
    }
}
`
export const ImageCont = styled.div<any>`

img{ 
    margin:0 10px;
    height:24px;

    @media (max-width: ${screenSizes.mediaM}px) {
        height:14px;
    }
}

`