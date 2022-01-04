import React, { useEffect, useState } from 'react';
import { Close, ModelHead } from 'shared/custom-modal/style';
import { DisclaimerCont, ModalBody, ModalContent, CheckCont } from './style';
import Cross from "assets/icons/Cross.svg";
import { PrimaryButton } from 'shared/button/Button';
import Alertmsg from 'modules/betting/modals/Alertmsg';


const Disclaimer = (props: any) => {
    const [LocalAgree, setLocalAgree] = useState<boolean>();
    const [ReactAgree, setReactAgree] = useState<boolean>();
    const [AlertModalState, setAlertModalState] = useState(false);
    const [CheckedState, setCheckedState] = useState<boolean>(false);
    const { show, toggleModal } = props;

    const CheckedOrNot = () => {
        const localChecked = localStorage.getItem("ShowDisclaimer");
        if (localChecked === null || localChecked === "false") {
            setCheckedState(false);
        } else {
            setCheckedState(true);
        }
    };

    useEffect(() => {
        CheckedOrNot()
    }, [localStorage.getItem("ShowDisclaimer")])

    useEffect(() => {
      if (localStorage.getItem("Agree") === "true" ) {
            setLocalAgree(true);
        } else {
            setLocalAgree(false);
        }
        
    }, [localStorage.getItem("Agree")])

    const crossFunction = () => {
        toggleModal();
    };

    const closingAgreeModal = () => {
        setAlertModalState(false);
    };

    const setAgree = () => {
        localStorage.setItem("Agree", "true");
        toggleModal()
    };

    const SetLocalShowDisclaimer = () => {
        if (CheckedState) {
            localStorage.setItem("ShowDisclaimer", "false");
            setCheckedState(false);
        } else{
            localStorage.setItem("ShowDisclaimer", "true");
             setCheckedState(true);
        }
    };
    console.log(CheckedState);
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
                                    fontStyle: "italic",
                                    opacity: '0.5'
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
                                checked={CheckedState}
                                onChange={SetLocalShowDisclaimer}
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