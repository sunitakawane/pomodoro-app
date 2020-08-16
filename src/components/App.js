import React from "react";
import "../App.css";
import TimeComp from "./TimeComp";
import Timer from "./Timer";
import alarm from "../alarm.mp3";

function App() {
  const [breakLength, setBreakLength] = React.useState(1);
  const [sessionLength, setSessionLength] = React.useState(1);
  const [timerMin, setTimerMin] = React.useState(1);
  const beep = React.useRef();
  const [stateBehaviour, setBehaviour] = React.useState("Session");
  const [disableBtn,setDisableBtn]= React.useState(false)

  function switchesTimerMode() {
    if (stateBehaviour === "Session") {
      setBehaviour("Break");
      setTimerMin(breakLength);
    } else {
      setBehaviour("Session");
      setTimerMin(sessionLength);
    }
  }

  const incrBreak = () =>
    setBreakLength((previousBL) => {
      if (previousBL >= 30) return 30;
      else return previousBL + 1;
    });

  const decrBreak = () =>
    setBreakLength((previousBL) => {
      if (previousBL <= 1) return 0;
      else return previousBL - 1;
    });

  const incrSession = () =>
    setSessionLength((previousSL) => {
      if (previousSL >= 60) {
        setTimerMin(60);
        return 60;
      } else {
        setTimerMin(previousSL + 1);
        return previousSL + 1;
      }
    });

  const decrSession = () =>
    setSessionLength((previousSL) => {
      if (previousSL <= 1) {
        setTimerMin(0);
        return 0;
      } else {
        setTimerMin(previousSL - 1);
        return previousSL - 1;
      }
    });

  const resetTimer = () => {
    setTimerMin(sessionLength);
    setBreakLength(breakLength);
    setSessionLength(sessionLength);
    setBehaviour("Session");
    beep.current.pause();
    beep.current.currentTime = 0;
    setDisableBtn(false)
  };

  const updateTimer = () => {
    setTimerMin((prevTM) => prevTM - 1);
  };

  

  return (
    <main>
      <h2>Pomodoro Clock</h2>
      <section className="interval-container">
        <TimeComp
          incr={incrBreak}
          decr={decrBreak}
          compLength={breakLength}
          cname="Break"
          disableBtn={disableBtn}
        />
        <TimeComp
          incr={incrSession}
          decr={decrSession}
          compLength={sessionLength}
          cname="Session"
          disableBtn={disableBtn}
        />
      </section>
      <Timer
        timerMin={timerMin}
        breakLength={breakLength}
        updateTimer={updateTimer}
        resetTimer={resetTimer}
        switchesTimerMode={switchesTimerMode}
        stateBehaviour={stateBehaviour}
        beep={beep}
        setDisableBtn={setDisableBtn}
      />
      <audio id="beep" src={alarm} ref={beep} />
    </main>
  );
}

export default App;
