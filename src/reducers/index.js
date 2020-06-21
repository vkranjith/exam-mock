import { combineReducers } from 'redux';
import exam from './exam';
import question from './question';

export default combineReducers({
    exam: exam,
    question: question
})