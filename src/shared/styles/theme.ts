import { createGlobalStyle } from 'styled-components';


import ThemeBackground from '../../assets/images/theme-background.svg';

const BalooDa = require("assets/fonts/BalooDa2.ttf");
const AvenirLTStd = require("assets/fonts/AvenirLTStd.ttf");

export interface Colors {
	themeBackground: string;
	black: string;
	white: string;
	green: string;
	red: string;
	vibrantRed: string;
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
  src: url(${AvenirLTStd}) format('truetype');
}
@font-face {
  font-family: BalooDa2;
  src: url(${BalooDa}) format('truetype');
}

body{
	// background: url(${ThemeBackground});
	// background-size: cover;
	// background-repeat: no-repeat;
	// background-position: center;	
	
	// background-color: ${colors.themeBackground};		
}
`;
