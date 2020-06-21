import React from 'react';
import Header from "./Header";
import Footer from './Footer';
import {ExamStatus} from "../actions";
import '../assets/css/App.css';
import Timer from "./elements/Timer";
import {Switch, Route} from "react-router-dom";
import ReviewPage from "./exam/pages/Review";
import CompletePage from "./exam/pages/Complete";
import SubmitPage from "./exam/pages/Submit";
import QuestionPage from "./exam/pages/Question";
import WelcomePage from "./exam/pages/Welcome";
import {useDispatch, useStore} from "react-redux";

const App = ({state}) => {
    let dispatch = useDispatch();
    let currentQuestion = useStore().getState().question.currentQuestion;
    return (
        <div className="exam-app">
            <Header/>
            <Route path="/(review|submit|question)" component={Timer} />
            <hr/>
            <Switch>
                <Route path="/" exact component={WelcomePage} />
                <Route path="/question/:id" exact component={
                    (props) => <QuestionPage dispatch={dispatch} match={props.match} currentQuestion={currentQuestion} />
                } />
                {state.exam.status === ExamStatus.STATUS_REVIEW ?
                    <Route path="/review" exact component={ReviewPage}/> : ''}
                {state.exam.status === ExamStatus.STATUS_SUBMIT ?
                    <Route path="/submit" exact component={SubmitPage}/> : ''}
                <Route path="/complete" exact component={CompletePage} />
            </Switch>
            <hr/>
            <Footer/>
        </div>
    );
};

export default App;