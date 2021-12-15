import { PrimaryButton } from 'shared/button/Button';
import { CheckCont, DisclaimerCont } from './style';
import { ModelHead,ModalBody,ModalContent,Close } from 'shared/custom-modal/style';
import Cross from 'assets/icons/Cross.svg';


const Disclaimer = (props:any) => {
    const { show, toggleModal } =
        props;
    
    
    const CheckedOrNot = () => {
        const localChecked = localStorage.getItem("ShowDisclaimer")
        console.log(localChecked);
        if (localChecked === null || localChecked === 'false') {
            return false;

        } else {
            return true;
        }
    }
    console.log(CheckedOrNot())
    
    const SetLocalShowDisclaimer = () => {
        const localChecked = localStorage.getItem("ShowDisclaimer")
        if (localChecked === null || localChecked === 'false') { 
            localStorage.setItem("ShowDisclaimer", 'true')
        } else {
            localStorage.setItem("ShowDisclaimer", 'false')
        }
    }
    
    
    return (
        <ModalBody
      show={show}
      
    >
      <ModalContent style={{width:'600px'}}>
        <ModelHead>
          <h2>Disclaimer</h2>
          <Close
            src={Cross}
            onClick={() => toggleModal(!show)}
          />
                </ModelHead>
                <DisclaimerCont><ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolnc non blandit.</li>
                <li>Eget felis eget nunc lobortis. Sed risus pi ut ornare lectus sit amet. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Nisl nunc mi ipsum faucibus vitae aliquet nec. Mattis enim ut tellus elementum sagittis vitae et. Mattis vulputate enim nulla aliquet.</li>
                <li> Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Est ultricies Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Cursus risus at ultrices mi.</li>
                <li>Duis ut diam quam nulla porttitor massa id neque aliquam. Feugiat scelerisqu attis aliquam faucibus purus in massa tempor.            </li>
                </ul>
                    <PrimaryButton onClick={() => toggleModal(!show)}>AGREE</PrimaryButton>
            <p style={{marginTop:'10px',color:'white',fontSize:'14px',textAlign:'right'}}>Please read the disclaimer to proceed</p>

            <CheckCont>
                        <label className="container" style={{ color: 'white' }}>Do not show this message again
                    <input type="checkbox"  onChange={() => SetLocalShowDisclaimer()} defaultChecked={CheckedOrNot()}/>
                    <span className="checkmark"></span>
                </label>

            </CheckCont>
                </DisclaimerCont>
            
      </ModalContent>
    </ModalBody >
  );
};

export default Disclaimer;

