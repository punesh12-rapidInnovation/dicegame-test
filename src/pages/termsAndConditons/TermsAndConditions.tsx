import { useState } from "react"
import { PrimaryButton } from "shared/button/Button"
import { H1, HeaderDiv, TermsPageContainer, PulseGradient, ModuleParentCont, ModuleCont, UL, LI, MoreTextContainer, DotsSpan, ButtonCont } from "./style"

const TermsAndConditions = () => {

    const [buttonText, setButtonText] = useState('READ MORE');
    const [showMore, setShowMore] = useState(false);

    const handleDisplayMoreText = () => {
        setShowMore(!showMore);
        if (!showMore)
            setButtonText('READ LESS')
        else
            setButtonText('READ MORE')
    }

    return (
        <TermsPageContainer>
            <HeaderDiv>
                <H1><PulseGradient>Terms & condition</PulseGradient></H1>
            </HeaderDiv>
            <ModuleParentCont>
                <ModuleCont>
                    <ModuleCont margin="1rem" width="100%">
                        <p>
                            <UL>
                                <LI>
                                    By using and/or accessing any section of pulseluck.com ("we", "us" or "our"), you ("the Player") agree to the following terms of service, any game rules, promotions, bonuses and special offers which may be found on the pulseluck.com from time to time. Read these terms of service carefully before accepting them. If you do not agree to accept and be bound by the Terms of Service, please do not continue to use pulseluck.com. Your further use of pulseluck.com will constitute your acceptance of Terms of Service.m ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, in.
                                </LI>
                                <LI>
                                    The player is solely responsible to make sure that he is aware of the current terms and conditions and we advise the player to check for updates on a regular basis. Pulseluck.com reserves the right to modify the website, services and software and/or change the system specification requirements necessary to access and use the services at any time without any prior notice.
                                </LI>
                                <LI>
                                    To play PulseLuck.com you must be at least 18 years of age. The service is not for use by individuals under the legal age of majority in their jurisdiction and individuals accessing the service from jurisdictions from which it is illegal to do so. Pulseluck.com cannot verify the legality of the service in each jurisdiction, so it is the user's responsibility to ensure that their usage is lawful.
                                    <DotsSpan display={showMore}>........</DotsSpan>
                                </LI>
                                <MoreTextContainer display={showMore}>

                                    <LI>
                                        You are solely responsible for abiding by any law in your jurisdiction towards online gambling with cryptocurrencies. You acknowledge that the pulseluck.com service allows you to play with virtual currencies. Therefore, during the normal course of using the service, you may lose some or all of the cryptocurrencies you play with. Under no circumstances will we be liable for any of your losses. You are fully aware that there is a risk of losing cryptocurrencies when gambling by means of the services and you are fully responsible for any such loss. You agree that your use of the services is at your sole option, discretion and risk. In relation to your losses you shall have no claims whatsoever against pulseluck.com.
                                    </LI>
                                    <LI>
                                        Internet gambling may not be legal in some jurisdictions. You understand and accept that pulseluck.com is unable to provide you with any legal advice or assurances in respect of your use of services and pulseluck.com makes no representations whatsoever as to the legality of services in your jurisdiction. Use the services on pulseluck.com at your sole option, discretion and risk, you are solely responsible for ascertaining whether it is legal in your jurisdiction.
                                    </LI>
                                    <LI>
                                        Pulseluck.com does not intend to enable you to contravene applicable law. You represent, warrant and agree to ensure that your use of our services will comply with all applicable laws, statutes and regulations. We shall not be responsible for any illegal or unauthorized use of our services by you. You fully understand the methods, rules and procedures of the services and Internet gambling in general.
                                    </LI>
                                    <LI>
                                        We will never give out any personal information. All information you provide will be used solely to operate the pulseluck.com service.
                                    </LI>
                                    <LI>
                                        In the event that a game, network, blockchain or hardware malfunctions, all gameplay during the malfunction period will be void and original bets may be lost in a worst case scenario.
                                    </LI>
                                    <LI>
                                        If you are found to be cheating or abusing PulseLuck.com your IP address will be banned.
                                    </LI>
                                    <LI>
                                        To use pulseluck.com, Javascript must be enabled in your browser. You must be currently synced to the best block on the Ethereum blockchain, otherwise you may lose your original bet.
                                    </LI>
                                    <LI>
                                        Pulseluck.com does not guarantee investment growth. Play and invest at your own risk. Never gamble or invest more than you can afford to lose.
                                    </LI>
                                    <LI>
                                        We do not accept cash or card deposits, only units of Pulse (PLS) for each individual bet. We hold no deposits.
                                    </LI>
                                    <LI>
                                        The minimum bet is 1 PLS. Maximum profit per roll is 1% of total house bank.
                                    </LI>
                                    <LI>
                                        Pulseluck.com offers no guarantee of availability of service. However, we aim, wherever technically possible, to provide a largely uninterrupted service. There may, however, be unavoidable periods of downtime (for example, downtime due to server or code maintenance) to maintain service and data security.
                                    </LI>
                                    <LI>
                                        The user is solely responsible for any applicable taxes that may be payable on cryptocurrencies imposed to you in your jurisdiction, through the use of this service.
                                    </LI>
                                    <LI>
                                        The telecommunications networks and Internet access services required for you to access and use the service are entirely beyond the control of pulseluck.com, and thus we are in no way liable for any outages, slowness, capacity constraints, or other deficiencies affecting the same.
                                    </LI>
                                    <LI>
                                        Pulseluck.com has the right to modify these terms at any time and without any prior notice. Changes to the system can also be made without any notice by the administrator.
                                    </LI>
                                </MoreTextContainer>
                            </UL>
                        </p>

                        <ButtonCont>
                            <PrimaryButton
                                width="25%"
                                onClick={() => handleDisplayMoreText()}
                            >
                                {buttonText}
                            </PrimaryButton>
                        </ButtonCont>
                    </ModuleCont>
                </ModuleCont>
            </ModuleParentCont>
        </TermsPageContainer>
    )
}

export default TermsAndConditions