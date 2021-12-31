import { useState, useEffect, memo } from "react";
import { TimerWrapper } from "modules/app/components/HousePoolTransaction/style";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { CircleTimerCont, Inner, Outer } from './style';
import { pad } from "utils/helper";


const CircleTimer = (props: any) => {
    const { value, actionAfterTimerOver, getTimeLeft } = props;
    // const { value, rowIndex } = props;
    // const lockedTime:any = localStorage.getItem(`lockedTime${rowIndex}`);
    // const value = 2;
    const [counter, setCounter] = useState(value>0?value:0);//value>0?value:0

    // const [circleDasharray, setCircleDasharray] = useState(200);
    // const [circleDashoffset, setCircleDashoffset] = useState(200);
  
    // useEffect(() => {
    //   setCounter(value>0?value:0);
    // },[])


    useEffect(() => {

      if (counter<=0) return;
      
      const intervalId = setInterval(() => {
          // const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
          // let lockedTime = parseFloat(lockedTimeString);
          // console.log(counter);
          // setLockedTimeLeft(newValue);
          // const lockedTimeArrayString:any = localStorage.getItem("lockedTimeArray");
          // let lockedTimeArray = JSON.parse(lockedTimeArrayString);
          // localStorage.setItem(`lockedTime${rowIndex}`, `${counter - 1}`)
          if (counter<=0) {
            console.log("interval clear");
            
            clearInterval(intervalId)
          } else {
            // const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
            // setCounter(counter-1);
            console.log("timeLefrt",getTimeLeft());
            
            setCounter(getTimeLeft());
            // setCircleDashoffset(circleDashoffset+(circleDasharray/counter));
          }
        }, 1000);
        
        if (counter<=0) clearInterval(intervalId);

        return () => clearInterval(intervalId);
    },[counter])
      
      
    useEffect(() => {

      if (counter<=0) {
        actionAfterTimerOver()
      };

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
  //                 <div className="value">{formatTime(remainingTime)}</div>
  //             </div>
  //         );
  // }

  const formatTime = (timeInSec: any) => {

      let h = Math.floor(timeInSec / 3600);
      let m = Math.floor(timeInSec % 3600 / 60);
      let s = Math.floor(timeInSec % 3600 % 60);

      h = h >=0 ? h : 0;
      m = m >=0 ? m : 0;
      s = s >=0 ? s : 0;

      return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

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
    // circleDasharray={`${circleDasharray}`}
    // circleDashoffset={`${circleDashoffset}`}
    totalTime={value}
    // totalOffsetToBeDone={200}
    >
      <Outer>
        <Inner>
          <div style={{color:"#fff"}}>
              {formatTime(counter)}
          </div>
        </Inner>
      </Outer>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100px" height="100px">
         <defs>
            <linearGradient id="GradientColor">
               <stop offset="0%" stop-color="#EF0896" />
               <stop offset="50%" stop-color="#7007FF" />
               <stop offset="100%" stop-color="#00C8FF" />
            </linearGradient>
         </defs>
         <circle cx="50" cy="50" r="40" stroke-linecap="round" />
      </svg>
    </CircleTimerCont>
    );
  };
  export default CircleTimer;
  
