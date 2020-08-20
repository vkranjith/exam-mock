/**
 * Data Fetcher actions
 */
import {ExamActions} from "./index";
import {ExamData} from "./variables";
import fetch from 'cross-fetch';

export const requestQuestions = (questionSet) => ({
    type: ExamActions.REQUEST_QUESTIONS,
    questionSet
});
export const receiveQuestions = (questionSet, questions, name, time) => ({
    type: ExamActions.RECEIVE_QUESTIONS,
    questionSet,
    questions,
    name,
    time
});

export function fetchQuestions(questionSet) {
    return function (dispatch) {
        let url = `${ExamData.QUESTION_URL}${questionSet}.json`;
        dispatch(requestQuestions(questionSet));
        return fetch(url)
            .then(
                response => response.json()
            )
            .then(
                json => dispatch(receiveQuestions(questionSet, json.questions, json.name, json.time))
            )
    }
}

function shouldFetchQuestions(state, questionSet) {
    if (state.exam.isFetching) {
        return false;
    } else if (!state.exam.questionSet || questionSet !== state.exam.questionSet || ExamData.QUESTIONS.length === 0) {
        return true;
    } else {
        return false;
    }
}

export function fetchQuestionsIfNeeded(questionSet) {
    return (dispatch, getState) => {
        if (shouldFetchQuestions(getState(), questionSet)) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchQuestions(questionSet))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}