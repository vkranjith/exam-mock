import {ExamActions, ExamStatus} from "../actions";
import {loadState} from "../actions/localStorage";

const exam = (state = loadState().exam, action) => {
    switch (action.type) {
        case ExamStatus.STATUS_WELCOME:
            return Object.assign({}, state, {
                status: action.type
            });
        case ExamStatus.STATUS_START:
            let startTime = new Date();
            return Object.assign({}, state, {
                status: ExamStatus.STATUS_START,
                startTime: startTime.getTime(),
                timeLeft: ExamStatus.TOTAL_TIME
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
            let endTime = new Date();
            return Object.assign({}, state, {
                status: action.type,
                score: action.score,
                endTime: endTime.getTime(),
                timeLeft: action.timeLeft
            });
        case ExamActions.CURRENT_QUESTION:
            if (ExamStatus.STATUS_REVIEW !== state.status) {
                return state;
            }
            return Object.assign({}, state, {
                status: ExamStatus.STATUS_START
            });
        case ExamActions.UPDATE_TIME:
            return Object.assign({}, state, {
                timeLeft: action.timeLeft
            });
        default:

            return state
    }
};

export default exam;