import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConnectWallet from '../../../../shared/Connect-wallet';
import { HeaderContainer } from './style';

const Header = () => {
    const [connectWallet, setConnectWallet] = useState(false);
    const [walletAddress, setWalletAddress] = useState('')
    const { walletBalance, walletConnectCheck } = useSelector(
        (state: any) => state.wallet
    );
    const dispatch = useDispatch()
    React.useEffect(() => {
        //@ts-ignore
        const walletConnect = JSON.parse(localStorage.getItem("walletConnected"));
        setConnectWallet(walletConnect);
        //@ts-ignore
        const address = JSON.parse(localStorage.getItem("address"));
        if (address) {
            var ret = address.replace(/(^"|"$)/g, "");
            setWalletAddress(ret);
            console.log('addess', ret);

        }


    }, [connectWallet, setConnectWallet, walletConnectCheck, localStorage.getItem('address')]);
    return (
        <div>
            <HeaderContainer>
                <ConnectWallet
                    connectWallet={connectWallet}
                    walletAddress={walletAddress}
                    walletBalance={walletBalance}
                    setConnectWallet={setConnectWallet}
                />

            </HeaderContainer>

        </div>
    );
};

export default Header;