import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";


export const ChartCont = styled.div`
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
border-radius: 20px;
  width: 100%;
  max-width: 700px;
  height: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: ${screenSizes.mediaS}px) {
    margin: 10px 0 ;
}
`
export const LastRollHeader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
// align-items: center;
width:100%;
padding:0 5%;
margin-top:5%;

h1, h2{
  margin:0;
}

`
export const BarChartCont = styled.div`
display: flex;
justify-content:center;
align-items:center;
Width:90%;
height:70%;

@media (max-width: ${screenSizes.mediaS}px) {
  height:100%;
}

`
export const LastRollDetails = styled.div`
flex-grow: 0.7;
display: flex;
justify-content: center;
align-items: flex-start;
width: 100%;
background: #2A1966;
// opacity: 0.2;
box-shadow: inset 0px 0px 24px #CA1AE730;
border-radius: 20px;
`
export const TABLE = styled.table`
// background:lightgrey;
width:100%;
margin:10px;
color:${colors.white};
`
export const TR = styled.tr<any>`
height: ${(props: any) => (props.header ? "60px" : '20px')};

`
export const TD = styled.td<any>`
font-size:12px;
text-align: ${(props: any) => (props.header ? "left" : 'center')};
width: ${(props: any) => (props.header ? "100px" : '20px')};
height:30px;
@media (max-width: ${screenSizes.mediaS}px) {
    font-size:10px;
}

`
export const H1 = styled.h1`
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HousePoolChartLabel = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: #fff;

  span{
    font-size: 16px;
  font-weight: 600;
  margin:0 10px;
  }
`;
export const HousePoolChartHead = styled.h2`
color:${colors.white};
`