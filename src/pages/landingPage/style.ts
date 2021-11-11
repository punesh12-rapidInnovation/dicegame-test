import styled from 'styled-components';
import landingtop from '../../assets/images/landingtop.png';
import rectangle from '../../assets/images/rectangle.png';



export const Landingdiv = styled.div`

`


export const Beonediv = styled.div`
background: url(${landingtop});
height: 45vh;
width: 100%;
background-position-x: center;
background-position-y: center;
background-size: cover;
background-color: #000;
display: flex;
justify-content: center;
align-items:center;
`
export const Flexcol = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 60%;
color: white;
max-width: 700px;
margin-right: 15%;
font-size: 10px ;

>*{
    margin-left: 15%;
}
`

export const Beoneimagediv = styled.div`
width: 40%;
max-width: 400px;
display: flex;
justify-content: flex-end;
align-items:center;


>*{
    margin-right: 20%;
}
`

export const Beoneimg = styled.img`
width: 250px;
height: 250px;
object-fit: contain;
`

export const H1 = styled.h1`
font-size: 48px;
font-weight: 750;
background: linear-gradient(
            to right,rgba(239, 8, 150, 1), rgba(112, 7, 255, 1),
             rgba(0, 200, 255, 1));
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;

`
export const H2 = styled.h1`
font-size: 17px;
`
export const H3 = styled.h1`
font-size: 14px;
font-weight: 400;
max-width: 500px;
`

export const Playerrank = styled.div`
height: 100px;
width: 100%;
background-size: cover;
background-color: rgba(0,0,0);
background-image: url(${rectangle});
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 34px rgba(202, 26, 231, 0.9);
background:rgb(49,21,97);
display: flex;
justify-content: space-around;
align-items: center;
`

export const Rankimg = styled.img`
width: 70px;
height: 55px;
background: linear-gradient(90deg, rgba(239, 8, 150, 0.02) -6.9%, rgba(112, 7, 255, 0.02) 55.31%, rgba(0, 200, 255, 0.02) 107.28%);
box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
border-radius: 10px;
padding: 10px 20px;

`