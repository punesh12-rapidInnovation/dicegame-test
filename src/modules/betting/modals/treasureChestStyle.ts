import styled, { keyframes } from "styled-components";
import { motion } from 'framer-motion';

const example = keyframes`
	0%   {
			  top:0%; 
			  transform: scale(0.1);
			}
 	10%  {
		  top:-20%; 
		transform: scale(0.2)	;
					}
 	20%  { 
		 top:-30%;
		transform: scale(0.3);

		}
 	30%  { 
		 top:-40%; 
		transform: scale(0.4);

		}
 	40% { 
		 top:-30%; 
		transform: scale(0.5);
		}
 	50%  {
		  top:-20%; 
		transform: scale(0.6)	;
					}
 	60%  { 
		 top:-10%;
		transform: scale(0.8);

		}
 	70%  { 
		 top:-20%; 
		transform: scale(1);

		}
 	80% { 
		 top:-30%; 
		transform: scale(1.2);
		}
		
	90%   {
		top:-40%; 
		transform: scale(1.4);
	  }
	  
	100%   {
		top:-50%; 
		transform: scale(1.6);
	  }
`

const example2 = keyframes`
0%   {
			top:0%; left:25%;
			transform: scale(0.1);

		}
 	10%  {
		  top:-5%; 	left:20%;
		  transform: scale(0.2);
		}
 	20%  { 
		 top:-10%; 	left:15%;
		 transform: scale(0.3);


		}
 	30%  { 
		 top:-5%; 	left:10%;
		 transform: scale(0.4);
		}
 	40% { 
		 top:0%; 	left:5%;
		 transform: scale(0.5);

		}
 	50% { 
		 top:5%; 	left:0%;
		 transform: scale(0.6);

		}
 	60% { 
		 top:10%; 	left:-5%;
		 transform: scale(0.7);
		}
 	70% { 
		 top:15%; 	left:-5%;
		 transform: scale(0.8);

		}
 	80% { 
		 top:20%; 	left:-5%;
		 transform: scale(0.9);

		}
 	90% { 
		 top:25%; 	left:-5%;
		 transform: scale(1);

		}
 	100% { 
		 top:30%; 	left:-5%;
		 transform: scale(1.1);

		}`

const example3 = keyframes`
0%   {
	top:0%; left:70%;
	transform: scale(0.1);

}
10%  {
  top:-5%; 	left:75%;
  transform: scale(0.2);

}
20%  {
 top:-10%; 	left:80%;
 transform: scale(0.3);
}
30%  {
 top:-5%; 	left:85%;
 transform: scale(0.4);
}
40% {
 top:0%; 	left:90%;
 transform: scale(0.5);
}
50% {
 top:5%; 	left:95%;
 transform: scale(0.6);
}
60% {
 top:10%; 	left:95%;
 transform: scale(0.7);

}
70% {
 top:15%; 	left:95%;
 transform: scale(0.8);

}
80% {
 top:20%; 	left:95%;
 transform: scale(0.9);

}
90% {
 top:25%; 	left:95%;
 transform: scale(1);

}
100% {
 top:30%; 	left:95%;
 transform: scale(1.1);

}`

const example4 = keyframes`
0%   {
			top:0%; left:75%;
			transform: scale(1);

		}
	  10%  {
		  top:-5%; 	left:80%;
		  transform: scale(1.1);

		}
	  20%  {
		 top:-10%; 	left:85%;
		 transform: scale(1.2);


		}
	  30%  {
		 top:-15%; 	left:90%;
		 transform: scale(1.3);
		}
	  40% {
		 top:-20%; 	left:95%;
		 transform: scale(1.4);
		}
	  50% {
		 top:-15%; 	left:100%;
		 transform: scale(1.5);

		}
	  60% {
		 top:-10%; 	left:110%;
		 transform: scale(1.3);

		}
	  70% {
		 top:-5%; 	left:110%;
		 transform: scale(1.1);

		}
	  80% {
		 top:0%; 	left:110%;
		 transform: scale(0.9);

		}
	  90% {
		 top:5%; 	left:110%;
		 transform: scale(0.7);

		}
	  100% {
		 top:10%; 	left:110%;
		 transform: scale(0.5);

		}
`

const example5 = keyframes`
0%   {
			top:0%; left:20%;
			transform: scale(1);

		}
	  10%  {
		  top:-5%; 	left:15%;
		  transform: scale(1.1);

		}
	  20%  {
		 top:-10%; 	left:10%;
		 transform: scale(1.2);
		}
	  30%  {
		 top:-15%; 	left:5%;
		 transform: scale(1.3);
		}
	  40% {
		 top:-20%; 	left:0%;
		 transform: scale(1.4);
		}
	  50% {
		 top:-15%; 	left:-5%;
		 transform: scale(1.5);
		}
	  60% {
		 top:-10%; 	left:-10%;
		 transform: scale(1.3);
		}
	  70% {
		 top:-5%; 	left:-15%;
		 transform: scale(1.1);

		}
	  80% {
		 top:0%; 	left:-15%;
		 transform: scale(0.9);

		}
	  90% {
		 top:5%; 	left:-15%;
		 transform: scale(0.7);

		}
	  100% {
		 top:10%; 	left:-15%;
		 transform: scale(0.5);

		}
`

