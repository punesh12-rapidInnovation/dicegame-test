import Web3 from 'web3';

let web3: any;
declare let window: any;
try {

	if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
		web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	} else {
		// const provider=new Web3.providers.WebsocketProvider("wss://apis.ankr.com/wss/4171d6874fbb4dc382e50da31c79a989/a5ef8b43dc777129416e6d0b81d3dd86/binance/full/test")
		const provider = new Web3.providers.HttpProvider(
			'https://data-seed-prebsc-1-s1.binance.org:8545/'
		);
		web3 = new Web3(provider);
	}
} catch (error) {
	console.log(error);
	const provider = new Web3.providers.HttpProvider(
		'https://data-seed-prebsc-1-s1.binance.org:8545/'
	);
	web3 = new Web3(provider);
}

console.log('web3', web3)
export default web3;
