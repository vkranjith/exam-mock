import React from 'react';
import Header from "./Header";
import Footer from './Footer';
import {ExamRouters} from "../actions/variables";
import '../assets/css/App.css';
import {Switch, Route} from "react-router-dom";
import ReviewPage from "./exam/pages/Review";
import CompletePage from "./exam/pages/Complete";
import SubmitPage from "./exam/pages/Submit";
import QuestionPage from "./exam/pages/Question";
import WelcomePage from "./exam/pages/Welcome";
import SelectionPage from "./exam/pages/Selection";

const App = () => {
    return (
        <div className="exam-app">
            <Header/>
            <Switch>
                <Route path={ExamRouters.PAGE_WELCOME.path} exact component={WelcomePage} />
                <Route path={ExamRouters.PAGE_SELECTION.path} exact component={SelectionPage} />
                <Route path={ExamRouters.PAGE_QUESTION.path} exact component={QuestionPage} />
                <Route path={ExamRouters.PAGE_REVIEW.path} exact component={ReviewPage}/>
                <Route path={ExamRouters.PAGE_SUBMIT.path} exact component={SubmitPage}/>
                <Route path={ExamRouters.PAGE_COMPLETE.path} exact component={CompletePage} />
            </Switch>
            <hr/>
            <Footer/>
        </div>
    );
};

export default App;