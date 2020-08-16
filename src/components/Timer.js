import React from "react";

export default function Timer(props) {
  const [timerSec, setTimerSec] = React.useState(() => 0);
  const [stateTimer, setTimer] = React.useState(null);

  function startStop() {
    stateTimer ? stopTimer() : startTimer();
  }

  function stopTimer() {
    setTimer(null);
  }

  function startTimer() {
    setTimer("Start");
    props.beep.current.play()
    props.setDisableBtn(true)
  }

  React.useEffect(() => {
    let interval = null;
    if (stateTimer) {
      interval = setInterval(() => {
        handleNumber();
      }, 1000); //periodLength
      return () => {
        clearInterval(interval);
      };
    }
  });

  function handleNumber() {
    if (timerSec === 0) {
      if (props.timerMin === 0) {
        props.beep.current.play()
        props.switchesTimerMode();
      } else {
        setTimerSec(59)
        props.updateTimer()
      }
    } else setTimerSec(timerSec - 1);
  }

  function resetTimer() {
    setTimer(null);
    setTimerSec(0)
    props.resetTimer();
  } 

  return (
    <section>
      <section className="timer-container">
        <h4>{props.stateBehaviour}</h4>
        <span className="timer">{props.timerMin}</span>
        <span className="timer">:</span>
        <span className="timer">
          {timerSec < 10 ? "0" + timerSec : timerSec}
        </span>
      </section>
      <section className="timer-actions">
        <button onClick={startStop}>{stateTimer ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Refresh</button>
      </section>
    </section>
  );
}
