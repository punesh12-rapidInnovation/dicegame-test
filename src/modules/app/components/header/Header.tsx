import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, setChainIdValue } from '../../../../logic/action/wallet.action';
import ConnectWallet from '../../../../shared/Connect-wallet';
import web3 from '../../../../utils/web3';
import { HeaderContainer } from './style';

const Header = () => {
    const dispatch = useDispatch()
    const { walletBalance, walletConnectCheck } = useSelector(
        (state: any) => state.wallet
    );

    const [connectWallet, setConnectWallet] = useState(false);
    const [walletAddress, setWalletAddress] = useState('')



    React.useEffect(() => {
        //@ts-ignore
        const walletConnect = JSON.parse(localStorage.getItem("walletConnected"));
        setConnectWallet(walletConnect);
        //@ts-ignore
        const address = JSON.parse(localStorage.getItem("address"));
        setWalletAddress(address);

    }, [connectWallet, setConnectWallet, walletConnectCheck]);

    React.useEffect(() => {
        const changedAccountAddress = async () => {
            web3.currentProvider.on("accountsChanged", async function () {
                let accounts = await web3.eth.getAccounts();
                localStorage.setItem("address", JSON.stringify(accounts));
                setWalletAddress(accounts[0])
                dispatch(Login(accounts[0]));
            });

            web3.currentProvider.on('chainChanged', (chainId: number) => {
                dispatch(setChainIdValue(chainId));
            });
        };
        changedAccountAddress();
    }, [dispatch]);


    return (
        <div>
            <HeaderContainer>
                <ConnectWallet
                    connectWallet={connectWallet}
                    walletAddress={walletAddress}
                    walletBalance={walletBalance}
                    setConnectWallet={setConnectWallet}
                    setWalletAddress={setWalletAddress}
                />
            </HeaderContainer>
        </div>
    );
};

export default Header;