import { createGlobalStyle } from "styled-components";

const BalooDa = require("assets/fonts/BalooDa2.ttf");

export interface Colors {
  themeBackground: string;
  black: string;
  white: string;
  green: string;
  red: string;
  vibrantRed: string;
  purple: string;
  darkPurple: string;
  yellow: string;
  primary: string;
}

export const colors: Colors = {
  themeBackground: "#000",
  black: "#000000",
  white: "#ffffff",
  green: "#6FCF97",
  red: "#EB5757",
  vibrantRed: "#FF221C",
  purple: "#BB6BD9",
  darkPurple: "#53084d",
  yellow: "#FFFE0E",
  primary: "#00EAFF",
};

export interface ThemeStarter {
  [propName: string]: string | undefined;
  themeBackground: string;
  black: string;
  white: string;
}

export const theme: ThemeStarter = {
  black: colors.black,
  white: colors.white,
  green: colors.green,
  yellow: colors.yellow,
  red: colors.red,
  vibrantRed: colors.vibrantRed,
  purple: colors.purple,
  darkPurple: colors.darkPurple,
  themeBackground: colors.themeBackground,
};

export interface ScreenSizes {
  mediaXS: number;
  mediaS: number;
  mediaM: number;
  mediaL: number;
  mediaXL: number;
  mediaXLL: number;
  mediaXXL: number;
  mediaXXXX: number;
}
export const screenSizes: ScreenSizes = {
  mediaXS: 360,
  mediaS: 850,
  mediaM: 1024,
  mediaL: 1110,
  mediaXL: 1280,
  mediaXLL: 1440,
  mediaXXL: 1600,
  mediaXXXX: 1800,
};

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: AvenirLTStd;
src: AvenirLTStd format('truetype'), AvenirLTStd format('woff2'),  url('https://fonts.cdnfonts.com/css/avenir-lt-std') format('truetype'), url('http://fonts.cdnfonts.com/css/avenir-lt-std') format('woff2');

}
}
@font-face {
  font-family: BalooDa2;
  src: url(${BalooDa}) format('woff');
}

body{
	font-family: AvenirLTStd, sans-serif;
}
`;
