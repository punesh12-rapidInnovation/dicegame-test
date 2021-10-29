import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, setChainIdValue } from '../../../../logic/action/wallet.action';
import ConnectWallet from '../../../../shared/Connect-wallet';
import web3 from '../../../../utils/web3';
import { HeaderContainer,Walletcontainer,WalletLogo,Walletoutline,H1 } from './style';
import sitelogo from '../../../../assets/icons/sitelogo.png';
import walletlogo from '../../../../assets/icons/walleticon.png';
import walletoutline from '../../../../assets/icons/walletoutline.png';

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
           <HeaderContainer>
            <img src={sitelogo} alt="" />
            <Walletcontainer>
                <WalletLogo src={walletlogo}/>
                <Walletoutline src={walletoutline} />
                <H1>99.02</H1>
                
            </Walletcontainer>

             
            </HeaderContainer>
    );
};

export default Header;