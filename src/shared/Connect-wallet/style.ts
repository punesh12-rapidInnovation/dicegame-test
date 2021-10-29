import styled from 'styled-components';
import { colors } from '../styles/theme';

export const WalletCont = styled.div`
`;

export const WalletList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const WalletOption = styled.div`
	background: lightgrey;
	border: 1px solid red;
	border-radius: 10px;
	padding: 10px;
	margin: 10px;
	cursor: pointer;
`;
export const AddressInfo = styled.div`
	display: flex;
	flex-direction: column;
	color:${colors.white}
`;
export const ConnectWalletButton = styled.button`
	background: transparent;
	border: none;
	color:${colors.white};
`;
