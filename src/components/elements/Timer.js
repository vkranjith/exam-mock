import React from 'react';
import {useDispatch, useStore} from "react-redux";
import {ExamStatus, updateTime} from "../../actions";

const calculateTime = (status, timeLeft, dispatch = null) => {
    let dateTime = new Date();
    dateTime.setHours(0);
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    dateTime.setTime(dateTime.getTime() + (timeLeft * 1000));
    let hours = dateTime.getHours().toString().padStart(2, '0');
    let minutes = dateTime.getMinutes().toString().padStart(2, '0');
    let seconds = dateTime.getSeconds().toString().padStart(2, '0');
    displayTime = `${hours}:${minutes}:${seconds}`;
    if (dispatch) {
        dispatch(updateTime(timeLeft));
    }
    return displayTime;
};
let displayTime = "00:00:00";
let timerID;
const Timer = () => {
    let status = useStore().getState().exam.status;
    let timeLeft = useStore().getState().exam.timeLeft;
    let dispatch = useDispatch();
    if (status === ExamStatus.STATUS_START
        || status === ExamStatus.STATUS_REVIEW
        || status === ExamStatus.STATUS_SUBMIT
    ) {
        clearTimeout(timerID);
        timerID = setTimeout(() => calculateTime(status, --timeLeft, dispatch), 1000);
    } else {
        calculateTime(status, timeLeft);
    }
    return (
        <div className="timer">
            Time: {displayTime}
        </div>
    );
};

export default Timer;