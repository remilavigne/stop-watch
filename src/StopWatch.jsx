import React, {useState, useEffect, useRef} from "react";

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapseTime, setElapseTime] = useState(0);
    const intervalIDRef = useRef(null);
    const startTimeRef = useRef(0);


    useEffect(() => {
        if(isRunning){
            intervalIDRef.current = setInterval(() => {
                setElapseTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return () => {
            clearInterval(intervalIDRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapseTime;

    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapseTime(0);
        setIsRunning(false);
    }

    function formatTime(){

        let hours = Math.floor(elapseTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapseTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapseTime / (1000)  % 60);
        let milliseconds = Math.floor(elapseTime % 1000 / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stop-watch">
            <div className="display-time">{formatTime()}</div>
            <div className="controls">
                <button className="start-btn" onClick={start}>Start</button>
                <button className="stop-btn" onClick={stop}>Stop</button>
                <button className="reset-btn" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default StopWatch
