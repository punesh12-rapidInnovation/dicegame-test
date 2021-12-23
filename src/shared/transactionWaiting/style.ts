import { colors } from "shared/styles/theme";
import styled, { keyframes } from "styled-components";

export const TransImgCircle = styled.div`
	margin: 0 0 30px 0;

	-webkit-animation: spin 2s linear infinite; /* Safari */
	animation: spin 2s linear infinite;

	/* Safari */
	@-webkit-keyframes spin {
		0% 
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const Ring = styled.div<any>`
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
    stroke-dashoffset: ${(props) => (props.circleDashoffset ? props.circleDashoffset : '50')};
    
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