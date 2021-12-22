import React from 'react';
import { convertToEther } from 'utils/helper';
import { RangeSliderCont, RangeSliderInput, SliderCalloutBox, SliderThumb, ValueRange } from './style';

const RangeSlider = (props: any) => {
  const { value, onChange, HeartBeatSpeed, Profit } = props
  return (
    <RangeSliderCont>
      <RangeSliderInput type="range" value={value} onChange={onChange} />
      <SliderThumb
        style={{
          position: "absolute",
          top: "-20px",
          left: `${value - 5}%`,
          transform: "translate(-50%,-50%)",
        }}
        duration={HeartBeatSpeed}
      />
      <SliderCalloutBox
        style={{
          position: "absolute",
          top: "-30px",
          left: `${value + 1}%`,
          transform: "translate(-50%,-50%)",
        }}
        value={value} >
        <p>Roll under <span>{value + 1}</span>,</p>
        <p>Profit <span>+{Profit && Number(convertToEther(Profit.toString())).toFixed(10)} PLS</span></p>
      </SliderCalloutBox>
      <ValueRange>
        <p>1%</p> <p>98%</p>
      </ValueRange>
    </RangeSliderCont >
  );
};

export default RangeSlider;