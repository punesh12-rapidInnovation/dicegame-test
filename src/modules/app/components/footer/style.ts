import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";


export const FooterCont = styled.div<any>`
display:flex;
justify-content:space-around;
align-items:center;
width:100%;
height:180px;
background:${colors.black};
padding:20px 0 ;
color:${colors.white};
margin-left:auto;
margin-right:auto;
z-index:10;
 
@media (max-width: ${screenSizes.mediaM}px) {
    justify-content:space-between;
    height:150px;

}
`
export const ImageCont = styled.div<any>`

img{ 
    margin:0 10px;
    height:32px;
    
}
p{
    font-size:10px;
    margin-left:45px;
}


@media (max-width: ${screenSizes.mediaS}px) {
    width:100%;
    
    p{
        font-size:9px;
        margin-left:40px;
    }
    img{
        height:24px;
    }

`

export const Content = styled.div`
width:75%;
display:flex;
justify-content:space-between;
align-items:center;
padding-bottom:20px;
border-bottom:1px solid ${colors.white}16;

@media (max-width: ${screenSizes.mediaM}px) {
    width:100%;
}

`

export const TabContainer = styled.div`
width:75%;
display:flex;
justify-content:space-around;
align-items:center;
align-content:center;
font-size:12px;
font-weight:600; 
letter-spacing:1px;

p{
    cursor:pointer;
}

a{
    text-decoration:none;
    color:inherit;
}


@media (max-width: ${screenSizes.mediaS}px) {
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;

    p{
        margin:5px 0 ;
        font-size:9px;
    }
}

`