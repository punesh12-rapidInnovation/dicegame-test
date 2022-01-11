// import {
//     ModalBody,
//     ModalContent,
//     ModelHead,
//     Close,
//   } from "./style";
import CustomModal from 'shared/custom-modal';
// import { TransImgCircle } from './style';


const TransactionError = (props: any) => {
  const { show, toggleModal } = props;
  return (
    <CustomModal
      show={show}
      toggleModal={toggleModal}
      heading={"Transaction Rejected"}
    >
    </CustomModal>
  );
};
export default TransactionError;
