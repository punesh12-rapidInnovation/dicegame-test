import {
	GET_BALANCE,
	LOGIN,
	SET_CHAINID,
	WALLET_CONNECT_CHECK,
} from '../reducer/constants';

export const walletConnectCheck = (value: any) => {
	return {
		type: WALLET_CONNECT_CHECK,
		value: value,
	};
};
export const Login = (userAddress: String) => {
	return {
		type: LOGIN,
		address: userAddress,
	};
};

export const setChainIdValue = (val: any) => {
	return {
		type: SET_CHAINID,
		value: val,
	};
};
export const setWalletBalance = (amount: any) => {
	return {
		type: GET_BALANCE,
		value: amount,
	};
};
