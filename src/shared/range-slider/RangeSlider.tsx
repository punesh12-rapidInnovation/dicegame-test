import React from 'react';
import { screenSizes } from 'shared/styles/theme';
import { convertToEther } from 'utils/helper';
import { RangeSliderCont, RangeSliderInput, SliderCalloutBox, SliderThumb, ValueRange } from './style';

let width = window.innerWidth;

const RangeSlider = (props: any) => {
  const { value, onChange, HeartBeatSpeed, Profit } = props
  return (
    <RangeSliderCont>
      <RangeSliderInput type="range" value={value} onChange={onChange} />
      <SliderThumb
        style={{
          position: "absolute",
          top: "-20px",
          left: width < screenSizes.mediaS ? `${value - 10}%` : `${value - 7}%`,
          transform: "translate(-50%,-50%)",
        }}
        duration={HeartBeatSpeed}
      />
      <SliderCalloutBox
        style={{
          position: "absolute",
          top: "-30px",
          left: width < screenSizes.mediaS ? `${value - 1}%` : `${value}%`,

          transform: "translate(-50%,-50%)",
        }}
        value={value} >
        <p>Roll under <span>{value + 1}</span>,</p>
        <p>Profit <span>+{
          width < screenSizes.mediaS ?
            Profit && Number(convertToEther(Profit.toString())).toFixed(6)
            :
            Profit && Number(convertToEther(Profit.toString())).toFixed(10)

        } PLS</span></p>

      </SliderCalloutBox>
      <ValueRange>
        <p>1%</p> <p>98%</p>
      </ValueRange>
    </RangeSliderCont >
  );
};

export default RangeSlider;