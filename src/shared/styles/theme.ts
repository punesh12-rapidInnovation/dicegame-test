
import { createGlobalStyle } from 'styled-components';


import ThemeBackground from 'assets/images/theme-background.svg';

const BalooDa = require("assets/fonts/BalooDa2.ttf");
const AvenirLTStd = require("assets/fonts/AvenirLTStd.ttf");




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
	themeBackground: '#000',
	black: '#000000',
	white: '#ffffff',
	green: '#6FCF97',
	red: '#EB5757',
	vibrantRed: '#FF221C',
	purple: '#BB6BD9',
	darkPurple: '#53084d',
	yellow: '#FFFE0E',
	primary: '#00EAFF',
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
	mediaS: 640,
	mediaM: 800,
	mediaL: 1024,
	mediaXL: 1280,
	mediaXLL: 1440,
	mediaXXL: 1600,
	mediaXXXX: 1800,
};

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: AvenirLTStd;
  src: url('http://fonts.cdnfonts.com/css/avenir-lt-std');

}
@font-face {
  font-family: BalooDa2;
  src: url(${BalooDa}) format('woff');
}

body{
	font-family: AvenirLTStd, sans-serif;
}
`;
