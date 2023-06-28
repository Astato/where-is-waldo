import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { isGameWon } from "../utils/gamerules";
const Stopwatch = ({ startTimer, setStartTimer, setGameTime }) => {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (isGameWon) {
      setGameTime([minutes, seconds]);
      return pause();
    }
    if (startTimer === true) {
      start();
    }
    if (startTimer === "pause") {
      pause();
    }
    if (startTimer === "reset") {
      reset();
    }
    if (startTimer === false) {
      reset();
      pause();
    }
  }, [startTimer, isGameWon]);
  return (
    <div id="stopwatch-container">
      <div id="stopwatch">
        <p className="stopwatch-text">{hours < 10 ? "0" + hours : hours}</p>:
        <p className="stopwatch-text">
          {minutes < 10 ? "0" + minutes : minutes}
        </p>
        :
        <p className="stopwatch-text">
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
      </div>
    </div>
  );
};

export default Stopwatch;
