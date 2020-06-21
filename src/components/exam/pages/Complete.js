import React from 'react';
import {useDispatch, useStore} from "react-redux";
import {ExamStatus, submitExam} from "../../../actions";
import Controls from "../../../containers/exam/Controls";
import PageComponent from "./Page";

const CompletePage = ({containerClass, match}) => {
    let dispatch = useDispatch();
    let state = useStore().getState();
    if (match.url === '/complete' && state.exam.status !== ExamStatus.STATUS_COMPLETE) {
        // TODO: change this to a better approach
        dispatch(submitExam(state));
    }
    return (
        <div>
            <PageComponent containerClass={containerClass}>
                <div>
                    <h2>Complete</h2>
                    <p>Your score is {state.exam.score}%</p>
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default CompletePage;