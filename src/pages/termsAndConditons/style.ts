import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";
import landingtop from 'assets/images/landingtop.png';
import Background from 'assets/images/poolDetailsBg.png'




export const TermsPageContainer = styled.div`
width:100%;
height:auto;
display: flex;
flex-direction: column;
align-items:center;
background-color: #000;
`

export const HeaderDiv = styled.div`
background: url(${landingtop});
height: 45vh;
min-height: 200px;
width: 100%;
background-size: contain;
background-repeat: no-repeat;
background-color: #000;
display: flex;
justify-content: flex-start;
align-items:center;
 background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  h1{
      margin-top:30px;
  }

  
@media (max-width: ${screenSizes.mediaM}px) {
    height: 20vh;
    min-height: 180px;
}
`

export const H1 = styled.h1`
font-size: 48px;
font-weight: 750;
margin-bottom: 10px;
margin-left: 8%;
color:${colors.white};

@media (max-width: ${screenSizes.mediaM}px) {
    font-size:28px;
}
`


export const PulseGradient = styled.span`
background: linear-gradient(
            to right,rgba(239, 8, 150, 1), rgba(112, 7, 255, 1),
             rgba(0, 200, 255, 1));
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
`

export const ModuleParentCont = styled.div`
width:100%;
height:auto;
display: flex;
flex-direction: column;
align-items:center;
background-size: cover;
background-repeat: no-repeat;
background-color: #000;
background-image:url(${Background});
`
export const ModuleCont = styled.div<any>`
width: ${(props) => props.width || "90%"}; 
margin: ${(props) => props.margin || "5rem"}; 
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
padding: 2rem;
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
max-width:1300px;

@media (max-width: 1300px) {
    width: 95%;
    margin-top:30px;
}
@media (max-width: ${screenSizes.mediaM}px) {
    width: 99%;
    margin:1rem;
    
}
`
export const UL = styled.ul`
color:${colors.white};
`
export const LI = styled.li`
list-style: none;
margin:30px 5px;

@media (max-width: ${screenSizes.mediaM}px) {
    font-size:12px;
    margin:15px 0;
}
`

export const MoreTextContainer = styled.p<any>`
display: ${(props) => props.display? 'block' : 'none'}; 

`
export const DotsSpan = styled.span<any>`
display: ${(props) => props.display?  'none':''};
`
export const ButtonCont = styled.div`
width:100%;

@media (max-width: ${screenSizes.mediaM}px) {
    Button{
        width:100%;
    }
}
`