import {ExamActions, ExamStateInit, ExamStatus} from "../actions";

const exam = (state = ExamStateInit.exam, action) => {
    switch (action.type) {
        case ExamStatus.STATUS_WELCOME:
            return Object.assign({}, state, {
                status: action.type
            });
        case ExamActions.CURRENT_QUESTION:
            if (ExamStatus.STATUS_REVIEW !== state.status) {
                return state;
            }
            // else move to next condition
        case ExamStatus.STATUS_START:
            return Object.assign({}, state, {
                status: ExamStatus.STATUS_START
            });
        case ExamStatus.STATUS_SUBMIT:
            return Object.assign({}, state, {
                status: action.type
            });
        case ExamStatus.STATUS_REVIEW:
            return Object.assign({}, state, {
                status: action.type
            });
        case ExamStatus.STATUS_COMPLETE:
            return Object.assign({}, state, {
                status: action.type,
                score: action.score
            });
        default:
            return state
    }
};

export default exam;