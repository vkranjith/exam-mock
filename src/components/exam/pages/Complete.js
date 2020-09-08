import React from 'react';
import {useStore} from "react-redux";
import Controls from "../../../containers/exam/Controls";
import PageComponent from "./Page";
import {ExamStatus} from "../../../actions/variables";

const examStatus = (state) => {
    if (state.exam.score_status === ExamStatus.SCORE_STATUS_PASS) {
        return (
            <div>
                <p>Congrats! You passed!!!</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>Oh! You couldn't make it this time. :-(</p>
                <p>No worries, you can try again whenever you feel you are ready. :-)</p>
            </div>
        );
    }
};

const CompletePage = (props) => {
    let state = useStore().getState();
    return (
        <div>
            <PageComponent {...props}>
                <div>
                    <h2>You completed your exam!</h2>
                    <p>Your score is {state.exam.score}%.</p>
                    {examStatus(state)}
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default CompletePage;