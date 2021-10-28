import { FACTORY_ADDRESS, FARM_ADDRESS, ROUTER_ADDRESS } from '../config';
import { ERC20_ABI, FACTORY_ABI, FARM_ABI, LP_ABI, ROUTER_ABI } from './abi';
import wallet from './wallet';

export enum instanceType {
	'ROUTER' = 'ROUTER',
	'FACTORY' = 'FACTORY',
	'LP' = 'LP',
	'ERC20TOKEN' = 'ERC20TOKEN',
	'FARM' = 'FARM',
}
export const selectInstances = async (
	type: any,
	contractAddress?: any
): Promise<any> => {
	switch (type) {
		case 'ROUTER':
			return new wallet.web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
		case 'FACTORY':
			return new wallet.web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);
		case 'LP':
			return new wallet.web3.eth.Contract(LP_ABI, contractAddress);
		case 'ERC20TOKEN':
			return new wallet.web3.eth.Contract(ERC20_ABI, contractAddress);
		case 'FARM':
			return new wallet.web3.eth.Contract(FARM_ABI, FARM_ADDRESS);
		default:
			return null;
	}
};
