import { useDispatch } from "react-redux";
import { setupNetwork } from "utils/wallet";
import {
  ModalBody,
  ModalContent,
  ModelHead,
  InnerContent,
} from "./style";
import Cross from 'assets/icons/Cross.svg';
import { PrimaryButton } from "shared/button/Button";


const WrongNetwork = (props: any) => {
  const { show, toggleModal, heading, styles } = props;

  const dispatch = useDispatch()

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };


  const handleSwitchNetwork = async () => {
    const walletType = localStorage.getItem('walletType');
    // const web3 = await getWeb3Instance(walletType)
    await setupNetwork(dispatch, walletType)
    window.location.reload()
  }

  return (
    <ModalBody
      show={show}
      onMouseDown={handleClickOutside}
      style={{ ...styles }}
    >
      <ModalContent>
        <ModelHead>
          <h2>
            Wrong Network
          </h2>
          {/* <Close
            src={Cross}
            onClick={() => toggleModal(!show)}
          /> */}
        </ModelHead>

        <InnerContent>
          <PrimaryButton
            onClick={() => handleSwitchNetwork()}
          >Change network</PrimaryButton>
        </InnerContent>
      </ModalContent>
    </ModalBody>
  );
};
export default WrongNetwork;
