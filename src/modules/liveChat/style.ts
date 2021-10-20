import styled from 'styled-components';
import Chatsection from '../../assets/images/Chatsection.png';
import sendimage from '../../assets/images/send-icon.svg';



export const Box = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
`

export const PopupModal = styled.button`
height:50vh;
width:50vh;
background: lightgray;
position:absolute;
top:20;
left:50;
border-radius:20px;
`;



export const ChatBox = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
display: flex;
flex-direction:column;
justify-content:space-between;
align-items: flex-start;
display: relative;

>*{
    color: white;
}
`

export const GlobalChatSection = styled.div`
background: rgba(0,0,0,1);
background-image: url(${Chatsection});
background-position: center;
background-size: cover;
height: 90vh;
width: 100%;
display: flex;
justify-content:center;
align-items: center;
`

export const Input = styled.input`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.2) -6.9%, rgba(112, 7, 255, 0.2) 55.31%, rgba(0, 200, 255, 0.2) 107.28%);
border-radius: 0px 0px 20px 20px;
box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
border: none;
padding-left: 20px;
display: flex;
justify-content: space-between;
align-items: center;

::placeholder{
    color:white;
}
:focus{
    outline: none;
}
 
`
export const ChatTopdiv = styled.div`
display: flex;
width: 100%;
height: 16%;
justify-content: space-between;
align-items: center;
padding-left: 8% ;
padding-right: 8% ;
padding-top: 16px;

`
export const ChatMiddlediv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 63%;
justify-content: center;
padding: 10px 20px;
overflow:scroll;

::-webkit-scrollbar {
                display: none;
            }

`

export const Messagediv = styled.div`
background: rgba(255, 255, 255, 0.23);
border-radius: 10px;
padding: 10px;
display: flex;
width: 73%;
border-top-left-radius:0;
margin: 10px 0;
align-self: flex-start;
text-align: left;
word-break: break-all;


`
export const Ownmsg = styled.div`
background: linear-gradient(92.8deg, rgba(30, 232, 183, 0.8) 2.13%, rgba(172, 51, 191, 0.4) 102.29%);
border-radius: 10px;
border-bottom-right-radius:0;
padding: 13px 10px;
display: flex;
width: 73%;
margin: 10px 0;
align-self: flex-end;
text-align: left;
word-break: break-all;
`

export const Button = styled.button`
background-image: url(${sendimage});
background-position: center;
background-size: contain;
position: absolute;
bottom: 4%;
right: 15px;
cursor: pointer;
border-radius: 12px;
width: 40px;
height: 40px;
border: none;

`