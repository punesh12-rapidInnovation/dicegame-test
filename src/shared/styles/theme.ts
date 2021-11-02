import { createGlobalStyle } from 'styled-components';

import ThemeBackground from '../../assets/images/theme-background.svg';

export interface Colors {
	themeBackground: string;
	black: string;
	white: string;
	primary: string;

}

export const colors: Colors = {
	themeBackground: '#000',
	black: '#000000',
	white: '#ffffff',
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
const AvenirLTStd = '';

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: AvenirLTStd;
  src: url(${AvenirLTStd}) format('truetype');
}

body{
	// background: url(${ThemeBackground});
	// background-size: cover;
	// background-repeat: no-repeat;
	// background-position: center;	
	
	// background-color: ${colors.themeBackground};	

	
}
`;
