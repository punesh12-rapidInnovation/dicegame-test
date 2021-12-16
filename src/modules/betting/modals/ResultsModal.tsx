import { useState, useEffect } from "react";
import { ModalContent, ModalBody } from "./style";
import { BoxTitle, TR, TD, Box, H1, TableBox } from "modules/LastRolls/style";
import { convertToEther } from "utils/helper";
import Diceicon from "../../../assets/icons/Diceicon.svg";
import Lossicon from "../../../assets/icons/Lossicon.svg";
import Winicon from "../../../assets/icons/Winicon.svg";

const ResultsModal = (props: any) => {
  const { show, toggleModal, styles } = props;

  const LastRolls = JSON.parse(localStorage.getItem("LastRolls") || "[]");

  const NoResultMessage = () => {
    if (localStorage.getItem("LastRolls") === null) {
      return <H1>No Previous Result Was Found</H1>;
    } else {
      return;
    }
  };

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <ModalBody show={show} onMouseDown={handleClickOutside} style={{ ...styles }}>
      <Box
        style={{
          width: "600px",
          height: "550px",
          padding: "20px",
          background: "#2A1966",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <BoxTitle>
          YOUR LAST ROLLS <img src={Diceicon} alt="" style={{ marginLeft: "10px" }} />
        </BoxTitle>

        <TableBox style={{ height: "85%", width: "95%" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <TR style={{ height: "30px" }}>
                <TD style={{ textAlign: "left" }}># DATE AND TIME</TD>
                <TD>BET AMOUNT</TD>
                <TD>MIN CHANCE</TD>
                <TD>GAIN/LOSS</TD>
              </TR>

              {NoResultMessage()}

              {LastRolls.slice(0, 10).map((Roll: any, index: any) => (
                <TR key={"k" + index}>
                  <TD style={{ textAlign: "left" }}>
                    #{index + 1} - {Roll.Date}
                  </TD>
                  <TD>{Roll.BetAmount}</TD>
                  <TD>{Roll.Playernumber - 1}%</TD>
                  {Roll.Status === "1" ? (
                    <TD>
                      {" "}
                      <img src={Winicon} style={{ marginRight: "5px" }} />
                      {(convertToEther(Roll.Value) - Roll.BetAmount).toFixed(5)}
                    </TD>
                  ) : (
                    <TD>
                      <img src={Lossicon} style={{ marginRight: "5px" }} />
                      {convertToEther(Roll.Value).substring(0, 7)}
                    </TD>
                  )}
                </TR>
              ))}
            </tbody>
          </table>
        </TableBox>
      </Box>
    </ModalBody>
  );
};

export default ResultsModal;
