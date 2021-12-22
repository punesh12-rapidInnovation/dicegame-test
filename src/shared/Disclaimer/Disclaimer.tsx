import { useState, useEffect } from "react";
import { PrimaryButton } from "shared/button/Button";
import { CheckCont, DisclaimerCont } from "./style";
import Alertmsg from "modules/betting/modals/Alertmsg";
import {
  ModelHead,
  ModalBody,
  ModalContent,
  Close,
} from "shared/custom-modal/style";
import Cross from "assets/icons/Cross.svg";

const Disclaimer = (props: any) => {
  const [LocalAgree, setLocalAgree] = useState<boolean>();
  const [ReactAgree, setReactAgree] = useState<boolean>();
  const [AlertModalState, setAlertModalState] = useState(false);
  const { show, toggleModal } = props;

  const CheckedOrNot = () => {
    const localChecked = localStorage.getItem("ShowDisclaimer");
    if (localChecked === null || localChecked === "false") {
      return false;
    } else {
      return true;
    }
  };

  const AgreedOrNot = () => {
    if (localStorage.getItem("Agree") === "true" || ReactAgree) {
      setLocalAgree(true);
    } else{
      setLocalAgree(false);
    }
  };
  console.log(ReactAgree);

  const crossFunction = () => {
    toggleModal();
  };

  const closingAgreeModal = () => {
    setAlertModalState(false);
  };

  useEffect(() => {
    AgreedOrNot();
  }, [ReactAgree]);

  const setAgree = () => {
    localStorage.setItem("Agree", "true");
    setReactAgree(true);
    toggleModal();
    
  };

  const SetLocalShowDisclaimer = () => {
    const localChecked = localStorage.getItem("ShowDisclaimer");
    if (localChecked === null || localChecked === "false") {
      localStorage.setItem("ShowDisclaimer", "true");
    } else {
      localStorage.setItem("ShowDisclaimer", "false");
    }
  };

  return (
    <ModalBody show={show}>
      <ModalContent style={{ width: "600px" }}>
        <ModelHead>
          <h2>Disclaimer</h2>
          <Close src={Cross} onClick={() => crossFunction()} />
        </ModelHead>
        <DisclaimerCont>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolnc non blandit.
            </li>
            <li>
              Eget felis eget nunc lobortis. Sed risus pi ut ornare lectus sit
              amet. Venenatis a condimentum vitae sapien pellentesque habitant
              morbi tristique. Nisl nunc mi ipsum faucibus vitae aliquet nec.
              Mattis enim ut tellus elementum sagittis vitae et. Mattis
              vulputate enim nulla aliquet.
            </li>
            <li>
              {" "}
              Suspendisse potenti nullam ac tortor vitae purus faucibus ornare.
              Est ultricies Pellentesque pulvinar pellentesque habitant morbi
              tristique senectus. Cursus risus at ultrices mi.
            </li>
            <li>
              Duis ut diam quam nulla porttitor massa id neque aliquam. Feugiat
              scelerisqu attis aliquam faucibus purus in massa tempor.{" "}
            </li>
          </ul>
          {LocalAgree ? (
            ""
          ) : (
            <div>
              <PrimaryButton onClick={() => setAgree()}>AGREE</PrimaryButton>
              <p
                style={{
                  marginTop: "10px",
                  color: "white",
                  fontSize: "14px",
                  textAlign: "right",
                }}
              >
                Please read the disclaimer to proceed
              </p>
            </div>
          )}

          <CheckCont>
            <label className="container" style={{ color: "white" }}>
              Do not show this message again
              <input
                type="checkbox"
                onChange={() => SetLocalShowDisclaimer()}
                defaultChecked={CheckedOrNot()}
              />
              <span className="checkmark"></span>
            </label>
          </CheckCont>
        </DisclaimerCont>
      </ModalContent>
      <Alertmsg
        show={AlertModalState}
        toggleModal={() => closingAgreeModal()}
        alertText={"You Need to Agree to the terms to Play the Game"}
      />
    </ModalBody>
  );
};

export default Disclaimer;
