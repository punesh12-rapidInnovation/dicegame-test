import React,{useState} from 'react'
import { Box, BoxTitle, TR, TD } from './style';
import { PrimaryButton } from 'shared/button/Button';
import Diceicon from '../../assets/icons/Diceicon.svg';
import { convertToEther } from 'utils/helper';
import ResultsModal from 'modules/betting/modals/ResultsModal';
import Lossicon from '../../assets/icons/Lossicon.svg';
import Winicon from '../../assets/icons/Winicon.svg';






function LastRolls() {
    const [resultsmodal, setresultsmodal] = useState(false)
    const LastRolls = JSON.parse(localStorage.getItem("LastRolls") || "[]");
    console.log(LastRolls[5]?.Status);
    console.log('0');
    return (
        <Box style={{width: '45%',maxWidth:'700px',height:'400px',marginRight:'20px',marginTop:'30px',padding:"20px",background:"#2A1966",display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column'}}>
            <BoxTitle>YOUR LAST ROLLS <img src={Diceicon} alt="" style={{ marginLeft: '10px' }}/></BoxTitle>
                        <div style={{width: '100%', boxShadow: "inset 0px 0px 24px #ca1ae733", borderRadius: "20px",color:"#fff",padding:"20px 10px",height:'250px',marginTop:'30px',paddingBottom:'40px'}}>
                            <table style={{width:"100%"}}>
                                <TR style={{height:'40px'}}>
                                    <TD style={{textAlign:'left'}}># DATE AND TIME</TD>
                                    <TD>BET AMOUNT</TD>
                                    <TD>MIN CHANCE</TD>
                                    <TD>GAIN/LOSS</TD>
                                </TR>
                        {
                        LastRolls.slice(0,4).map((Roll: any,index:any) => (
                                <TR>
                                    <TD style={{ textAlign: 'left' }}>#{index + 1} - {Roll.Date}</TD>
                                    <TD>23.36 PLS</TD>
                                <TD>{Roll.Playernumber - 1}%</TD>
                                {
                                    Roll.Status === "1" ? <TD> <img src={Winicon} style={{ marginRight: '5px' }}/>{convertToEther(Roll.Value).substring(0, 6)}</TD> : <TD><img src={Lossicon} style={{ marginRight: '5px' }}/>{convertToEther(Roll.Value).substring(0,6)}</TD>
                                }
                                    
                                </TR>
                        ))
                        
                                }
                            </table>
                        </div>
            <PrimaryButton style={{ width: '50%', transform: 'translatey(-25px)' }} onClick={() => setresultsmodal(true)}>SHOW MORE</PrimaryButton>
            

            <ResultsModal show={resultsmodal} toggleModal={() => setresultsmodal(false)} />
        </Box>
    )
}

export default LastRolls
