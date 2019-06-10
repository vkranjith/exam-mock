import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import questionsData from './import/questions.json';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.questionsData = questionsData.questions;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Exam Mock</h1>
                </header>
                <Exam
                    questionsData = {this.questionsData}
                />
            </div>
        );
    }
}

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.questionsData = this.props.questionsData;
        this.passMark = 70;
        this.examTime = 3600; // 1 hour
        this.states = [
            "Exam not started.",
            "Exam started.",
            "Review your answers before submitting.",
            "Exam completed!",
            "Exam failed!",
            "Congrats! You passed the exam!",
            "Exam results.",
            "Review your answers."
        ];
        this.state = {
            status: 0,
            currentQuestion: 0,
            answers: [],
            score: 0,
            percent: 0,
            startTime: 0,
            markedForReview: []
        };
    }

    startExam(event) {
        event.preventDefault();
        this.setState({
            status: 1,
            startTime: new Date()
        });
    }

    showQuestion(questionNumber) {
        console.log(questionNumber);
        this.setState({
            status: 1,
            currentQuestion: questionNumber
        });
    }

    nextQuestion() {
        let currentQuestion = this.state.currentQuestion;
        currentQuestion = Math.min(++currentQuestion, this.props.questionsData.length);
        if (currentQuestion === this.props.questionsData.length) {
            this.setState({
                status: 2
            });
        } else {
            this.showQuestion(currentQuestion);
        }
    }

    prevQuestion() {
        let currentQuestion = this.state.currentQuestion;
        currentQuestion = Math.max(--currentQuestion, 0);
        this.showQuestion(currentQuestion);
    }

    jumpTo(selectorId) {
        let currentQuestion = document.getElementById(selectorId).value - 1;
        currentQuestion = Math.max(currentQuestion, 0);
        currentQuestion = Math.min(currentQuestion, this.props.questionsData.length - 1);
        this.showQuestion(currentQuestion);
    }

    updateAnswers(event, questionNumber, optionNumber) {
        let element = event.target;
        if (questionNumber === undefined || optionNumber === undefined) {
            return;
        }
        let questionsData = this.props.questionsData[questionNumber];
        let optionsData = questionsData.options;
        let answers = this.state.answers;
        let questionAnswers = answers.hasOwnProperty(questionNumber) ? answers[questionNumber] : [];
        if (questionsData.answers.length <= 1) {
            questionAnswers = [
                optionsData[optionNumber]
            ];
        } else {
            if (element.checked) {
                questionAnswers.push(optionsData[optionNumber]);
            } else {
                let index = questionAnswers.indexOf(optionsData[optionNumber]);
                questionAnswers.splice(index, 1);
            }
        }
        answers[this.state.currentQuestion] = questionAnswers;
        this.setState({
            answers: answers
        });
    }

    reviewQuestions() {
        this.setState({
            currentQuestion: 0,
            status: 7
        });
    }

    markedForReview() {
        let markedForReview = this.state.markedForReview;
        markedForReview.push(this.state.currentQuestion);
        this.setState({
            markedForReview: markedForReview
        });
    }

    submitAnswers() {
        let result = this.evaluateAnswers();
        let status = result === true ? 5 : 4;
        this.setState({
            status: status
        });
    }

    viewExamResults() {
        this.setState({
            status: 6,
        });
    }

    restartExam() {
        this.setState({
            status: 0,
            currentQuestion: 0,
            answers: [],
            score: 0,
            percent: 0,
            startTime: 0,
            markedForReview: []
        });
    }

    evaluateAnswers() {
        let score = 0;
        for (let i = 0; i < this.props.questionsData.length; i++) {
            let correctAnswers = this.props.questionsData[i].answers;
            let candidateAnswers = this.state.answers[i];
            let isAnswerCorrect = true;
            for (let j = 0; j < correctAnswers.length; j++) {
                if (!candidateAnswers || candidateAnswers.indexOf(correctAnswers[j]) < 0) {
                    isAnswerCorrect = false;
                    break;
                }
            }
            if (isAnswerCorrect) {
                score++;
            }
        }
        let percent = (score / this.props.questionsData.length) * 100;
        percent = Math.round(percent * 100) / 100;
        this.setState({
            score: score,
            percent: percent
        });
        return percent >= this.passMark;
    }

    renderQuestion(questionNumber) {
        let questionData = this.props.questionsData[questionNumber];
        return (
            <Question
                questionData = {questionData}
                answers = {this.state.answers}
                status = {this.state.status}
                id = {questionNumber}
                key = {questionNumber}
                updateAnswers = {(event, questionNumber, optionsNumber) => this.updateAnswers(event, questionNumber, optionsNumber)}
            />
        );
    }

    renderQuestionLink(questionNumber) {
        let questionData = this.props.questionsData[questionNumber];
        return (
            <QuestionLink
                questionData = {questionData}
                answers = {this.state.answers}
                markedForReview = {this.state.markedForReview}
                id = {questionNumber}
                key = {questionNumber}
                onClick = {() => this.showQuestion(questionNumber)}
            />
        );
    }

    render() {
        if (this.state.status === 0) { // starting screen of exam
            return (
                <div>
                    <h2>{this.states[this.state.status]} - {this.props.questionsData.length} Questions</h2>
                    <p>Click on the "Start Exam" button below to start the mock exam.</p>
                    <div className="actions">
                        <button onClick={(event) => this.startExam(event)} className="primary button">Start Exam</button>
                    </div>
                </div>
            );
        } else if (this.state.status === 1) { // exam in progress
            const questions = [
                this.renderQuestion(this.state.currentQuestion)
            ];
            return (
                <div className="content">
                    <div className="toolbar">
                        <h2>{this.states[this.state.status]} - {this.props.questionsData.length} Questions</h2>
                        <Timer
                            startTime = {this.state.startTime}
                            status = {this.state.status}
                            examTime = {this.examTime}
                            key = {"time-" + this.state.status}
                            submit = {() => this.submitAnswers()}
                        />
                    </div>
                    <ul className="questions-list">
                        {questions}
                    </ul>
                    <div className="actions">
                        <div className="jump_to_block">
                            <input type="text" maxLength="3" name="jump_to_number" id="jump_to_number" placeholder="#"/>
                            <button onClick={() => this.jumpTo('jump_to_number')} className="button">Go To</button>
                        </div>
                        <button onClick={() => this.markedForReview()} className="secondary button">Mark for Review</button>
                        <button onClick={() => this.reviewQuestions()} className="primary button">Review</button>
                        <button onClick={() => this.prevQuestion()} className={"primary button" + (this.state.currentQuestion > 0 ? "" : " no-display")}>Back</button>
                        <button onClick={() => this.nextQuestion()} className="secondary button">Next</button>
                    </div>
                </div>
            );
        } else if (this.state.status === 2) { // exam in progress before submit action
            return (
                <div className="content">
                    <div className="toolbar">
                        <h2>{this.states[this.state.status]} - {this.props.questionsData.length} Questions</h2>
                        <Timer
                            startTime = {this.state.startTime}
                            status = {this.state.status}
                            examTime = {this.examTime}
                            key = {"time-" + this.state.status}
                            submit = {() => this.submitAnswers()}
                        />
                    </div>
                    <div className="actions">
                        <button onClick={() => this.reviewQuestions()} className="primary button">Review</button>
                        <button onClick={() => this.submitAnswers()} className="secondary button">Submit</button>
                    </div>
                </div>
            );
        } else if (this.state.status === 3 || this.state.status === 4 || this.state.status === 5) { // exam status
            return (
                <div className="content">
                    <h2>{this.states[this.state.status]} - {this.props.questionsData.length} Questions</h2>
                    <p>Score: <span>{this.state.score}/{this.questionsData.length}</span></p>
                    <p>Percentage: <span>{this.state.percent}%</span></p>
                    <div className="actions">
                        <button onClick={() => this.viewExamResults()} className="primary button">View Results</button>
                        <button onClick={() => this.restartExam()} className="secondary button">Retake Exam</button>
                    </div>
                </div>
            );
        } else if (this.state.status === 6) { // Final results page
            const questions = [];
            for (let i = 0; i < this.props.questionsData.length; i++) {
                questions[i] = this.renderQuestion(i);
            }
            return (
                <div className="content">
                    <h2>{this.states[this.state.status]} - {this.props.questionsData.length} Questions</h2>
                    <p>Score: <span>{this.state.score}/{this.questionsData.length}</span></p>
                    <p>Percentage: <span>{this.state.percent}%</span></p>
                    <div className="exam-results">
                        <ul className="questions-list">
                            {questions}
                        </ul>
                    </div>
                    <div className="actions">
                        <button onClick={() => this.restartExam()} className="primary button">Retake Exam</button>
                    </div>
                </div>
            );
        } else if (this.state.status === 7) { // review answers page
            const questions = [];
            for (let i = 0; i < this.props.questionsData.length; i++) {
                questions[i] = this.renderQuestionLink(i);
            }
            return (
                <div className="content">
                    <h2>{this.states[this.state.status]} - {this.props.questionsData.length} Questions</h2>
                    <Timer
                        startTime = {this.state.startTime}
                        status = {this.state.status}
                        examTime = {this.examTime}
                        key = {"time-" + this.state.status}
                        submit = {() => this.submitAnswers()}
                    />
                    <div className="exam-results">
                        <ul className="review-list">
                            {questions}
                        </ul>
                    </div>
                    <div className="actions">
                        <button onClick={() => this.restartExam()} className="primary button">Retake Exam</button>
                        <button onClick={() => this.submitAnswers()} className="secondary button">Submit</button>
                    </div>
                </div>
            );
        }
    }
}

