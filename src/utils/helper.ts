import web3 from './web3';

export const convertToEther = (amount: any) => {
	return web3.utils.fromWei(amount, 'ether');
};

export const convertToWei = (amount: any) => {
	return web3.utils.toWei(amount, 'ether');
};
