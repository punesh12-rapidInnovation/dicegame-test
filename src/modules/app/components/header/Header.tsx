import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login, setChainIdValue, setChatMessage, setWalletBalance } from "logic/action/wallet.action";
import ConnectWallet from "shared/Connect-wallet";
import web3 from "utils/web3";
import { HeaderContainer, Walletcontainer, WalletLogo, HeaderDiv } from "./style";
import siteLogo from "assets/icons/sitelogo.png";
import walletLogo from "assets/icons/walleticon.png";
import { convertToEther } from "utils/helper";
import { networkTestChainId } from "config";
import WrongNetwork from "shared/wrong-network";
import wallet, { removeLocalData } from "utils/wallet";
import CustomModal from "shared/custom-modal";
import Disclaimer from "shared/Disclaimer/Disclaimer";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { walletConnectCheck, chainId } = useSelector((state: any) => state.wallet);
  const [connectWallet, setConnectWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showWrongNetwork, setShowWrongNetwork] = useState(false);

  useEffect(() => {
    try {
      //@ts-ignore
      const walletConnect = JSON.parse(localStorage.getItem("walletConnected"));
      setConnectWallet(walletConnect);
      //@ts-ignore
      const address = JSON.parse(localStorage.getItem("address"));
      setWalletAddress(address);
      dispatch(Login(address));

      const getBalance = async () => {
        if (address) {
          const balance = await web3.eth.getBalance(address);
          dispatch(setWalletBalance(convertToEther(balance)));
        }
      };
      getBalance();
    } catch (err: any) {
      console.log(err);
    }
  }, [connectWallet, setConnectWallet, walletConnectCheck]);

  useEffect(() => {
    const changedAccountAddress = async () => {
      try {
        web3.currentProvider.on("accountsChanged", async function () {
          let accounts = await web3.eth.getAccounts();
          // console.log(accounts);
          localStorage.setItem("address", JSON.stringify(accounts[0]));
          setWalletAddress(accounts[0]);
          dispatch(Login(accounts[0]));

          if (!accounts.length) disconnectWallet();
        });

        web3.currentProvider.on("chainChanged", (chainId: number) => {
          dispatch(setChainIdValue(chainId));
        });
      } catch (err: any) {
        console.log(err);
      }
    };

    changedAccountAddress();
  }, [dispatch]);

  useEffect(() => {
    const getWalletBalance = async () => {
      try {
        if (walletAddress) {
          const address = walletAddress.toString();
          const balance = await web3.eth.getBalance(address);
          dispatch(setWalletBalance(convertToEther(balance)));
        }
        const chainId = await web3.eth.getChainId();
        dispatch(setChainIdValue(chainId));
        if (chainId !== Number(networkTestChainId)) setShowWrongNetwork(true);
      } catch (error) {
        console.log(error);
      }
    };
    getWalletBalance();
  }, [walletAddress, dispatch, chainId]);

  const disconnectWallet = async () => {
    // await web3.disconnect();
    await wallet.disconnect();
    // localStorage.clear();
    removeLocalData();
    dispatch(walletConnectCheck(false));
    window.location.reload();
  };

  return (
    <HeaderDiv>
      <HeaderContainer>
        <div className="invisibleDiv" style={{ width: "100%" }}></div>

        <div style={{ width: "100%" }}>
          <Link to="/landing">
            <img className="siteLogo" src={siteLogo} alt="" />
          </Link>
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
      </HeaderContainer>
      <WrongNetwork
        show={showWrongNetwork}
        // show={true}
        toggleModal={() => disconnectWallet()}
      ></WrongNetwork>

      <CustomModal
        // show={true}
        heading="DISCLAIMER"
      >
        <Disclaimer />
      </CustomModal>
    </HeaderDiv>
  );
};

export default Header;
