import LiveChat from '../../modules/liveChat';
import { Landingdiv, Beonediv, Flexcol, Beoneimagediv, Beoneimg, H1, H2, H3, Playerrank, Rankimg } from './style';
import { Flex, FlexColumn } from '../../modules/betting/style';
import Beoneimage from '../../assets/images/beoneimage.png'
import rectangle from '../../assets/images/rectangle.png'
import playerrank from '../../assets/icons/playerrank.svg'
import PlayersImage from '../../assets/images/PlayersImage.png';
import { PrimaryButton } from 'shared/button/Button';
import history from 'shared/helpers/history'
import { Paths } from 'modules/app/components/routes/types';
import Header from 'modules/app/components/header';


const LandingPage = () => {
    return (
        <Landingdiv>
            <Header/>
            <Beonediv>
                <Flexcol style={{ transform: 'translatey(15%)' }}>
                    <H2>EVERY DAY LOTS OF WINS</H2>
                    <H1>BE ONE OF THEM</H1>
                    <H3>Choose you odds and roll the dice to win pulse and prizes,invest,exchange,and join the contest with high rewards at pulseroll</H3>
                </Flexcol>
                <Beoneimagediv>
                    <Beoneimg src={Beoneimage} alt="" />
                </Beoneimagediv>
            </Beonediv>
            <Playerrank>
                <FlexColumn style={{ padding: '10px', justifyContent: 'center', alignItems: 'center', width: '100px' }}>
                    <Rankimg src={playerrank} alt="" />


                </FlexColumn>
                <Flex style={{ width: '60%', justifyContent: 'flex-end' }}>
                    <img src={PlayersImage} alt="" style={{ height: '65px', marginRight: "50px" }} />
                    <PrimaryButton
                        onClick={() => history.push(`${Paths.housePool}`)
                        }
                    >DEPOSIT FUNDS</PrimaryButton>
                </Flex>

            </Playerrank>



            <LiveChat />

        </Landingdiv>
    );
};

export default LandingPage;