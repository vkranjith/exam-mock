import {ExamActions} from '../actions';
import {ExamData, ExamStatus} from '../actions/variables';
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
        case ExamStatus.STATUS_START:
            return Object.assign({}, state, {
                currentQuestion: action.questionID
            });
        case ExamStatus.STATUS_COMPLETE:
            return Object.assign({}, state, {
                currentQuestion: 0
            });
        case ExamActions.CLEAR_ANSWERS:
            return Object.assign({}, state, {
                answers: [],
                reviewList: []
            });
        default:
            return state
    }
};

export default question