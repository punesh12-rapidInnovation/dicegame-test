import { colors, screenSizes } from "shared/styles/theme";
import styled from "styled-components";


interface ModalBodyProps {
  show: boolean;
}


export const ModalBody = styled.div<ModalBodyProps>`
display: ${(props) => (props.show ? 'block' : 'none')};
position: fixed;
z-index: 100;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: hidden;
background: rgba(26, 39, 50, 0.7);
-webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);

        	
	@media (max-width: ${screenSizes.mediaS}px) {
    height:100vh;
	}

`;

export const ModalContent = styled.div<any>`
	background-color: ${colors.primary};
	padding: 40px 20px;
	display: inline-block;
	border-radius: 8px;
	margin: 0 auto;
	border: none;
	overflow: auto;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	        transform: translate(-50%, -50%);
	max-height: 100%;
	background: #2A1966;
    -webkit-box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
            box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 24px #CA1AE7;
    border-radius:20px;
	::-webkit-scrollbar {
		width: 0 !important;
	}
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
  width: 524px;

	
	@media (max-width: ${screenSizes.mediaS}px) {
    width: 95%;
    padding:20px;
	overflow: hidden;
	}
`;

export const PlayCont = styled.div<any>`
display:flex;
flex-direction: column;
color: ${colors.white};
overflow-y: auto;
height:65vh;

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #2f2033;
  // background: transaparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(#ef0896 -6.9%, #7007ff 55.31%, #00c8ff 107.28%);
}

ol,
  li {
    font-size: 13px;
    font-weight:100;
    line-height:1.5;
    padding-left:10px;
  }

  ul {
    margin: 30px 0;
  }
  li {
    margin: 10px;
  
    img{ 
      min-width:10%;
      max-width:95%;
      margin:5px;
    }
  
  }
  
	@media (max-width: ${screenSizes.mediaS}px) {
    ul,li {
    font-size: 12px;

  }
	}

`
export const Title = styled.h4`
margin: 10px 0;
color: ${colors.primary};

`

