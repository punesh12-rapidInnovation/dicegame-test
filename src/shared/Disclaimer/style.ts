import { colors } from "shared/styles/theme";
import styled from "styled-components";



export const DisclaimerCont = styled.div<any>`
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-orient: vertical;
-webkit-box-direction: normal;
-ms-flex-direction: column;
        flex-direction: column;
font-family:AvenirLTStd;
color:${colors.white};

ul, li {
    font-size:14px;
    list-style:none;
}
ul{
    margin:30px 0;
}
li{
    margin:10px;
}

p{
    font-size:14px;
    font-style:italic;
    text-align:right;
    margin:5px 0;
    opacity:0.8;
}
`

export const CheckCont = styled.div<any>`
display:-webkit-box;
display:-ms-flexbox;
display:flex;
-webkit-box-align:center;
-ms-flex-align:center;
        align-items:center;
margin-top:20px;
    
label{
    font-size:14px;
    font-style:italic;
    text-align:right;
    margin:5px 0;
    opacity:0.8;
}

`