import React from 'react'
import { Box, BoxTitle, TR, TD } from './style';
import { PrimaryButton } from 'shared/button/Button';
import Diceicon from '../../assets/icons/Diceicon.svg';

function LastRolls() {
    const LastRolls = JSON.parse(localStorage.getItem("LastRolls") || "[]");
    console.log(LastRolls);
    return (
        <Box style={{width: '45%',maxWidth:'700px',height:'400px',marginRight:'20px',marginTop:'30px',padding:"20px",background:"#2A1966",display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column'}}>
            <BoxTitle>YOUR LAST ROLLS <img src={Diceicon} alt="" style={{ marginLeft: '10px' }}/></BoxTitle>
                        <div style={{width: '100%', boxShadow: "inset 0px 0px 24px #ca1ae733", borderRadius: "20px",color:"#fff",padding:"20px 30px",height:'250px',marginTop:'30px',paddingBottom:'40px'}}>
                            <table style={{width:"100%"}}>
                                <TR style={{height:'40px'}}>
                                    <TD style={{textAlign:'left'}}># DATE AND TIME</TD>
                                    <TD>BET AMOUNT</TD>
                                    <TD>MIN CHANCE</TD>
                                    <TD>GAIN/LOSS</TD>
                                </TR>
                                <TR>
                                    <TD style={{textAlign:'left'}}>#1 - 23|Oct|2022 - 19:11</TD>
                                    <TD>23.36 PLS</TD>
                                    <TD>26%</TD>
                                    <TD>40 PLS</TD>
                                    
                                </TR>
                                <TR>
                                    <TD style={{textAlign:'left'}}>#1 - 23|Oct|2022 - 19:11</TD>
                                    <TD>23.36 PLS</TD>
                                    <TD>26%</TD>
                                    <TD>40 PLS</TD>
                                    
                                </TR>
                                 <TR>
                                    <TD style={{textAlign:'left'}}>#1 - 23|Oct|2022 - 19:11</TD>
                                    <TD>23.36 PLS</TD>
                                    <TD>26%</TD>
                                    <TD>40 PLS</TD>
                                    
                                </TR>
                                <TR>
                                    <TD style={{textAlign:'left'}}>#1 - 23|Oct|2022 - 19:11</TD>
                                    <TD>23.36 PLS</TD>
                                    <TD>26%</TD>
                                    <TD>40 PLS</TD>
                                    
                                </TR>
                            </table>
                        </div>
                        <PrimaryButton style={{width:'50%',transform:'translatey(-25px)'}}>SHOW MORE</PrimaryButton>
        </Box>
    )
}

export default LastRolls
