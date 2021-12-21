import { colors } from "shared/styles/theme";
import styled from "styled-components";

export const CircleTimerCont = styled.div<any>`
width: 80px;
height: 80px;
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
    stroke-dasharray: ${(props) => (props.circleDasharray ? props.circleDasharray : '200')};
    stroke-dashoffset: ${(props) => (props.circleDashoffset ? props.circleDashoffset : '0')};
}
`
export const Outer = styled.div`
width: 80px;
height: 80px;
border-radius: 50%;
padding: 10px;
`
export const Inner = styled.div`
width: 60px;
height: 60px;
border-radius: 50%;

display: flex;
align-items: center;
justify-content: center;
`