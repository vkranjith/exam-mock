import React from 'react';
import Controls from "../../../containers/exam/Controls";
import Question from "../../../components/exam/Question";
import PageComponent from "./Page";
import Placeholder from "../../elements/Placeholder";
import {ExamData} from "../../../actions/variables";
import {useDispatch, useStore} from "react-redux";
import {fetchQuestionsIfNeeded} from "../../../actions/fetcher";

const QuestionPage = (props) => {
    let state = useStore().getState();
    let dispatch = useDispatch();
    if (ExamData.QUESTIONS.length === 0 && state.exam.name !== '') {
        dispatch(fetchQuestionsIfNeeded(state.exam.questionSet));
    }
    return (
        <div>
            <PageComponent {...props} containerClass="questions-page">
                <div>
                    <h2>Exam Started - {state.exam.name}</h2>
                    {state.exam.isFetching || ExamData.QUESTIONS.length === 0 ? (
                        <Placeholder/>
                    ) : (
                        <Question id={state.question.currentQuestion}/>
                    )}
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default QuestionPage;