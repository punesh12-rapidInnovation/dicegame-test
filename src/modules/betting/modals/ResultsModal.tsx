import { ModalContent, ModalBody } from "./style";
import { BoxTitle, TR, TD } from "modules/LastRolls/style";
import { convertToEther } from "utils/helper";
import Diceicon from '../../../assets/icons/Diceicon.svg';
import Lossicon from '../../../assets/icons/Lossicon.svg';
import Winicon from '../../../assets/icons/Winicon.svg';




 const ResultsModal = (props: any) => {
     const { show, toggleModal, styles } = props;
     
     const LastRolls = JSON.parse(localStorage.getItem("LastRolls") || "[]");


    const handleClickOutside = (e: any) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
     };
     
     
     return (
         <ModalBody
         show={show}
            onMouseDown={handleClickOutside}
             style={{ ...styles }}
         >
             <ModalContent style={{height:'600px',width:'600px',justifyContent:'flex-start'}}>
                 <BoxTitle>YOUR LAST 10 ROLLS <img src={Diceicon} alt="" style={{ marginLeft: '10px' }}/></BoxTitle>
                        <div style={{width: '100%', boxShadow: "inset 0px 0px 24px #ca1ae733", borderRadius: "20px",color:"#fff",padding:"20px 10px",marginTop:'30px',paddingBottom:'40px'}}>
                            <table style={{width:"100%"}}>
                                <TR style={{height:'40px'}}>
                                    <TD style={{textAlign:'left'}}># DATE AND TIME</TD>
                                    <TD>BET AMOUNT</TD>
                                    <TD>MIN CHANCE</TD>
                                    <TD>GAIN/LOSS</TD>
                                </TR>
                        {
                        LastRolls.slice(0,10).map((Roll: any,index:any) => (
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

                

             </ModalContent>



             
            
        </ModalBody>
    )
}

export default ResultsModal
