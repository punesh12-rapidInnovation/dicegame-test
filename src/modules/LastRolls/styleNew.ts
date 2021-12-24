import { colors } from "shared/styles/theme";
import styled from "styled-components";


export const LastRollCont = styled.div`
background: #2A1966;
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
border-radius: 20px;
  width: 100%;-+
  max-width: 700px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
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
    z-index:100;
}

`
export const LastRollDetails = styled.div`
flex-grow: 1;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
background: #2A1966;
// opacity: 0.2;
box-shadow: inset 0px 0px 24px #CA1AE730;
border-radius: 20px;
`
