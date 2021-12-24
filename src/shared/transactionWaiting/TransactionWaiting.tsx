// import {
//     ModalBody,
//     ModalContent,
//     ModelHead,
//     Close,
//   } from "./style";
import { useState } from "react";
import CustomModal from 'shared/custom-modal';
import { Inner, Outer, Ring, TransImgCircle } from './style';
  
  
  const TransactionWaiting = (props: any) => {
    const { show, toggleModal, heading, styles } = props;
    return (
        <CustomModal
            show={show}
            toggleModal={toggleModal}
            heading={"Transaction Waiting"}
        >
          <TransImgCircle>
            <Ring>
                <Outer>
                    <Inner>
                    <div style={{color:"#fff"}}>
                        {}
                    </div>
                    </Inner>
                </Outer>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="80px" height="80px">
                    <defs>
                        <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#EF0896" />
                        <stop offset="50%" stop-color="#7007FF" />
                        <stop offset="100%" stop-color="#00C8FF" />
                        </linearGradient>
                    </defs>
                    <circle cx="40" cy="40" r="30" stroke-linecap="round" />
                </svg>
            </Ring>
          </TransImgCircle>
        </CustomModal>
    );
  };
  export default TransactionWaiting;
  