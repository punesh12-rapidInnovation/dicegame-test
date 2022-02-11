import { Content, FooterCont, ImageCont, TabContainer } from "./style"
import pulseLuckLogo from 'assets/icons/pulseLuckLogo.svg'
import history from "shared/helpers/history"
import { Paths } from "../routes/types"



const Footer = () => {
    return (
        <FooterCont>

            <Content>

                <ImageCont>
                    <img src={pulseLuckLogo} alt="" />
                    <p>© 2022 Pulseluck, All rights reserved. </p>
                </ImageCont>


                <TabContainer
                >
                    <p>
                        <a
                            href="https://dev.dejpo3ivkz77h.amplifyapp.com/">
                            GAMES
                        </a>
                    </p>
                    <p
                        onClick={() => history.push(`${Paths.housePool}`)}
                    >HOUSEPOOL</p>
                    <p
                        onClick={() => history.push(`${Paths.terms_and_conditons}`)}
                    >TERMS AND CONDITIONS</p>
                    <p>POLICY</p>
                </TabContainer>
            </Content>
        </FooterCont>
    )
}

export default Footer