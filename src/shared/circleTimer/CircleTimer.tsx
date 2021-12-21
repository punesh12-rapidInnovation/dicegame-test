import { useState, useEffect, memo } from "react";
import { TimerWrapper } from "modules/app/components/HousePoolTransaction/style";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const CircleTimer = (props: any) => {
  const { value, rowIndex } = props;
  const lockedTime: any = localStorage.getItem(`lockedTime${rowIndex}`);
  const [counter, setCounter] = useState(lockedTime);

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

      setCounter(localStorage.getItem(`lockedTime${rowIndex}`));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter])

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
    <div style={{ color: "#fff" }}>
      {counter}
    </div>
  );
};
export default memo(CircleTimer);
