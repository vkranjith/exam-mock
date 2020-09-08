/**
 * actions and action creators
 */
import {ExamStatus, ExamData, ExamRouters} from "./variables";
import {getQuestionID, calculateScore, getQuestionURL} from "./function";
import {getExamData} from "./localStorage";

export const ExamActions = {
    ADD_ANSWER: 'ADD_ANSWER',
    ADD_REVIEW: 'ADD_REVIEW',
    NEXT_QUESTION: 'NEXT_QUESTION',
    PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
    CURRENT_QUESTION: 'CURRENT_QUESTION',
    SUBMIT: 'SUBMIT',
    CALCULATE: 'CALCULATE',
    VALIDATE_ANSWER: 'VALIDATE_ANSWER',
    UPDATE_TIME: 'UPDATE_TIME',
    CLEAR_ANSWERS: 'CLEAR_ANSWERS',
    REQUEST_QUESTIONS: 'REQUEST_QUESTIONS',
    RECEIVE_QUESTIONS: 'RECEIVE_QUESTIONS'
};

export const welcome = (history) => {
    if (history) {
        history.push(ExamRouters.PAGE_WELCOME.path);
    }
    return {
        type: ExamStatus.STATUS_WELCOME
    }
};

export const startExam = (history) => {
    if (history) {
        history.push(getQuestionURL(1));
        return {
            type: ExamStatus.STATUS_START,
            questionID: 1
        }
    }
    return welcome(history);
};

export const clearAnswers = () => ({
    type: ExamActions.CLEAR_ANSWERS
});

export const submitExam = (state, history) => {
    if (history) {
        history.push(ExamRouters.PAGE_COMPLETE.path);
        let score = calculateScore(state);
        let scoreStatus;
        if (score >= ExamData.PASS_SCORE) {
            scoreStatus = ExamStatus.SCORE_STATUS_PASS;
        } else {
            scoreStatus = ExamStatus.SCORE_STATUS_FAIL;
        }
        return ({
            type: ExamStatus.STATUS_COMPLETE,
            score: score,
            score_status: scoreStatus
        });
    }
    return welcome(history);
};

export const reviewQuestions = (history) => {
    if (history) {
        history.push(ExamRouters.PAGE_REVIEW.path);
        return {
            type: ExamStatus.STATUS_REVIEW
        }
    }
    return welcome(history);
};

export const updateAnswer = (answers) => {
    return ({
        type: ExamActions.ADD_ANSWER,
        answers
    });
};

export const nextQuestion = (currentQuestionID, history) => {
    if (!history) {
        return welcome(history);
    }
    let questionID = getQuestionID(currentQuestionID);
    if (questionID >= ExamData.QUESTIONS.length) {
        history.push(ExamRouters.PAGE_SUBMIT.path);
        return {
            type: ExamStatus.STATUS_SUBMIT
        };
    }
    history.push(getQuestionURL(questionID + 1));
    return setCurrentQuestion(questionID);
};

export const previousQuestion = (currentQuestionID, history) => {
    if (!history) {
        return welcome(history);
    }
    let questionID = getQuestionID(currentQuestionID, 'prev');
    history.push(getQuestionURL(questionID + 1));
    return setCurrentQuestion(questionID);
};

export const setCurrentQuestion = (questionID) => ({
    type: ExamActions.CURRENT_QUESTION,
    questionID: questionID
});

export const addToReview = (questionID, reviewList = []) => {
    reviewList.push(questionID);
    return ({
        type: ExamActions.ADD_REVIEW,
        reviewList: reviewList.filter((item, index) => reviewList.indexOf(item) === index)
    });
};

export const removeReview = (questionID, reviewList = []) => {
    return ({
        type: ExamActions.ADD_REVIEW,
        reviewList: reviewList.filter(item => item !== questionID)
    });
};

export const updateTime = (timeLeft, state = null, history = null) => {
    let totalTime = getExamData('totalTime');
    if (timeLeft <= 0 || timeLeft > totalTime) {
        return submitExam(state, history);
    } else {
        return ({
            type: ExamActions.UPDATE_TIME,
            timeLeft: timeLeft
        });
    }
};