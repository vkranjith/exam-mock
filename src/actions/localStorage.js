import {ExamStateInit} from "./variables";
import {getRouteData, updateRoute} from "./function";
import deepmerge from 'deepmerge';

export const loadState = () => {
    let appState;
    try {
        let serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            appState = ExamStateInit;
        } else {
            serializedState = JSON.parse(serializedState);
            appState = deepmerge(ExamStateInit, serializedState);
            appState = updateRoute(appState, getRouteData());
        }
    } catch (e) {
        console.error(e);
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

export const updateTime = (value, name = "timeLeft") => {
    try {
        let serializedTime = localStorage.getItem('time');
        if (serializedTime === null) {
            serializedTime = `{"${name}":${value}}`;
        } else {
            let timeData = JSON.parse(serializedTime);
            timeData[name] = value;
            serializedTime = JSON.stringify(timeData);
        }
        localStorage.setItem('time', serializedTime);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getExamData = (name) => {
    try {
        let serializedState = localStorage.getItem('state');
        let value;
        if (serializedState === null) {
            value = "";
        } else {
            let state = JSON.parse(serializedState);
            if (state.exam) {
                value = state.exam[name];
            }
        }
        return value;
    } catch (e) {
        console.error(e);
        return "";
    }
};

export const loadTime = (name = "timeLeft") => {
    let time = 0;
    try {
        let serializedTime = localStorage.getItem('time');
        if (serializedTime !== null) {
            let timeData = JSON.parse(serializedTime);
            time = timeData[name];
        }
    } catch (e) {
        console.error(e);
    }
    return time;
};