class Question extends React.Component {
    renderOption(optionNumber) {
        let optionsData = this.props.questionData.options;
        let correctAnswers = this.props.questionData.answers;
        let answers = this.props.answers[this.props.id];
        let selected = false;
        let highlight = '';
        let updateAnswersFunction;
        if (answers) {
            selected = answers.indexOf(optionsData[optionNumber]) >= 0;
        }
        if (this.props.status === 6) {
            updateAnswersFunction = (event) => this.props.updateAnswers(event);
            if (selected) {
                highlight = correctAnswers.indexOf(optionsData[optionNumber]) >= 0 ? "answer-correct" : "answer-wrong";
            } else {
                highlight = correctAnswers.indexOf(optionsData[optionNumber]) >= 0 ? "answer-correct-highlight" : "";
            }
        } else {
            updateAnswersFunction = (event, questionNumber, optionsNumber) => this.props.updateAnswers(event, questionNumber, optionsNumber);
        }
        let optionType = this.props.questionData.answers.length > 1 ? 'checkbox' : 'radio';
        return (
            <Option
                optionData = {optionsData[optionNumber]}
                optionType = {optionType}
                questionNumber = {this.props.id}
                selected = {selected}
                className = {highlight}
                updateAnswers = {updateAnswersFunction}
                id = {optionNumber}
                name = {this.props.id}
                key = {optionNumber}
            />
        );
    }
    render() {
        const options = [];
        for (let i = 0; i < this.props.questionData.options.length; i++) {
            options[i] = this.renderOption(i);
        }
        return (
            <li id={"question_"+this.props.id}>
                <h3><p className="question-number">{this.props.id+1}.</p>{renderHTML(this.props.questionData.question)}</h3>
                <ol className="options-list">
                    {options}
                </ol>
            </li>
        )
    }
}

