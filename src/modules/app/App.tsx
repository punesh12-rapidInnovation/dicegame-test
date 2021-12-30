import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "../../shared/styles/theme";
import Routes from "./components/routes/Routes";
import SocketContextProvider from "../app/context/socket";

const App = (props: any) => {
  return (
    <SocketContextProvider>
      <div>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </div>
    </SocketContextProvider>
  );
};

export default App;
