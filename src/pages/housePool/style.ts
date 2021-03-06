import styled from 'styled-components';
import landingTop from 'assets/images/landingtop.png';
import poolDetailsBg from 'assets/images/poolDetailsBg.png';
import tableBackground from 'assets/images/tableBackground.png';
import semiCircle from 'assets/icons/semiCircle.png'

import { colors, screenSizes } from 'shared/styles/theme';


export const HousePoolCont = styled.div`
Width:100%;
`

export const InfoContainer = styled.div`
background: url(${landingTop});
/*height: 500px;*/
width: 100%;
padding-top:120px;
padding-bottom:20px;
background-size: contain;
background-repeat: no-repeat;
background-color: #000;
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
display: flex;
justify-content: space-between;
align-items: center;
@media (max-width: ${screenSizes.mediaM}px) {
    flex-direction: column;
}
`
export const InfoTextContainer = styled.div<any>`
display: flex;
flex-direction: column;
justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
align-items: ${(props) => (props.alignItems ? props.alignItems : 'flex-start')};
color:${colors.white};
min-height: 250px;


p{
    margin:10px 0;
}

h3{
color: ${colors.purple};
text-transform: uppercase;
}
@media (max-width: ${screenSizes.mediaM}px) {
    align-items: center;
    text-align: center;
}
`

export const PoolDetailsContainer = styled.div`
/*display:flex;*/
/*justify-content:center;*/
/*align-items:center;*/
background: url(${poolDetailsBg});
background-size: cover;
background-repeat: no-repeat;
background-color: #000;
/*width:100%;*/
/*height: 600px;*/padding:0 5%;
display: grid;
grid-template-columns: minmax(350px, 460px) minmax(350px, 1fr);
grid-column-gap: 20px;
grid-row-gap: 20px;

padding-top: 50px;

@media (max-width: ${screenSizes.mediaM}px) {
    grid-template-columns: 1fr;
}
`
export const PoolDetailsGridItem = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
padding: 20px;
@media (max-width: ${screenSizes.mediaM}px) {
    padding: 10px;
}
`

export const HouseP = styled.p`
@media (max-width: ${screenSizes.mediaS}px) {
    br{
        display: none;
    }
}

`;



export const TransactionContainer = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: flex-start;
background: url(${tableBackground});
background-size: cover;
background-repeat: no-repeat;
background-color: #000;
width:100%;
// padding: 30px 5%;
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
text-decoration:underline;

&:hover{
    text-decoration: underline;     
    text-decoration-color: ${colors.primary};  
}

`

// export const InfoFlexCont = styled.div`
// display:flex;
// width:100%;
// height:100%;
// margin:0 5%;
// justify-content: space-between;
// align-items: center;
// `
export const FlexCont = styled.div<any>`
display: flex;
flex-direction: column;
justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
align-items: ${(props) => (props.alignItems ? props.alignItems : 'flex-start')};
color:${colors.white};


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
align-items:center;
width:95%;
height:100%;
margin:50px;

background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;

*{
}

`

export const PoolFundsCont = styled.div<any>`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: url(${semiCircle}) no-repeat center;
background-size: contain;
background-repeat: no-repeat;
// background-color: #000;
width:100%;
height: 250px;

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