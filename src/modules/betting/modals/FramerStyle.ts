import { motion } from "framer-motion";
import styled from "styled-components";

export const TreasureCont = styled.div`
background:red;

display:flex;
justify-content:center;
align-items:center;
height:50px;
width:50px;

position:relative;


.treasureBox{
height:80px;
// width:150px;
position:absolute;
top:-30px;
left:-30px;

}
 
`
export const CoinImg = styled(motion.img)`
position:absolute;
top:10%;
left:0%;
height:50px;
width:50px;
`