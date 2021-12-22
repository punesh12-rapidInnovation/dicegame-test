import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "../../shared/styles/theme";
import Routes from "./components/routes/Routes";

const App = (props: any) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;
