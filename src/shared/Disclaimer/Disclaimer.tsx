import React, { useEffect, useState } from "react";
import { Close, ModelHead } from "shared/custom-modal/style";
import { DisclaimerCont, ModalBody, ModalContent, CheckCont } from "./style";
import Cross from "assets/icons/Cross.svg";
import { PrimaryButton } from "shared/button/Button";
import Alertmsg from "modules/betting/modals/Alertmsg";

const Disclaimer = (props: any) => {
  const [LocalAgree, setLocalAgree] = useState<boolean>();
  const [AlertModalState, setAlertModalState] = useState(false);
  const [CheckedState, setCheckedState] = useState<boolean>(false);
  const { show, toggleModal } = props;

  let ShowDisclaimer = localStorage.getItem("ShowDisclaimer") || "";

  const CheckedOrNot = () => {
    const localChecked = localStorage.getItem("ShowDisclaimer");
    if (localChecked === null || localChecked === "false") {
      setCheckedState(false);
    } else {
      setCheckedState(true);
    }
  };

  useEffect(() => {
    CheckedOrNot();
  }, [ShowDisclaimer]);

  let Agree = localStorage.getItem("Agree") || ""
  useEffect(() => {
    if (localStorage.getItem("Agree") === "true") {
      setLocalAgree(true);
    } else {
      setLocalAgree(false);
    }
  }, [Agree]);

  const crossFunction = () => {
    toggleModal();
  };

  const closingAgreeModal = () => {
    setAlertModalState(false);
  };

  const setAgree = () => {
    localStorage.setItem("Agree", "true");
    toggleModal();
  };

  const SetLocalShowDisclaimer = () => {
    if (CheckedState) {
      localStorage.setItem("ShowDisclaimer", "false");
      setCheckedState(false);
    } else {
      localStorage.setItem("ShowDisclaimer", "true");
      setCheckedState(true);
    }
  };

  return (
    <ModalBody show={show}>
      <ModalContent>
        <ModelHead>
          <h2>Disclaimer</h2>
          <Close src={Cross} onClick={() => crossFunction()} />
        </ModelHead>

        <DisclaimerCont>
          <ul>
            <li>
              Responsibility for engaging with these sites and the associated contracts is the sole responsibility of the individual.
              Read through the Terms and Conditions linked below for more information.
            </li>
            <li>
              Gambling is an activity that can cause stress and addiction which can lead to a series of irresponsible behaviors.
              If gambling is a behavior which becomes detrimental or a hindrance to your ability to live a healthy life, please seek help.
            </li>
            <li>
              Trading destroys your health and relationships, to lose money, or take another's who has it as bad.
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
                  fontStyle: "italic",
                  opacity: "0.5",
                }}
              >
                Please read the disclaimer to proceed
              </p>
            </div>
          )}

          <CheckCont>
            <label className="container" style={{ color: "white" }}>
              Do not show this message again
              <input type="checkbox" checked={CheckedState} onChange={SetLocalShowDisclaimer} />
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
