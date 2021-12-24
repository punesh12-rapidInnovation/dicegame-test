import {
	GET_BALANCE,
	LOGIN,
	SET_CHAINID,
	WALLET_CONNECT_CHECK,
	SET_MESSAGE
} from './constants';

const initialState = {
	userAddress: '',
	chainId: '',
	walletBalance: '',
	chatMessage: []
};

const walletReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case WALLET_CONNECT_CHECK:
			return {
				...state,
				walletConnectCheck: action.value,
			};

		case LOGIN:
			return {
				...state,
				userAddress: action.address,
			};

		case SET_CHAINID:
			return {
				...state,
				chainId: action.value,
			};
		case GET_BALANCE:
			return {
				...state,
				walletBalance: action.value,
			};
		case SET_MESSAGE:
			return {
				...state,
				chatMessage: action.value,
			};

		default:
			return state;
	}
};

export default walletReducer;
