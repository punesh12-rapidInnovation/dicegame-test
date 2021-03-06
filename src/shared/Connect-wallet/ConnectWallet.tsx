import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Login,
  setChainIdValue,
  setWalletBalance,
  walletConnectCheck,
} from "../../logic/action/wallet.action";
import { WalletTypes } from "../../utils/constant";
import { convertToEther } from "../../utils/helper";
import wallet, { removeLocalData } from "../../utils/wallet";
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
    walletAddress
  } = props;
  const dispatch = useDispatch();
  const { walletBalance, chainId } = useSelector((state: any) => state.wallet);
  const [showModal, setShowModal] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [walletType] = useState(false);
  const [metamaskNotExist, setMetamaskNotExist] = useState(false)

  const connect = async (type: any) => {
    if (connectWallet) {
      removeLocalData();
      await wallet.disconnect();
      // localStorage.clear();
      dispatch(walletConnectCheck(false));
    } else {
      try {
        await wallet.setProvider(type);
        const address = await (await wallet.login(type, dispatch))?.toString();

        dispatch(Login(address));
        setWalletAddress(address);

        const chainId = await wallet.web3.eth.getChainId();
        dispatch(setChainIdValue(chainId));
        const balance = await wallet.web3.eth.getBalance(address);
        dispatch(setWalletBalance(convertToEther(balance)));

        if (address !== undefined) {
          console.log('reached');
          localStorage.setItem('address', JSON.stringify(address));
          localStorage.setItem("walletConnected", JSON.stringify(true));
          localStorage.setItem("walletType", JSON.stringify(type));
          dispatch(walletConnectCheck(true));
        }
        setShowModal(false);
        setConnectWallet(true);
      } catch (error: any) {
        console.log(error);
        // setErrorModal(true);
        if (error.code === undefined)
          setMetamaskNotExist(true)
      }
    }
  };


  useEffect(() => {
    let walletType = localStorage.getItem('walletType') || "";
    if (walletType === "2")
      connect(2);
  }, [])

  return (
    <WalletCont>
      {showWalletContent ? (
        connectWallet && walletAddress !== null ? (
          <AddressInfo onClick={() => setDisconnectWallet(true)}>
            {isNaN(walletBalance) || walletBalance === ""
              ? "0"
              : parseFloat(walletBalance).toFixed(4)}{" "}
            PLS
          </AddressInfo>
        ) : (
          <ConnectWalletButton onClick={() => setShowModal(true)}>
            Connect Wallet
          </ConnectWalletButton>
        )
      ) : null}

      <CustomModal show={showModal} toggleModal={() => { setShowModal(false); setMetamaskNotExist(false) }}>
        <WalletList>
          {
            metamaskNotExist ? <p style={{ textAlign: 'center', color: "red" }}>Not able to detect the Metamask.</p> : null
          }
          {chainId === 0 ? null : (
            <WalletOption onClick={() => connect(WalletTypes.metamask)}>
              Metamask
            </WalletOption>
          )}
          <WalletOption onClick={() => connect(WalletTypes.walletConnect)}>
            Wallet connect
          </WalletOption>
        </WalletList>
      </CustomModal>

      <CustomModal
        show={disconnectWallet}
        toggleModal={() => setDisconnectWallet(false)}
      >
        <WalletOption onClick={() => connect(walletType)}>Logout</WalletOption>
      </CustomModal>
    </WalletCont >
  );
};

export default ConnectWallet;
