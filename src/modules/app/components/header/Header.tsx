import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, setChainIdValue, setWalletBalance } from '../../../../logic/action/wallet.action';
import ConnectWallet from '../../../../shared/Connect-wallet';
import web3 from '../../../../utils/web3';
import { HeaderContainer, Walletcontainer, WalletLogo, Walletoutline, H1 } from './style';
import sitelogo from '../../../../assets/icons/sitelogo.png';
import walletlogo from '../../../../assets/icons/walleticon.png';
import walletoutline from '../../../../assets/icons/walletoutline.png';
import { convertToEther } from '../../../../utils/helper';

const Header = () => {
    const dispatch = useDispatch()
    const { walletConnectCheck, chainId } = useSelector(
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


    useEffect(() => {
        const getWalletBalance = async () => {
            try {
                if (walletAddress) {
                    const address = walletAddress.toString()
                    const balance = await web3.eth.getBalance(address);
                    dispatch(setWalletBalance(convertToEther(balance)));
                }

            } catch (error) {
                console.log(error);
            }
        }
        getWalletBalance()
    }, [walletAddress, dispatch, chainId])

    return (
        <HeaderContainer>
            <img src={sitelogo} alt="" />
            <Walletcontainer>
                <WalletLogo src={walletlogo} />
                <Walletoutline src={walletoutline} />
                <H1>99.02</H1>
            </Walletcontainer>
            <ConnectWallet 
                connectWallet={connectWallet}
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                setConnectWallet={setConnectWallet}
                showWalletContent
            />



        </HeaderContainer>
    );
};

export default Header;