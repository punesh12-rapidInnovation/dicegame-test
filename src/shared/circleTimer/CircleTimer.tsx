import { useState, useEffect, memo } from "react";
import { TimerWrapper } from "modules/app/components/HousePoolTransaction/style";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { CircleTimerCont, Inner, Outer } from './style';
import { dateFromTimestamp, pad, timeFromTimestamp } from "utils/helper";
import { setInterval } from "timers";


const CircleTimer = (props: any) => {
  const { value, actionAfterTimerOver, depositedTime, withdrawCounter, setWithdrawCounter } = props;

  // const { value, rowIndex } = props;
  // const lockedTime:any = localStorage.getItem(`lockedTime${rowIndex}`);
  // const value = 2;
  const [counter, setCounter] = useState(Math.abs(value) > 0 ? Math.abs(value) : 0);//value>0?value:0

  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState('0:0:0')
  console.log('timeInSeconds', timeInSeconds, remainingTime, depositedTime);


  const countdownCalculation = (timestamp: number) => {

    if (timestamp) {
      let unixTime = timestamp * 1000; // multiply by 1000 to get time in milliseconds

      let date_ob = new Date(unixTime + 86400000) // add  86400000  =  add 24hours to time


      let timeToExpire = date_ob.getTime();
      let CurrentTime = new Date().getTime();

      let difference = timeToExpire - CurrentTime;

      // let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let h: any = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m: any = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let s: any = Math.floor((difference % (1000 * 60)) / 1000);

      let countdown = `${h}:${m}:${s}`;

      if (h > 0 && m > 0 && s > 0) {
        setWithdrawCounter(countdown);
        setRemainingTime(countdown);
        // return countdown;
      }
      else
        setRemainingTime('0:0:0');
    }
  }

  const convertToSec = (time: any) => {

    if (!!time && time !== undefined) {
      let tt = time.split(":");
      let timeInSeconds = tt[0] * 3600 + tt[1] * 60 + tt[2] * 1;
      setTimeInSeconds(timeInSeconds);
      // return timeInSeconds;
    }
    // else setTimeInSeconds(0);;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      countdownCalculation(depositedTime)
    }, 1000);
    return () => clearInterval(interval);
  }, [depositedTime]);

  useEffect(() => {
    convertToSec(remainingTime)
  }, [remainingTime]);

  // useEffect(() => {

  //   if (counter <= 0) return;

  //   const intervalId = setInterval(() => {
  //     // const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
  //     // let lockedTime = parseFloat(lockedTimeString);
  //     // console.log(counter);
  //     // setLockedTimeLeft(newValue);
  //     // const lockedTimeArrayString:any = localStorage.getItem("lockedTimeArray");
  //     // let lockedTimeArray = JSON.parse(lockedTimeArrayString);
  //     // localStorage.setItem(`lockedTime${rowIndex}`, `${counter - 1}`)
  //     if (counter <= 0) {
  //       console.log("interval clear");

  //       clearInterval(intervalId)
  //     } else {
  //       // const lockedTimeString:any = localStorage.getItem(`lockedTime${rowIndex}`);
  //       setCounter(counter - 1);
  //       // setCircleDashoffset(circleDashoffset+(circleDasharray/counter));
  //     }
  //   }, 1000);

  //   if (counter <= 0) clearInterval(intervalId);

  //   return () => clearInterval(intervalId);
  // }, [counter])


  // useEffect(() => {

  //   if (counter <= 0) {
  //     actionAfterTimerOver()
  //   };

  // }, [counter])


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

  // const formatTime = (timeInSec: any) => {


  //   let h = Math.floor(timeInSec / 3600);
  //   let m = Math.floor(timeInSec % 3600 / 60);
  //   let s = Math.floor(timeInSec % 3600 % 60);

  //   h = h >= 0 ? h : 0;
  //   m = m >= 0 ? m : 0;
  //   s = s >= 0 ? s : 0;

  //   return `${pad(h)}:${pad(m)}:${pad(s)}`;
  // };


  return (
    // <TimerWrapper >
    //   <CountdownCircleTimer
    //     isPlaying
    //     isLinearGradient={true}
    //     duration={timeInSeconds}
    //     colors={[
    //       ["#EF0896", 0],
    //       ["#7007FF", 1],
    //     ]}
    //     size={55}
    //     strokeWidth={4}
    //   >
    //     {remainingTime}
    //   </CountdownCircleTimer>
    // </TimerWrapper>


    <CircleTimerCont
      // circleDasharray={`${circleDasharray}`}
      // circleDashoffset={`${circleDashoffset}`}
      totalTime={timeInSeconds}
    // totalOffsetToBeDone={200}
    >
      <Outer>
        <Inner>
          <div style={{ color: "#fff", fontSize: "14px" }}>
            {remainingTime}
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

