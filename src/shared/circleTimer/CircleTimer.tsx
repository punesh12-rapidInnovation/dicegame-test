import { useState, useEffect, memo } from "react";
import { TimerWrapper } from "modules/app/components/HousePoolTransaction/style";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { CircleTimerCont, Inner, Outer } from './style';


const CircleTimer = (props: any) => {
    const { value, rowIndex } = props;
    const lockedTime:any = localStorage.getItem(`lockedTime${rowIndex}`);
    const [counter, setCounter] = useState(lockedTime);

    const [circleDasharray, setCircleDasharray] = useState(200);
    const [circleDashoffset, setCircleDashoffset] = useState(0);
  
    useEffect(() => {

      if (!parseFloat(counter)) return;
      
      const intervalId = setInterval(() => {
          // const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
          // let lockedTime = parseFloat(lockedTimeString);
          console.log(counter);
          // setLockedTimeLeft(newValue);
          // const lockedTimeArrayString:any = localStorage.getItem("lockedTimeArray");
          // let lockedTimeArray = JSON.parse(lockedTimeArrayString);
          // localStorage.setItem(`lockedTime${rowIndex}`, `${counter - 1}`)
          if (!counter) {
            clearInterval(intervalId)
          } else {
            const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
            setCounter(lockedTimeString);
            setCircleDashoffset(circleDashoffset+(circleDasharray/parseFloat(value)));
          }
        }, 1000);
    },[counter])
      
      

  // useEffect(() => {


  //   if (!parseFloat(counter)) return;

  //   const intervalId = setInterval(() => {
  //     // const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
  //     // let lockedTime = parseFloat(lockedTimeString);
  //     console.log(counter);
  //     // setLockedTimeLeft(newValue);
  //     // const lockedTimeArrayString:any = localStorage.getItem("lockedTimeArray");
  //     // let lockedTimeArray = JSON.parse(lockedTimeArrayString);
  //     // localStorage.setItem(`lockedTime${rowIndex}`, `${counter - 1}`)

  //     setCounter(localStorage.getItem(`lockedTime${rowIndex}`));
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [counter])

  // const renderTime = ({ remainingTime }:{remainingTime:any}) => {
  //     //   console.log("value",value);
  //     //   console.log("rendered");

  //     if (remainingTime === 0) {
  //         return <div className="timer">0</div>;
  //     }
  //     else
  //         return (
  //             <div className="timer">
  //                 {/* <div className="text">Remaining time</div> */}
  //                 <div className="value">{formatRemainingTime(remainingTime)}</div>
  //             </div>
  //         );
  // }

  // const formatRemainingTime = (time: any) => {
  //     const minutes = Math.floor((time % 3600) / 60);
  //     const seconds = time % 60;

  //     return `${minutes}:${seconds}`;
  // };

  return (
    //     <TimerWrapper >
    //     <CountdownCircleTimer
    //         isPlaying
    //         isLinearGradient={true}
    //         duration={value}
    //         colors={[
    //             ["#EF0896", 0],
    //             ["#7007FF", 1],
    //         ]}
    //         size={55}
    //         strokeWidth={4}
    //     >
    //         {renderTime}
    //     </CountdownCircleTimer>
    // </TimerWrapper>
    <CircleTimerCont
    circleDasharray={`${circleDasharray}`}
    circleDashoffset={`${circleDashoffset}`}
    >
      <Outer>
        <Inner>
          <div style={{color:"#fff"}}>
              {counter}
          </div>
        </Inner>
      </Outer>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="80px" height="80px">
         <defs>
            <linearGradient id="GradientColor">
               <stop offset="0%" stop-color="#EF0896" />
               <stop offset="50%" stop-color="#7007FF" />
               <stop offset="100%" stop-color="#00C8FF" />
            </linearGradient>
         </defs>
         <circle cx="40" cy="40" r="30" stroke-linecap="round" />
      </svg>
    </CircleTimerCont>
    );
  };
  export default memo(CircleTimer);
  
