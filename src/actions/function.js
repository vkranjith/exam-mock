import {ExamData, ExamRouters, ExamStatus} from "./variables";

export const getQuestionID = (currentQuestionID, type = 'next') => {
    if (type === 'next') {
        return Math.min(ExamData.QUESTIONS.length, currentQuestionID + 1);
    } else {
        return Math.max(0, currentQuestionID - 1);
    }
};

export const goBack = (history) => {
    history.goBack();
};

export const proceed = (history) => {
    history.push(ExamRouters.PAGE_SELECTION.path);
};

function getAnswer(questions, questionID) {
    let answers = questions[questionID].answers;
    let options = questions[questionID].options;
    let answerIDs = [];
    for (let i = 0; i < options.length; i++) {
        if (answers.indexOf(options[i]) >= 0) {
            answerIDs.push(i);
        }
    }
    return answerIDs;
}

export const checkAnswer = (questions, questionID) => {
    const answers = getAnswer(questions, questionID);
    for (let i = 0; i < answers.length; i++) {
        let elem = document.getElementById(`option_${questionID}-${answers[i]}`);
        elem.classList.add("highlight")
    }
};

function verifyAnswer(answers, options, item) {
    let flag = true;
    answers.map((answer) => {
        let index = options.indexOf(answer);
        if (item.answers.indexOf(index) < 0) {
            flag = false;
        }
        return answer;
    });
    return flag;
}

export const calculateScore = (state) => {
    let score = 0;
    let total = ExamData.QUESTIONS.length;
    if (!total) {
        return 0;
    }
    state.question.answers.map((item) => {
        let answers = ExamData.QUESTIONS[item.question].answers;
        let options = ExamData.QUESTIONS[item.question].options;
        let flag = verifyAnswer(answers, options, item);
        if (flag) {
            score++;
        }
        return item;
    });
    return Math.round((score / total) * 10000) / ExamData.MAX_SCORE;
};

export const getRouteData = () => {
    let url = window.location.pathname;
    for (const objectData of Object.entries(ExamRouters)) {
        let data = objectData[1];
        let path = data.path;
        let params = [];
        let matches = url.match(data.pattern);
        if (matches && matches.length > 1) {
            for (let i = 1; i < matches.length; i++ ) {
                for (let n = 0; n < data.params.length; n++ ) {
                    path = path.replace(`:${data.params[n]}`, matches[i]);
                    params[data.params[n]] = matches[i];
                }
            }
        }
        if (path === url) {
            return {
                "path": data.path,
                "url": url,
                "params": params
            };
        }
    }
    return {
        "path": url,
        "url": url,
        "params": []
    };
};

export const formatStringWithVariables = (string, data = {}) => {
    for (const [key, value] of Object.entries(data)) {
        string = string.replace(":" + key, value);
    }
    return string;
};

export const getQuestionURL = (questionID) => {
    let data = {
        "id": questionID
    };
    return formatStringWithVariables(ExamRouters.PAGE_QUESTION.path, data);
};

function prepareData(status, params = {}, options = {type: ''}) {
    if (status === ExamStatus.STATUS_START) {
        let id = 0;
        if (options.type === 'state') {
            id = options[options.type].question.currentQuestion;
        } else if (options.type === 'route') {
            id = Number(options[options.type].params.id) - 1;
        }
        if (options.for === 'action') {
            params.questionID = id;
        } else {
            params.id = id;
        }
    }
    return params;
}

export const updateHistory = (url, data = {}) => {
    let history = window.history;
    history.replaceState({}, data.title, url);
};

export const updateRoute = (state, route) => {
    let valid = false;
    let title = '';
    let newStatus = ExamStatus.STATUS_WELCOME;
    let newPath = ExamRouters.PAGE_WELCOME.path;
    for (const objectData of Object.entries(ExamRouters)) {
        let data = objectData[1];
        if (route && data.path === route.path) {
            let dataParams = prepareData(data.status, {}, {type: "state", state});
            let routeParams = prepareData(data.status, {}, {type: "route", route});
            let dataPath = formatStringWithVariables(data.path, dataParams);
            let routePath = formatStringWithVariables(route.path, routeParams);
            if (data.status === state.exam.status && dataPath === routePath) {
                valid = true;
            } else {
                newStatus = data.status;
                newPath = route.url;
                title = formatStringWithVariables(data.title, dataParams);
                break;
            }
        }
    }
    if (!valid) {
        updateHistory(newPath, {title: title});
        state.exam.status = newStatus;
        if (newStatus === ExamStatus.STATUS_START) {
            state.question.currentQuestion = Number(route.params.id) - 1;
        }
    }
    return state;
};