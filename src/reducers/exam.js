import {ExamActions} from "../actions";
import {ExamData, ExamStatus} from "../actions/variables";
import {loadState} from "../actions/localStorage";

const exam = (state = loadState().exam, action) => {
    switch (action.type) {
        case ExamStatus.STATUS_WELCOME:
            return Object.assign({}, state, {
                status: action.type,
                isFetching: false,
                questionSet: "",
                name: "",
                totalTime: 0,
                timeLeft: 0
            });
        case ExamStatus.STATUS_START:
            let startTime = new Date();
            return Object.assign({}, state, {
                status: ExamStatus.STATUS_START,
                startTime: startTime.getTime()
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
        case ExamActions.REQUEST_QUESTIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ExamActions.RECEIVE_QUESTIONS:
            ExamData.QUESTIONS = action.questions;
            let timeLeft = state.status === ExamStatus.STATUS_WELCOME ? action.time : state.timeLeft;
            return Object.assign({}, state, {
                isFetching: false,
                questionSet: action.questionSet,
                name: action.name,
                totalTime: action.time,
                timeLeft: timeLeft
            });
        default:
            return state
    }
};

export default exam;