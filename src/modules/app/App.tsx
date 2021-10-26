import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Login, setWalletBalance } from '../../logic/action/wallet.action';
import ConnectWallet from '../../shared/Connect-wallet';
import { GlobalStyle, theme } from '../../shared/styles/theme';
import { convertToEther } from '../../utils/helper';
import wallet from '../../utils/wallet';
import Routes from './components/routes/Routes';

const App = (props: any) => {

  const dispatch = useDispatch()



  // useEffect(() => {

  //   const getChangedAddress = async () => {

  //     try {
  //       const type = localStorage.getItem('type')

  //       //@ts-ignore
  //       const address = await wallet.login(type);
  //       dispatch(Login(address));

  //       if (address) {
  //         const balance = await wallet.web3.eth.getBalance(address);
  //         dispatch(setWalletBalance(convertToEther(balance)));
  //         console.log(' balance', convertToEther(balance));

  //       }
  //     }
  //     catch (error) {
  //       console.log(error);

  //     }

  //   }
  //   getChangedAddress();
  // }, [])

  return (
    <div>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </div>


  );
}

export default App;
