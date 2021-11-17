import {
  ModalBody,
  ModalContent,
  ModelHead,
  Close,
} from "./style";
import Cross from 'assets/icons/Cross.svg';


const CustomModal = (props: any) => {
  const { show, toggleModal, heading, styles } =
    props;

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <ModalBody
      show={show}
      onMouseDown={handleClickOutside}
      style={{ ...styles }}
    >
      <ModalContent>
        <ModelHead>
          <h2>{heading}</h2>
          <Close
            src={Cross}
            onClick={() => toggleModal(!show)}
          />
        </ModelHead>
        {props.children}
      </ModalContent>
    </ModalBody >
  );
};
export default CustomModal;
