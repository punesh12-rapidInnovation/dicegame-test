import styled from 'styled-components';
import landingTop from 'assets/images/landingtop.png';
import poolDetailsBg from 'assets/images/poolDetailsBg.png';
import tableBackground from 'assets/images/tableBackground.png';
import semiCircle from 'assets/icons/semiCircle.png'

import { colors } from 'shared/styles/theme';


export const HousePoolCont = styled.div`
Width:100%;
`

export const InfoContainer = styled.div`
background: url(${landingTop});
height: 500px;
width: 100%;
background-size: contain;
background-repeat: no-repeat;
background-color: #000;
 background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`

export const PoolDetailsContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
background: url(${poolDetailsBg});
background-size: cover;
background-repeat: no-repeat;
background-color: #000;
width:100%;
padding:0 5%;
`
export const TransactionContainer = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items:center;
background: url(${tableBackground});
background-size: cover;
background-repeat: no-repeat;
background-color: #000;
width:100%;
padding:0 5%;
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
export const H3 = styled.h1`
font-size: 16px;
font-weight: 700;
text-transform: uppercase;
`
export const Link = styled.p`
font-size: 14px;
color:${colors.primary};
font-style:italic;
width:fit-content;
cursor: pointer;

&:hover{
    text-decoration: underline;     
    text-decoration-color: ${colors.primary};  
}

`

export const InfoFlexCont = styled.div`
display:flex;
width:100%;
height:100%;
margin:0 5%;
justify-content: space-between;
align-items: center;
`
export const FlexCont = styled.div<any>`
display:flex;
flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-end')};
align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
color:${colors.white};
width:50%;
height:50%;

p{
    margin:10px 0;
}

h3{
color: ${colors.purple};
text-transform: uppercase;

}
`
export const PoolDetails = styled.div<any>`
display:flex;
flex-direction:column;
justify-content: center;
// align-items:center;
width:95%;
height:100%;
margin:50px;

background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;

`

export const PoolFundsCont = styled.div<any>`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: url(${semiCircle});
background-size: cover;
background-repeat: no-repeat;
// background-color: #000;
width:80%;
height: 300px;

h5{
    color: ${colors.primary};
    font-size:14px;
}

`

export const VolumeChartLabel = styled.span`
font-size: 30px;
font-weight: 900;
color: #fff;
padding-left:10px;
`
export const BoxTitle = styled.div`
color: #fff;
padding-left: 10px;
font-size: 20px;
font-weight: 600;
`