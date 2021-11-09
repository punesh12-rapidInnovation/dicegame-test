import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, setChainIdValue, setWalletBalance } from '../../../../logic/action/wallet.action';
import ConnectWallet from '../../../../shared/Connect-wallet';
import web3 from '../../../../utils/web3';
import { HeaderContainer, Walletcontainer, WalletLogo } from './style';
import siteLogo from '../../../../assets/icons/sitelogo.png';
import walletLogo from '../../../../assets/icons/walleticon.png';
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
                console.log(accounts);
                localStorage.setItem("address", JSON.stringify(accounts[0]));
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
            <div style={{ width: "100%" }}></div>

            <div style={{ width: "100%" }}>
                <img src={siteLogo} alt="" />
            </div>

            <Walletcontainer>
                <WalletLogo src={walletLogo} />
                <ConnectWallet
                    connectWallet={connectWallet}
                    walletAddress={walletAddress}
                    setWalletAddress={setWalletAddress}
                    setConnectWallet={setConnectWallet}
                    showWalletContent
                />


            </Walletcontainer>



        </HeaderContainer >
    );
};

export default Header;