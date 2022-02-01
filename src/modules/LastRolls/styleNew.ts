import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";


export const LastRollCont = styled.div`
background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.1) -6.9%,
    rgba(112, 7, 255, 0.1) 55.31%,
    rgba(0, 200, 255, 0.1) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  height: 640px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  position:relative;
}

`
export const LastRollHeader = styled.div`
display: flex;
justify-content: center;
align-items: center;
width:100%;
margin-top:10%;

h1{
    font-size:22px;
    text-transform: uppercase;
    color:${colors.white};
}
img{
    margin:0 10px;
}

@media (max-width: ${screenSizes.mediaS}px) {
    h1{
        font-size:14px;
    }
    img{
        margin:0 5px;
    }
}
`
export const LastRollDetailsCont = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
margin:30px;

button{
    width: 50%;
    margin-top: -20px;
    z-index:10;
}

`
export const LastRollDetails = styled.div`
display: flex;
height:100%;
justify-content: center;
align-items: flex-start;
width: 100%;
background: #2A1966;
// opacity: 0.2;
box-shadow: inset 0px 0px 24px #CA1AE730;
border-radius: 20px;
position:relative;
postion:relative;
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
    font-size:9px;
}

`
export const H1 = styled.h1`
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 30%;
  text-align:center;

  @media (max-width: ${screenSizes.mediaS}px) {
    font-size: 12px;
    top: 50%;
    left: 20%;
  }
`;