import styled from "styled-components";

export const PrimaryButton = styled.button<any>`
  width: ${(props) => props.width ? props.width : '100%'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  color: ${(props) => props.color ? props.color : 'white'};

  padding: 17px;
  cursor: pointer;

  background:  linear-gradient(90deg, rgba(239, 8, 150, 0.5) -6.9%, rgba(112, 7, 255, 0.5) 55.31%, rgba(0, 200, 255, 0.5) 107.28%);
  box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5),
    inset 0px 0px 14px rgba(202, 26, 231, 0.6);
  border-radius: 10px;
  font-size: 16px;
  border: none;
  font-family:AvenirLTStd;
`;


