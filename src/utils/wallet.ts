import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import detectEthereumProvider from '@metamask/detect-provider';
import { Networks, WalletTypes } from './constant';
import {
	walletTestConnectId,
	walletMainConnectId,
	networkTestChainId,
	networkMainChainId,
} from '../config';
import { Login, setChainIdValue } from '../logic/action/wallet.action';
import web3 from './web3';

class Wallet {
	web3: any;
	walletType = 0;

	constructor() {
		this.web3 = new Web3(Web3.givenProvider);
	}

	getNetwork = (network: string): string => {
		switch (network) {
			case Networks.mainnet:
				return 'Mainnet';

			case Networks.ropsten:
				return 'Ropsten';

			case Networks.rinkeby:
				return 'Rinkeby';

			case Networks.goerli:
				return 'Goerli';

			case Networks.kovan:
				return 'Kovan';

			case Networks.moonBaseAlpha:
				return 'MoonBaseAlpha';

			default:
				return 'Unknown';
		}
	};

	async setProvider(type: number) {
		let provider;
		switch (type) {
			case WalletTypes.metamask:
				provider = await detectEthereumProvider();
				const { ethereum } = window;

				if (provider === ethereum) {
					//@ts-ignore
					this.web3.setProvider(provider);
					this.walletType = type;
				}
				// //@ts-ignore
				// this.web3.setProvider(window.BinanceChain);
				//   this.walletType = type;

				break;

			case WalletTypes.walletConnect:
				provider = new WalletConnectProvider({
					// infuraId:'0fe795d7c0254f8096cdeba845d83e99'
					rpc: {
						//@ts-ignore
						[networkMainChainId]: walletMainConnectId,
						[networkTestChainId]: walletTestConnectId,
					},
					chainId: 56,
					bridge: 'https://bridge.walletconnect.org',
					qrcode: true,
					pollingInterval: 12000,
				});
				this.walletType = type;
				//@ts-ignore
				this.web3.setProvider(provider);
				// console.log("curr provider ", this.web3.currentProvider);
				break;

			case WalletTypes.binance:
				//@ts-ignore
				// console.log(window.BinanceChain);
				//@ts-ignore
				this.web3.setProvider(window.BinanceChain);
				this.walletType = type;

				break;
			default:
				throw new Error('Invalid wallet type');
		}
	}

