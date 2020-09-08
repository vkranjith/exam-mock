export const ExamStatus = {
    STATUS_WELCOME: 0,
    STATUS_START: 1,
    STATUS_REVIEW: 2,
    STATUS_SUBMIT: 3,
    STATUS_COMPLETE: 4,
    SCORE_STATUS_PASS: "Passed",
    SCORE_STATUS_FAIL: "Failed",
};

export const ExamRouters = {
    PAGE_WELCOME: {
        pattern: '',
        params: [],
        path: '/',
        status: ExamStatus.STATUS_WELCOME,
        title: "Exam Mock"
    },
    PAGE_SELECTION: {
        pattern: '',
        params: [],
        path: '/selection',
        status: ExamStatus.STATUS_WELCOME,
        title: "Exam Set Selection - Exam Mock"
    },
    PAGE_QUESTION: {
        pattern: /\/question\/(\d*)/,
        params: [
            "id"
        ],
        path: '/question/:id',
        status: ExamStatus.STATUS_START,
        title: "Question :id - Exam Mock"
    },
    PAGE_REVIEW: {
        pattern: '',
        params: [],
        path: '/review',
        status: ExamStatus.STATUS_REVIEW,
        title: "Review - Exam Mock"
    },
    PAGE_COMPLETE: {
        pattern: '',
        params: [],
        path: '/complete',
        status: ExamStatus.STATUS_COMPLETE,
        title: "Complete - Exam Mock"
    },
    PAGE_SUBMIT: {
        pattern: '',
        params: [],
        path: '/submit',
        status: ExamStatus.STATUS_SUBMIT,
        title: "Submit - Exam Mock"
    }
};

export let ExamData = {
    MAX_SCORE: 100,
    PASS_SCORE: 60,
    QUESTIONS: [],
    QUESTION_URL: "http://local.data.com/exam-data/"
};

export const ExamStateInit = {
    exam: {
        status: ExamStatus.STATUS_WELCOME,
        score: 0,
        score_status: ExamStatus.SCORE_STATUS_FAIL,
        startTime: 0,
        endTime: 0,
        timeLeft: 0, // in seconds
        questionSet: "questions",
        isFetching: false,
        totalTime: 0, // in seconds
        name: ""
    },
    question: {
        currentQuestion: 0,
        answers: [],
        reviewList: []
    }
};