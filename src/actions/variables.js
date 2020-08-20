export const ExamStatus = {
    STATUS_WELCOME: 0,
    STATUS_START: 1,
    STATUS_REVIEW: 2,
    STATUS_SUBMIT: 3,
    STATUS_COMPLETE: 4
};

export const ExamRouters = {
    PAGE_WELCOME: {
        path: '/',
        status: ExamStatus.STATUS_WELCOME
    },
    PAGE_SELECTION: {
        path: '/selection',
        status: ExamStatus.STATUS_WELCOME
    },
    PAGE_QUESTION: {
        path: '/question/:id',
        status: ExamStatus.STATUS_START
    },
    PAGE_REVIEW: {
        path: '/review',
        status: ExamStatus.STATUS_REVIEW
    },
    PAGE_COMPLETE: {
        path: '/complete',
        status: ExamStatus.STATUS_COMPLETE
    },
    PAGE_SUBMIT: {
        path: '/submit',
        status: ExamStatus.STATUS_SUBMIT
    }
};

export let ExamData = {
    MAX_SCORE: 100,
    QUESTIONS: [],
    QUESTION_URL: "http://local.data.com/exam-data/"
};

export const ExamStateInit = {
    exam: {
        status: ExamStatus.STATUS_WELCOME,
        score: 0,
        startTime: 0,
        endTime: 0,
        timeLeft: 0,
        questionSet: "questions",
        isFetching: false,
        total_time: 0, // in seconds
        name: ""
    },
    question: {
        currentQuestion: 0,
        answers: [],
        reviewList: []
    }
};