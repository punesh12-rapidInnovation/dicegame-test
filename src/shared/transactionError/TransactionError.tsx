// import {
//     ModalBody,
//     ModalContent,
//     ModelHead,
//     Close,
//   } from "./style";
import { useState } from "react";
import CustomModal from 'shared/custom-modal';
// import { TransImgCircle } from './style';
  
  
  const TransactionError = (props: any) => {
    const { show, toggleModal, heading, styles } = props;
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
  