	login = async (type: number, dispatch: any) => {
		let accounts: Array<string>;
		let address: String;

		switch (type) {
			case WalletTypes.metamask:
				//@ts-ignore
				accounts = await this.web3.currentProvider.request({
					method: 'eth_requestAccounts',
				});

				//@ts-ignore
				// const chainId = await this.web3.currentProvider.request({
				//   method: "eth_chainId",
				// });

				if (accounts.length) {
					address = accounts[0];
				} else {
					throw new Error('No account found');
				}
				//@ts-ignore
				this.web3.currentProvider.on(
					'accountsChanged',
					async (accounts: Array<string>) => {
						if (accounts.length) {
							address = accounts[0];
							dispatch(Login(address));
							localStorage.setItem('address', JSON.stringify(address));
						}
					}
				);

				//@ts-ignore
				this.web3.currentProvider.on('chainChanged', (chainId: number) => {
					dispatch(setChainIdValue(chainId));
				});
				break;

			case WalletTypes.walletConnect:
				//@ts-ignore
				accounts = await this.web3.currentProvider.enable();

				// const chainIdWalletConnect = await this.web3.eth.getChainId();

				if (accounts.length) {
					address = accounts[0];
					// window.location.reload();
				} else {
					throw new Error('No account found');
				}

				//@ts-ignore
				this.web3.currentProvider.on('chainChanged', () => {
					window.location.reload();
				});

				//@ts-ignore
				this.web3.currentProvider.on(
					'accountsChanged',
					async (accounts: string[]) => {
						if (accounts.length) {
							address = accounts[0];

							// const chainIdWalletConnect = await this.web3.eth.getChainId();
						}
					}
				);
				this.web3.currentProvider.on(
					'disconnect',
					(code: number, reason: string) => {
						localStorage.clear();
						window.location.reload();
					}
				);
				break;

			case WalletTypes.binance:
				//@ts-ignore
				accounts = await this.web3.currentProvider.request({
					method: 'eth_requestAccounts',
				});
				//@ts-ignore

				//@ts-ignore
				// const binancechainId = await this.web3.currentProvider.request({
				//   method: "eth_chainId",
				// });
				if (accounts.length) {
					address = accounts[0];
				} else {
					throw new Error('No account found');
				}

				//@ts-ignore
				this.web3.currentProvider.on(
					'accountsChanged',
					async (accounts: Array<string>) => {
						//@ts-ignore
						// const chainId = await this.web3.currentProvider.request({
						//   method: "eth_chainId",
						// });

						if (accounts.length) {
							address = accounts[0];
						}
					}
				);

				//@ts-ignore
				this.web3.currentProvider.on('chainChanged', () => {
					window.location.reload();
				});
				break;
			//   case WalletTypes.authereum:
			//     //@ts-ignore
			//     accounts = await this.web3.currentProvider.enable();
			//     if (accounts.length) {
			//       const address = accounts[0];
			//       store.dispatch(login({ address }, "Ropsten"));
			//     } else {
			//       throw new Error("No account found");
			//     }
			//     break;

			//   case WalletTypes.mewWallet:
			//     //@ts-ignore
			//     accounts = await this.web3.currentProvider.enable();

			//     if (accounts.length) {
			//       const address = accounts[0];
			//       store.dispatch(login({ address }, ""));
			//     } else {
			//       throw new Error("No account found");
			//     }
			//     break;

			default:
				throw new Error('Invalid wallet type');
		}
		return address;
	};

	disconnect = async () => {
		switch (this.walletType) {
			case WalletTypes.metamask:
				//@ts-ignore
				await this.web3.currentProvider._handleDisconnect();
				localStorage.clear();
				window.location.reload();
				break;

			case WalletTypes.walletConnect:
				localStorage.clear();
				window.location.reload();
				break;

			case WalletTypes.binance:
				localStorage.clear();
				window.location.reload();
				break;

			//   case WalletTypes.authereum:
			//     //@ts-ignore
			//     await this.web3.currentProvider.disable();
			//     store.dispatch(logout());
			//     break;

			//   case WalletTypes.mewWallet:
			//     //@ts-ignore
			//     await this.web3.currentProvider.disconnect();
			//     store.dispatch(logout());
			//     break;

			default:
				localStorage.clear();
				window.location.reload();
				throw new Error('Invalid wallet type');
		}
	};
}

export const setupNetwork = async (dispatch: any, walletType: any) => {
	const provider = await web3.currentProvider;
	let hexChainId = `0x${networkTestChainId.toString(16)}`;

	const data = [
		{
			chainId: hexChainId,
			chainName: 'Polygon Testnet',
			nativeCurrency: {
				name: 'Matic',
				symbol: 'Matic',
				decimals: 18,
			},
			rpcUrls: [walletTestConnectId],
			blockExplorerUrls: ['https://testnet.bscscan.com/'],
		},
	];

	if (provider) {
		try {
			await provider.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
			});
			return true;
		} catch (error: any) {
			console.error(error);
			//@ts-ignore
			if (error.code === 4001) {
				// dispatch(disconnect(walletType));
			}
			if (error.code === 4902) {
				try {
					await provider
						.request({ method: 'wallet_addEthereumChain', params: data })
						.catch();
				} catch (error) {
					console.error(error);
				}
			}

			return false;
		}
	} else {
		console.error(
			"Can't setup the BSC network on metamask because window.ethereum is undefined"
		);
		return false;
	}
};

export default new Wallet();
