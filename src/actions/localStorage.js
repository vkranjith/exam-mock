import {ExamStateInit} from "./index";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return ExamStateInit;
        }
        return Object.assign({}, ExamStateInit, JSON.parse(serializedState));
    } catch (err) {
        return ExamStateInit;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};