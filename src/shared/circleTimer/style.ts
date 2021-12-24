import { colors } from "shared/styles/theme";
import styled, { keyframes } from "styled-components";


const Anim = (totalOffsetToBeDone:any) => keyframes`
from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 250;
  }
`;

export const CircleTimerCont = styled.div<any>`
width: 100px;
height: 100px;
position: relative;

margin: auto;

svg {
    position: absolute;
    top: 0;
    left: 0;
}
circle {
    fill: none;
    stroke: url(#GradientColor);
    stroke-width: 8px;
    stroke-dasharray: ${(props) => (props.circleDasharray ? props.circleDasharray : '250')};
    stroke-dashoffset: ${(props) => (props.totalOffsetToBeDone ? props.totalOffsetToBeDone : '250')};
    animation: ${props => Anim(props.start)} ${props => props.totalTime}s linear normal;
    
}
`
export const Outer = styled.div`
width: 100px;
height: 100px;
border-radius: 50%;
padding: 10px;
`
export const Inner = styled.div`
width: 80px;
height: 80px;
border-radius: 50%;

display: flex;
align-items: center;
justify-content: center;
`