function Option(props) {
    return (
        <li id={"option_"+props.id} className={props.className}>
            <label>
                <input
                    type={props.optionType}
                    value={props.optionData}
                    name={props.name}
                    checked={props.selected}
                    onChange={(event) => props.updateAnswers(event, props.questionNumber, props.id)}
                />
                <div>{renderHTML(props.optionData)}</div>
            </label>
        </li>
    );
}

function QuestionLink(props) {
    let markedClassName = props.markedForReview.indexOf(props.id) >= 0 ? "marked-for-review" : "";
    return (
        <li id={"option_"+props.id} className="question-review-link">
            <button onClick={() => props.onClick()} className={"item " + markedClassName}>{"Q-"+props.id}</button>
        </li>
    );
}

class Timer extends Component {
    constructor(props) {
        super(props);
        this.multiplier = 60;
        this.showTimeRemaining = true;
        this.state = {
            hours: "00",
            minutes: "00",
            seconds: "00"
        };
    }

    updateTimer() {
        let startTime = this.props.startTime;
        let currentTime = new Date();
        let totalSeconds = Math.round((currentTime - startTime) / 1000);
        if (this.showTimeRemaining) {
            totalSeconds = this.props.examTime - totalSeconds;
        }
        let seconds = totalSeconds % this.multiplier;
        let minutes = ((totalSeconds - seconds) / this.multiplier) % this.multiplier;
        let hours = ((totalSeconds - (seconds + (minutes * this.multiplier))) / this.multiplier) / this.multiplier;
        if (this.state.totalSeconds >= this.props.examTime) {
            this.props.submit();
            return seconds;
        }
        this.setState({
            hours: hours.toString().length === 1 ? "0" + hours : hours,
            minutes: minutes.toString().length === 1 ? "0" + minutes : minutes,
            seconds: seconds.toString().length === 1 ? "0" + seconds : seconds,
            totalSeconds: totalSeconds
        });
        return seconds;
    }

    render() {
        let self = this;
        setTimeout(function () {
            self.updateTimer();
        }, 1000);
        return (
            <div className="timer">
                Time {this.showTimeRemaining ? "Remaining" : ""}: {this.state.hours}:{this.state.minutes}:{this.state.seconds} (Total Time: {this.props.examTime / this.multiplier} minutes)
            </div>
        );
    }
}

export default App;
