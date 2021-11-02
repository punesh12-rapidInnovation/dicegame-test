import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Login,
  setChainIdValue,
  setWalletBalance,
  walletConnectCheck,
} from "../../logic/action/wallet.action";
import { WalletTypes } from "../../utils/constant";
import { convertToEther } from "../../utils/helper";
import wallet from "../../utils/wallet";
import CustomModal from "../custom-modal";
import {
  AddressInfo,
  ConnectWalletButton,
  WalletCont,
  WalletList,
  WalletOption,
} from "./style";

const ConnectWallet = (props: any) => {
  const {
    connectWallet,
    setConnectWallet,
    setWalletAddress,
    showWalletContent,
  } = props;
  const dispatch = useDispatch();
  const { walletBalance } = useSelector((state: any) => state.wallet);
  const [showModal, setShowModal] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [walletType] = useState(false);

  const connect = async (type: any) => {
    if (connectWallet) {
      await wallet.disconnect();
      localStorage.clear();
      dispatch(walletConnectCheck(false));
    } else {
      try {
        await wallet.setProvider(type);
        const address = await wallet.login(type, dispatch);
        dispatch(Login(address));
        setWalletAddress(address);
        const chainId = await wallet.web3.eth.getChainId();
        dispatch(setChainIdValue(chainId));
        const balance = await wallet.web3.eth.getBalance(address);
        dispatch(setWalletBalance(convertToEther(balance)));

        if (address !== undefined) {
          localStorage.setItem("address", JSON.stringify(address));
          localStorage.setItem("walletConnected", JSON.stringify(true));
          localStorage.setItem("walletType", JSON.stringify(type));
          dispatch(walletConnectCheck(true));
        }
        setShowModal(false);
        setConnectWallet(true);
      } catch (error) {
        console.log(error);
        // setErrorModal(true);
      }
    }
  };

  return (
    <WalletCont>
      {showWalletContent ? (
        connectWallet ? (
          <AddressInfo onClick={() => setDisconnectWallet(true)}>
            {isNaN(walletBalance) || walletBalance === ""
              ? "0"
              : parseFloat(walletBalance).toFixed(4)}
          </AddressInfo>
        ) : (
          <ConnectWalletButton onClick={() => setShowModal(true)}>
            Connect Wallet
          </ConnectWalletButton>
        )
      ) : null}

      <CustomModal show={showModal} toggleModal={() => setShowModal(false)}>
        <WalletList>
          <WalletOption onClick={() => connect(WalletTypes.metamask)}>
            Metamask
          </WalletOption>
          <WalletOption onClick={() => connect(WalletTypes.walletConnect)}>
            Wallet connect
          </WalletOption>
        </WalletList>
      </CustomModal>

      <CustomModal
        show={disconnectWallet}
        toggleModal={() => setDisconnectWallet(false)}
      >
        <button onClick={() => connect(walletType)}>Logout</button>
      </CustomModal>
    </WalletCont>
  );
};

export default ConnectWallet;
