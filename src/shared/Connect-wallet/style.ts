import styled from 'styled-components';
import { colors, screenSizes } from '../styles/theme';

export const WalletCont = styled.div`
color:${colors.white};
width:100%;


`;

export const WalletList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const WalletOption = styled.div`
	background: lightgrey;
	border: none;
	padding: 10px;
	margin: 10px;
	cursor: pointer;
	background: linear-gradient(90deg, rgba(239, 8, 150, 0.5) -6.9%, rgba(112, 7, 255, 0.5) 55.31%, rgba(0, 200, 255, 0.5) 107.28%);
    box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
    border-radius: 10px;
	padding: 25px;
	display: flex;
	justify-content: center;
	font-size: 18px;
	font-weight: 600;
`;
export const AddressInfo = styled.div`
	border: none;
	color:${colors.white};
	cursor: pointer;

	border-radius:4px;
	padding: 10px;
	
	@media (max-width: ${screenSizes.mediaS}px) {
		font-size:10px;   
		margin-Left:5px;
}
`;
export const ConnectWalletButton = styled.button`
	background: transparent;
	border: none;
	font-size:14px;
	color:${colors.white};
	cursor: pointer;
	padding: 0;
	margin:0;
	width:80%;
		
	@media (max-width: ${screenSizes.mediaS}px) {
		width:90%;
		font-size:10px;   
		margin-Left:5px;
		// margin-left:10px;
		// background:red;
}
`;
