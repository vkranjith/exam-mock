import QuestionsData from '../assets/data/questions';

/**
 * action creators
 */
export const startExam = () => ({
    type: ExamStatus.STATUS_START
});

export const submitExam = () => {
    return ({
        type: ExamStatus.STATUS_COMPLETE,
        score: calculateScore()
    });
};

export const reviewQuestions = () => ({
    type: ExamStatus.STATUS_REVIEW
});

export const updateAnswer = (answers) => {
    return ({
        type: ExamActions.ADD_ANSWER,
        answers
    });
};

export const nextQuestion = (currentQuestionID) => {
    let questionID = Math.min(ExamStateInit.question.data.length, currentQuestionID + 1);
    if (questionID >= ExamStateInit.question.data.length) {
        return {
            type: ExamStatus.STATUS_SUBMIT
        };
    }
    return setCurrentQuestion(questionID);
};

export const previousQuestion = (currentQuestionID) => {
    let questionID = Math.max(0, currentQuestionID - 1);
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

export const calculateScore = () => ({
    type: ExamActions.CALCULATE
});

export const ExamStatus = {
    STATUS_WELCOME: 0,
    STATUS_START: 1,
    STATUS_SUBMIT: 2,
    STATUS_REVIEW: 3,
    STATUS_COMPLETE: 4
};
export const ExamActions = {
    ADD_ANSWER: 'ADD_ANSWER',
    ADD_REVIEW: 'ADD_REVIEW',
    NEXT_QUESTION: 'NEXT_QUESTION',
    PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
    CURRENT_QUESTION: 'CURRENT_QUESTION',
    SUBMIT: 'SUBMIT',
    CALCULATE: 'CALCULATE',
    VALIDATE_ANSWER: 'VALIDATE_ANSWER',
};

export const ExamStateInit = {
    exam: {
        status: ExamStatus.STATUS_WELCOME,
        score: 0
    },
    question: {
        currentQuestion: 0,
        answers: [],
        reviewList: [],
        data: QuestionsData.questions
    }
};