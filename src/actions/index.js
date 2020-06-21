import QuestionsData from '../assets/data/questions';

/**
 * action creators
 */
export const welcome = (history) => {
    history.push(`/`);
    return {
        type: ExamStatus.STATUS_WELCOME
    }
};
export const startExam = (history) => {
    history.push(`/question/1`);
    return {
        type: ExamStatus.STATUS_START
    }
};

export const clearAnswers = () => ({
    type: ExamActions.CLEAR_ANSWERS
});

export const submitExam = (state, history) => {
    history.push(`/complete`);
    return ({
        type: ExamStatus.STATUS_COMPLETE,
        score: calculateScore(state)
    });
};

export const reviewQuestions = (history) => {
    history.push('/review');
    return {
        type: ExamStatus.STATUS_REVIEW
    }
};

export const updateAnswer = (answers) => {
    return ({
        type: ExamActions.ADD_ANSWER,
        answers
    });
};

export const getQuestionID = (currentQuestionID, type = 'next') => {
    if (type === 'next') {
        return Math.min(ExamStatus.QUESTIONS.length, currentQuestionID + 1);
    } else {
        return Math.max(0, currentQuestionID - 1);
    }
};

export const nextQuestion = (currentQuestionID, history) => {
    let questionID = getQuestionID(currentQuestionID);
    if (questionID >= ExamStatus.QUESTIONS.length) {
        history.push(`/submit`);
        return {
            type: ExamStatus.STATUS_SUBMIT
        };
    }
    history.push(`/question/${questionID + 1}`);
    return setCurrentQuestion(questionID);
};

export const previousQuestion = (currentQuestionID, history) => {
    let questionID = getQuestionID(currentQuestionID, 'prev');
    history.push(`/question/${questionID + 1}`);
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

const calculateScore = (state) => {
    let score = 0;
    let total = ExamStatus.QUESTIONS.length;
    state.question.answers.map((item) => {
        let answers = ExamStatus.QUESTIONS[item.question].answers;
        let options = ExamStatus.QUESTIONS[item.question].options;
        let flag = true;
        answers.map((answer) => {
            let index = options.indexOf(answer);
            if (item.answers.indexOf(index) < 0) {
                flag = false;
            }
            return answer;
        });
        if (flag) {
            score++;
        }
        return item;
    });
    return Math.round((score / total) * 10000) / 100;
};

export const updateTime = (timeLeft) => {
    let type;
    if (timeLeft <= 0) {
        type = ExamStatus.STATUS_COMPLETE;
    } else {
        type = ExamActions.UPDATE_TIME;
    }
    return ({
        type: type,
        timeLeft: timeLeft
    });
};

export const ExamStatus = {
    STATUS_WELCOME: 0,
    STATUS_START: 1,
    STATUS_SUBMIT: 2,
    STATUS_REVIEW: 3,
    STATUS_COMPLETE: 4,
    MAX_SCORE: 100,
    TOTAL_TIME: QuestionsData.time, // in seconds
    QUESTIONS: QuestionsData.questions
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
    UPDATE_TIME: 'UPDATE_TIME',
    CLEAR_ANSWERS: 'CLEAR_ANSWERS'
};

export const ExamStateInit = {
    exam: {
        status: ExamStatus.STATUS_WELCOME,
        score: 0,
        startTime: 0,
        endTime: 0,
        timeLeft: ExamStatus.TOTAL_TIME
    },
    question: {
        currentQuestion: 0,
        answers: [],
        reviewList: []
    }
};