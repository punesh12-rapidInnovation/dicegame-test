import React from "react";
import { ModalBody } from "modules/betting/modals/style";

const DisableModal = (props: any) => {
  const { show, setdisclaimer, setDisable } = props;

  const showDisclaimer = () => {
    setDisable(false);
    setdisclaimer(true);
  };

  return <ModalBody show={show} onMouseDown={showDisclaimer}></ModalBody>;
};

export default DisableModal;
