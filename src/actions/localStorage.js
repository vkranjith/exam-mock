import {ExamStateInit} from "./variables";

export const loadState = () => {
    let appState;
    try {
        let serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            appState = ExamStateInit;
        } else {
            serializedState = JSON.parse(serializedState);
            appState = Object.assign({}, ExamStateInit, serializedState);
        }
    } catch (err) {
        appState = ExamStateInit;
    }
    return appState;
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};