const example6 = keyframes`
0%   {
			top:0%; left:25%;
			transform: scale(0.1);

		}
	  15%  {
		  top:-10%; left:20%;
		  transform: scale(0.2);

		}
	  30%  {
		 top:-20%; 	left:15%;
		 transform: scale(0.3);
		}
	  45%  {
		 top:-30%; 	left:10%;
		 transform: scale(0.4);
		}
	  60% {
		 top:-40%; 	left:5%;
		 transform: scale(0.6);
		}
	  75% {
		 top:-50%; 	left:0%;
		 transform: scale(0.7);
		}
	  100% {
		 top:-60%; 	left:-5%;
		 transform: scale(0.8);
		}
`

const example7 = keyframes`
0%   {
			top:0%; left:60%;
		}
	  15%  {
		  top:-5%; 	left:65%;
		}
	  30%  {
		 top:-10%; 	left:70%;

		}
	  45%  {
		 top:-15%; 	left:75%;

		}
	  60% {
		 top:-20%; 	left:80%;
		}
	  75% {
		 top:-25%; 	left:85%;
		}
	  100% {
		 top:-25%; 	left:90%;
		}
`

const example8 = keyframes`
0%   {
			top:0%; left:20%;
			transform: scale(1);

		}
	  10%  {
		  top:-5%; 	left:15%;
		  transform: scale(1.1);

		}
	  20%  {
		 top:-10%; 	left:10%;
		 transform: scale(1.2);
		}
	  30%  {
		 top:-15%; 	left:5%;
		 transform: scale(1.3);
		}
	  40% {
		 top:-10%; 	left:0%;
		 transform: scale(1.4);
		}
	  50% {
		 top:0%; 	left:-10%;
		 transform: scale(1.5);
		}
	  60% {
		 top:10%; 	left:-20%;
		 transform: scale(1.6);
		}
	  70% {
		 top:20%; 	left:-35%;
		 transform: scale(1.8);

		}
	  80% {
		 top:30%; 	left:-45%;
		 transform: scale(2);

		}
	  90% {
		 top:40%; 	left:-55%;
		 transform: scale(2.2);

		}
	  100% {
		 top:50%; 	left:-65%;
		 transform: scale(2.4);

		}
`

const example10 = keyframes`
0%   {
			top:0%; left:70%;
			transform: scale(0.1);

		}
	  10%  {
		  top:-5%; 	left:75%;
		  transform: scale(0.2);

		}
	  20%  {
		 top:-10%; 	left:80%;
		 transform: scale(0.3);
		}
	  30%  {
		 top:-5%; 	left:85%;
		 transform: scale(0.4);
		}
	  40% {
		 top:0%; 	left:90%;
		 transform: scale(0.5);
		}
	  50% {
		 top:5%; 	left:95%;
		 transform: scale(0.6);
		}
	  60% {
		 top:10%; 	left:100%;
		 transform: scale(0.7);

		}
	  70% {
		 top:15%; 	left:105%;
		 transform: scale(0.8);

		}
	  80% {
		 top:20%; 	left:110%;
		 transform: scale(0.9);

		}
	  90% {
		 top:25%; 	left:115%;
		 transform: scale(1);

		}
	  100% {
		 top:30%; 	left:120%;
		 transform: scale(1.1);

		}
`

export const TreasureCont = styled(motion.div)` 
width: 100px;
height: 100px;
position: relative;

.pulsecoin{
	position:absolute;
	top:10%;
	left:30%;
	height:40px;
	width:40px;
	animation: ${example} 1.5s infinite;
}
.pulsecoin2{
	position:absolute;
	top:10%;
	left:30%;
	height:20px;
	width:20px;
	animation: ${example2} infinite;
  animation-duration: 2s;
}
.pulsecoin3{
	position:absolute;
	top:10%;
	left:90%;
	height:20px;
	width:20px;
	animation: ${example3} infinite;
  animation-duration: 2s;
}
.pulsecoin4{
	position:absolute;
	top:10%;
	left:90%;
	height:20px;
	width:20px;
	animation: ${example4} infinite;

  animation-duration: 4s;
}
.pulsecoin5{
	position:absolute;
	top:10%;
	left:30%;
	height:20px;
	width:20px;
	animation: ${example5} infinite;
  animation-duration: 4s;
}

.pulsecoin6{
	position:absolute;
	top:50%;
	left:30%;
	height:20px;
	width:20px;
	animation: ${example6} infinite;
  animation-duration: 2s;
}
.pulsecoin7{
	position:absolute;
	top:40%;
	left:35%;
	height:20px;
	width:20px;
	animation: ${example7} infinite;
  animation-duration: 2s;
}

.pulsecoin8{
	position:absolute;
	top:10%;
	left:30%;
	height:20px;
	width:20px;
	animation: ${example8} infinite;
  animation-duration: 4s;
}

.pulsecoin9{
	position:absolute;
	top:10%;
	left:30%;
	height:20px;
	width:20px;
	animation-name: example9;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}

.pulsecoin10{
	position:absolute;
	top:10%;
	left:90%;
	height:20px;
	width:20px;
	animation: ${example10} infinite;
  animation-duration: 1s;
}`


