import React from 'react';
import Controls from "../../../containers/exam/Controls";
import Question from "../../../components/exam/Question";
import PageComponent from "./Page";
import {setCurrentQuestion} from "../../../actions";

class QuestionPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentQuestion: 0
        }
    }

    static getDerivedStateFromProps(props, state) {
        let currentQuestion = --props.match.params.id;
        if (props.currentQuestion !== currentQuestion) {
            props.dispatch(setCurrentQuestion(currentQuestion));
        }
        return {
            currentQuestion: currentQuestion
        };
    }

    render() {
        return (
            <div>
                <PageComponent containerClass="questions-page">
                    <div>
                        <h2>Exam Started</h2>
                        <Question id={this.state.currentQuestion}/>
                    </div>
                    <hr/>
                    <Controls/>
                </PageComponent>
            </div>
        );
    }
}

export default QuestionPage;