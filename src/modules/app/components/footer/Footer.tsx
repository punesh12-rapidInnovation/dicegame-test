import { FooterCont, ImageCont } from "./style"
import LinkedIn from 'assets/icons/linkedIn.png'
import Instagram from 'assets/icons/instagram.png'
import Facebook from 'assets/icons/facebook.png'
import Twitter from 'assets/icons/twitter.png'
import Telegram from 'assets/icons/telegram.png'
import history from "shared/helpers/history"
import { Paths } from "../routes/types"



const Footer = () => {
    return (
        <FooterCont>

            <p>© 2022 Dice Game. All rights reserved |
                <span
                    onClick={() => history.push(`${Paths.terms_and_conditons}`)}
                > Terms of Services </span>
            </p>

            <ImageCont>

                <img src={LinkedIn} alt="" />
                <img src={Instagram} alt="" />
                <img src={Facebook} alt="" />
                <img src={Twitter} alt="" />
                <img src={Telegram} alt="" />
            </ImageCont>
        </FooterCont>
    )
}

export default Footer