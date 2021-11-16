import styled from "styled-components";

const RollDice = styled.button`
  width: 100%;
  padding: 17px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    rgba(239, 8, 150, 0.2) -6.9%,
    rgba(112, 7, 255, 0.2) 55.31%,
    rgba(0, 200, 255, 0.2) 107.28%
  );
  box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5),
    inset 0px 0px 14px rgba(202, 26, 231, 0.6);
  border-radius: 10px;
  color: white;
  font-size: 16px;
  border: none;
`;

export const PrimaryButton = (props: any) => {
    return (
        <RollDice>
            {props.children}
        </RollDice>
    )
}

