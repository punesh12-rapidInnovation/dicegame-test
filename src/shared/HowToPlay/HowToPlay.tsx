
import { Close, ModelHead } from "shared/custom-modal/style";
import { PlayCont, ModalBody, ModalContent, Title } from "./style";
import Cross from "assets/icons/Cross.svg";
import Header from "assets/images/Header.png";
import HeaderLoggedIn from "assets/images/header-loggedIn.png";
import walletOptions from "assets/images/walletOptions.png";
import rangeSlider from "assets/images/rangeSlider.png";
import oddEven from "assets/images/oddEven.png";
import range from "assets/images/range.png";
import housePool from "assets/images/housepool.png";

const HowToPlayModal = (props: any) => {
  const { show, toggleModal } = props;

  const crossFunction = () => {
    toggleModal();
  };
  return (
    <ModalBody show={show}>
      <ModalContent>
        <ModelHead>
          <h2>HOW TO PLAY</h2>
          <Close src={Cross} onClick={() => crossFunction()} />
        </ModelHead>

        <PlayCont>
          <Title>HOW TO CONNECT YOUR WALLET:</Title>
          <ol>
            <li>
              To play, start by clicking on “Connect Wallet” on the top of the site:
              <img src={Header} alt="" />
            </li>
            <li>
              Choose the type of wallet to connect: <br />
              <img src={walletOptions} alt=""
                style={{ width: '45%', display: "block", margin: "0 auto" }}
              />
            </li>
            <li>
              The balance of Pulse (PLS) in your wallet will be displayed when you are correctly connected:
              <img src={HeaderLoggedIn} alt="" />
            </li>
          </ol>
          <Title>HOW TO PLACE A WAGER:</Title>
          <ol>
            <li>
              (BASIC - ROLL UNDER) <br />
              The most basic wager to place is to choose a number on the slide bar between 2 to 99.
              If the outcome on the dice is less than the number selected, the player wins.  If the number rolled is the same or higher than what was selected on the slide bar, the player loses.
              <img src={rangeSlider} alt="" />
              Advanced Options (optional) - Click Advanced Options to see the drop down options.
            </li>
            <li>
              User may select Odd/Even or Range or Odd/Even and Range <br />
              <br />
              Choose odd or even: <br />
              <img src={oddEven} alt="" />

              Then select the range:
              <img src={range} alt="" /> <br />
              (If the player wished to wager on one number, 13 for example, the range would have to be set to 12 and 14)
            </li>
          </ol>
          <Title>HOW TO STAKE WITH THE HOUSE</Title>
          <ol>
            <li>To put stake in the house, follow steps 1-3 above and connect a wallet.</li>
            <li>Deposit funds: <br />
              <img src={housePool} alt=""
                style={{ display: "block", width: '50%', margin: "0 auto" }}
              />
              <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                Note: Funds will be locked for a 24 hour period during which rewards will accumulate but only after the 24 hour period will the funds be able to be withdrawn. While the funds remain in the House Pool, they will continue to earn share of the reward.
              </p>
            </li>
          </ol>

        </PlayCont>
      </ModalContent>
    </ModalBody>
  );
};

export default HowToPlayModal;