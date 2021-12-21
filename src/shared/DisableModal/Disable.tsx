import React from "react";
import { ModalBody } from "modules/betting/modals/style";

const DisableModal = (props: any) => {
  const { show, set } = props;
  return <ModalBody show={show} onMouseDown={set(true)}></ModalBody>;
};

export default DisableModal;
