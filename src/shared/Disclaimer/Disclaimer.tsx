import { PrimaryButton } from 'shared/button/Button';
import { CheckCont, DisclaimerCont } from './style';

const Disclaimer = () => {
    return (
        <DisclaimerCont>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolnc non blandit.</li>
                <li>Eget felis eget nunc lobortis. Sed risus pi ut ornare lectus sit amet. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Nisl nunc mi ipsum faucibus vitae aliquet nec. Mattis enim ut tellus elementum sagittis vitae et. Mattis vulputate enim nulla aliquet.</li>
                <li> Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Est ultricies Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Cursus risus at ultrices mi.</li>
                <li>Duis ut diam quam nulla porttitor massa id neque aliquam. Feugiat scelerisqu attis aliquam faucibus purus in massa tempor.            </li>
            </ul>

            <PrimaryButton>AGREE</PrimaryButton>
            <p>Please read the disclaimer to proceed</p>

            <CheckCont>
                <label className="container">Do not show this message again
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>

            </CheckCont>




        </DisclaimerCont>
    );
};

export default Disclaimer;