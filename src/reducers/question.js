import {ExamActions, ExamStatus} from '../actions'
import {loadState} from "../actions/localStorage";

const question = (state = loadState().question, action) => {
    switch (action.type) {
        case ExamActions.ADD_ANSWER:
            return {
                ...state,
                answers: action.answers
            };
        case ExamActions.ADD_REVIEW:
            return Object.assign({}, state, {
                reviewList: action.reviewList
            });
        case ExamActions.CURRENT_QUESTION:
            return Object.assign({}, state, {
                currentQuestion: action.questionID
            });
        case ExamStatus.STATUS_COMPLETE:
            return Object.assign({}, state, {
                currentQuestion: 0
            });
        case ExamActions.CLEAR_ANSWERS:
            return Object.assign({}, state, {
                answers: []
            });
        default:
            return state
    }
};

export default question