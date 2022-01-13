import { walletTestConnectId } from 'config';
import Web3 from 'web3';

let web3: any;
declare let window: any;
try {

	if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
		web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	} else {
		const provider = new Web3.providers.HttpProvider(
			walletTestConnectId
		);
		web3 = new Web3(provider);
	}
} catch (error) {
	console.log('currentprovider is undefined from web3.ts', error);

}

export default web3;
