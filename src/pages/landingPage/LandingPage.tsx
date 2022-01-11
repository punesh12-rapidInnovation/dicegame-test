import { useEffect, useState } from "react";
import { screenSizes } from "shared/styles/theme";
import LandingDesktop from "./LandingDesktop";
import LandingMobile from "./LandingMobile";

const LandingPage = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

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
