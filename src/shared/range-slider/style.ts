import styled, { keyframes } from 'styled-components'
import Sliderthumb from "assets/icons/sliderthumb.svg";
import SliderCallout from "assets/icons/sliderCallout.svg";
import { colors } from 'shared/styles/theme';


export const RangeSliderCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // margin: 30px 0;
  margin-top:20px;
position: relative;
`

export const RangeSliderInput = styled.input<any>`
-webkit-appearance: none !important;
  -moz-appearance: none !important;
  width: 100%;
  height: 4px;
  margin-bottom: 20px;
  /*background: green;*/
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
  &::-webkit-slider-thumb {
    width: 10px;
    height: 20px;
    background:red;
    // opacity:0.1;
    border: none;
    cursor: pointer;
    -webkit-appearance: none;
    
  }
  
  &::-webkit-slider-runnable-track {
    background: ${(props) => {
    return parseFloat(`${props.value}`) >= 50
      ? `linear-gradient(to left, #EB5757 ${100 - parseFloat(`${props.value}`)
      }%, #6FCF97 ${100 - parseFloat(`${props.value}`)}%)`
      : `linear-gradient(to right, #6FCF97 ${props.value}%, #EB5757 ${props.value}%)`;
  }};
    height: 12px;
    border-radius: 10px;
    width: 100%;
    outline: 10px solid #19072e ;
  }
  &::-moz-range-thumb {
    width: 10px;
    height: 20px;
    background:red;
    // opacity:0.1;
    border: none;
    cursor: pointer;
    -webkit-appearance: none;

  }
  ::-moz-range-track {  
  background-color: #EB5757;
   width: 100%;
    height: 12px;
    border-radius: 10px;
    border: none;
    outline: 10px solid #19072e ;

}
  &::-moz-range-progress {
    width: 100%;
    height: 12px;
    border-radius: 10px;
    border: none;
    background: #6FCF97;
    outline: none;
    transition: opacity 0.2s;
  }
`

const animateHeart = keyframes`
  0%{transform: scale( .80 );}
  20% {transform: scale( 1 );}
  40% {transform: scale( .80 );}
  60% {transform: scale( 1 );}
  80% {transform: scale( .80 );}
  100% {transform: scale( .80 );}
`;


export const SliderThumb = styled.div<any>`
    width: 60px;
    height: 60px;
    margin:0; 
    padding:0;
    cursor: pointer;
    background: url(${Sliderthumb});    
    background-repeat: no-repeat;
    background-size: contain;
    animation-name: ${animateHeart};
    animation-duration: ${(props) => (props.duration ? props.duration : '5s')};
    animation-iteration-count: infinite;
    pointer-events: none;
`
export const SliderCalloutBox = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items:center;
  text-align:center;
  padding:5px;
  width:120px;
  height:55px;
  background: url(${SliderCallout});    
  background-repeat: no-repeat;
  background-size: contain;

  p{
    font-size:9px;
    font-weight:100;
    line-height:1.3;
  }

  span{
    color:${colors.primary};
  }
`
export const ValueRange = styled.div<any>`
display: flex;
justify-content:space-between;
Width:100%;
p{
  font-size:12px;
  font-weight:700;
}
`