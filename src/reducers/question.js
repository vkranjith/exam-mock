import {ExamActions, ExamStateInit, ExamStatus} from '../actions'

const question = (state = ExamStateInit.question, action) => {
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
        default:
            return state
    }
};

export default question