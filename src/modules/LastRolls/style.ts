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
`;

export const H1 = styled.h1`
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
