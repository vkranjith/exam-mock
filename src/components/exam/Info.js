import React from 'react';
import {ExamData} from "../../actions/variables";
import {useStore} from "react-redux";

const Info = () => {
    let state = useStore().getState();
    return (
        <div className="exam-info float-left">
            <div><b>Exam Set</b>: {state.exam.name}</div>
            <div><b>Total Questions</b>: {ExamData.QUESTIONS.length}</div>
        </div>
    );
};

export default Info;