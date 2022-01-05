import { screenSizes } from "shared/styles/theme";
import styled from "styled-components";

export const Box = styled.div`
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.1) -6.9%,
    rgba(112, 7, 255, 0.1) 55.31%,
    rgba(0, 200, 255, 0.1) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
  * {
  }
`;
export const BoxCont = styled.div`
  width: 524px;
  height: 550px;
  padding: 20px;
  background-color: #2A1966;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6),
    inset 0px 0px 20px rgba(202, 26, 231, 0.9);
  border-radius: 20px;
  

  @media (max-width: ${screenSizes.mediaS}px) {
    width: 95%;
    margin:10px 0;
    padding:10px 2px;
			}

`;

export const BoxTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const TD = styled.td`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: ${screenSizes.mediaS}px) {
    font-size: 10px;
    font-weight: 100;
    padding:0;
    margin:0;
  }
`;

export const TR = styled.tr`
  height: 35px;
`;

export const TableBox = styled.div`
  position: relative;
  width: 100%;
  box-shadow: inset 0px 0px 24px #ca1ae733;
  border-radius: 20px;
  color: #fff;
  padding: 20px 10px;
  height: 250px;
  margin-top: 30px;
  padding-bottom: 40px;

  
  @media (max-width: ${screenSizes.mediaS}px) {
    padding: 20px 10px;

  }
`;

export const H1 = styled.h1`
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
