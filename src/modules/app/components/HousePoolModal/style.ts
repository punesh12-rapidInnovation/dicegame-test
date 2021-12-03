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
align-items: center;
`

export const H1 = styled.h1`
font-size: 48px;
font-weight: 750;
background: linear-gradient(
            to right,rgba(239, 8, 150, 1), rgba(112, 7, 255, 1),
             rgba(0, 200, 255, 1));
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
`

export const InputCont = styled.div`
width:100%;
height:90px;
background: #2A1966;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
border-radius: 20px;
margin:8% 0 ;
`
export const FlexCont = styled.div<any>`
display:flex;
flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-end')};
align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
color:${colors.white};
width:90%;
margin:0 10px;
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