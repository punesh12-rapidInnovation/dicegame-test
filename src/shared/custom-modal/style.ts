import styled from 'styled-components';
import { colors, screenSizes } from '../styles/theme';
interface ModalBodyProps {
	show: boolean;
}

export const ModelHead = styled.div`
	color: ${colors.white};
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack:justify;
	-ms-flex-pack:justify;
	justify-content:space-between;
	-webkit-box-align:center;
	-ms-flex-align:center;
	align-items:center;
	margin-bottom: 10px;

	h2 {
		-webkit-box-flex:1;
		-ms-flex-positive:1;
		flex-grow:1;
		text-align:center;
		padding-left:40px;
		font-weight: 600;
		font-size: 16px;
		line-height: 25px;
		margin: 0;

		@media (max-width: ${screenSizes.mediaM}px) {
			font-size: 16px;
			line-height: 20px;
		}

}
`;

export const ModalBody = styled.div<ModalBodyProps>`
	display: ${(props) => (props.show ? 'block' : 'none')};
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: rgba(26, 39, 50, 0.7);
	-webkit-backdrop-filter: blur(5px);
	        backdrop-filter: blur(5px);
	
`;

export const ModalContent = styled.div<any>`
	background-color: ${colors.primary};
	padding: 40px;
	display: inline-block;
	border-radius: 8px;
	margin: 0 auto;
	border: none;
	overflow: auto;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	        transform: translate(-50%, -50%);
	max-height: 100%;
	background: #2A1966;
    -webkit-box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
            box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
    border-radius:20px;
	::-webkit-scrollbar {
		width: 0 !important;
	}
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
	width: 80%;
	
	@media (min-width: ${screenSizes.mediaL}px) {
		width: 524px;
	}
`;

export const ModalContainerHeading = styled.p`
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
	color: ${colors.primary};
	letter-spacing: 0.1em;
	text-transform: uppercase;
	margin: 0;
`;
export const ModalContainerText = styled.p`
	font-size: 16px;
	margin: 0;
`;

// export const CloseButton = styled.div`
//   display: flex;
//   p {
//     font-family: Light;
//     font-weight: 300;
//     font-size: 14px;
//     color: ${colors.white};
//     margin: 0 10px;
//     @media (min-width: ${screenSizes.mediaM}px) {
//       font-size: 18px;
//     }
//   }

//   img {
//     height: 25px;
//     cursor: pointer;
//   }
// `;

export const CloseButton = styled.div``;
export const Close = styled.img`
	cursor: pointer;
	margin-right: auto;
	@media (min-width: ${screenSizes.mediaM}px) {
		cursor: pointer;
		margin-right: 0;
	}
`;
