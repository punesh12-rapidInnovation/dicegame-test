import LiveChat from "../../modules/liveChat";
import {
  Landingdiv,
  Beonediv,
  Flexcol,
  Beoneimagediv,
  Beoneimg,
  H1,
  H2,
  H3,
  Playerrank,
  Rankimg,
} from "./style";
import { Flex, FlexColumn } from "../../modules/betting/style";
import Beoneimage from "../../assets/images/beoneimage.png";
import rectangle from "../../assets/images/rectangle.png";
import playerrank from "../../assets/icons/playerrank.svg";
import PlayersImage from "../../assets/images/PlayersImage.png";
import { PrimaryButton } from "shared/button/Button";
import history from "shared/helpers/history";
import { Paths } from "modules/app/components/routes/types";
import Header from "modules/app/components/header";
import { Link } from "pages/housePool/style";
import { useState, useEffect } from "react";
import Disclaimer from "shared/Disclaimer/Disclaimer";
import { screenSizes } from "shared/styles/theme";
import LandingMobile from "./LandingMobile";
import LandingDesktop from "./LandingDesktop";

const LandingPage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [window.innerWidth, window.innerHeight]);

  return width < screenSizes.mediaS ? (
    <LandingMobile />
  ) : (
    <LandingDesktop />

    // <Landingdiv>
    //   <Header />
    //   <Beonediv>
    //     <Flexcol style={{ transform: "translatey(15%)" }}>
    //       <H2>EVERY DAY LOTS OF WINS</H2>
    //       <H1>BE ONE OF THEM</H1>
    //       <H3>
    //         Choose you odds and roll the dice to win pulse and prizes,invest,exchange,and join the contest
    //         with high rewards at pulseroll
    //       </H3>
    //       <Link style={{ marginTop: "20px" }} onClick={() => setshowDisclaimer(true)}>
    //         Read our disclaimer to know more
    //       </Link>
    //     </Flexcol>
    //     <Beoneimagediv>
    //       <Beoneimg src={Beoneimage} alt="" />
    //     </Beoneimagediv>
    //   </Beonediv>
    //   <Playerrank>
    //     <FlexColumn
    //       style={{
    //         padding: "10px",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         width: "100px",
    //       }}
    //     >
    //       <Rankimg src={playerrank} alt="" />
    //     </FlexColumn>
    //     <Flex style={{ width: "60%", justifyContent: "flex-end" }}>
    //       <img src={PlayersImage} alt="" style={{ height: "65px", marginRight: "50px" }} />
    //       <PrimaryButton onClick={() => history.push(`${Paths.housePool}`)}>DEPOSIT FUNDS</PrimaryButton>
    //     </Flex>
    //   </Playerrank>
    //   <LiveChat />
    //   <Disclaimer show={showDisclaimer} toggleModal={() => setshowDisclaimer(false)} />
    // </Landingdiv>
  );
};

export default LandingPage;
