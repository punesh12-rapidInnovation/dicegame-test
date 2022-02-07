import {
	GET_BALANCE,
	LOGIN,
	SET_CHAINID,
	WALLET_CONNECT_CHECK,
	SET_MESSAGE,
	SET_LASTROLL,
	SET_REDUXAGREE
} from '../reducer/constants';

export const walletConnectCheck = (value: any) => {
	return {
		type: WALLET_CONNECT_CHECK,
		value: value,
	};
};

export const SetReduxAgree = (value: any) => {
	return {
		type: SET_REDUXAGREE,
		value:value,
	};
};

export const Login = (userAddress: string) => {
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

export const setChatMessage = (message: any) => {

	return {
		type: SET_MESSAGE,
		value: message,
	};
};

export const setLastRollData = (message: any) => {

	return {
		type: SET_LASTROLL,
		value: message,
	};
};
