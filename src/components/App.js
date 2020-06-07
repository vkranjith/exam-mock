import React from 'react';
import Header from "./Header";
import Question from "../containers/exam/Question";
import Footer from './Footer';
import Controls from "../containers/exam/Controls";
import {ExamStatus} from "../actions";
import Button from "./elements/Button";
import '../assets/css/App.css';
import Review from "../containers/exam/Review";

const prepareContent = (state, onSubmitClick) => {
    let data = "";
    let containerClass = "exam-area";
    if (state.exam.status === ExamStatus.STATUS_WELCOME) {
        data = (
            <div className={containerClass}>
                <h2>Welcome</h2>
            </div>
        );
    } else if (state.exam.status === ExamStatus.STATUS_START) {
        data = (
            <div className={containerClass}>
                <h2>Exam Started</h2>
                <Question/>
            </div>
        );
    } else if (state.exam.status === ExamStatus.STATUS_SUBMIT) {
        data = (
            <div className={containerClass}>
                <h3>Are you sure you are ready to submit?</h3>
                <Button label="Submit"
                        id="submit-exam"
                        onClick={() => onSubmitClick()}
                        classNames="primary"/>
            </div>
        )
    } else if (state.exam.status === ExamStatus.STATUS_REVIEW) {
        data = (
            <div className={containerClass}>
                <h3>Review questions.</h3>
                <Review/>
            </div>
        )
    } else if (state.exam.status === ExamStatus.STATUS_COMPLETE) {
        data = (
            <div className={containerClass}>
                <h2>Complete</h2>
            </div>
        );
    }
    return data;
};

const App = (props) => (
    <div className="exam-app">
        <Header/>
        <hr/>
        {prepareContent(props.state, props.onSubmitClick)}
        <hr/>
        <Controls/>
        <hr/>
        <Footer/>
    </div>
);

export default App