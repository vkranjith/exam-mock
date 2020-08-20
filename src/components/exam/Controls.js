import React from 'react';
import Button from '../elements/Button';
import {ExamData, ExamStatus} from '../../actions/variables';
import {withRouter} from 'react-router-dom';

const getButtons = ({
                        state,
                        history,
                        onWelcomeClick,
                        onStartClick,
                        onNextClick,
                        onPrevClick,
                        onReviewClick,
                        onAddReviewClick,
                        onRemoveReviewClick,
                        onSubmitClick,
                        onBackClick,
                        onProceedClick,
                        onCheckClick
                    }) => {
    let buttons = {};
    buttons['welcome_button'] = <Button label="Try Again"
                                        key="welcome-exam"
                                        id="welcome-exam"
                                        classNames="primary"
                                        onClick={() => onWelcomeClick(history)}/>;
    buttons['start_button'] = <Button label="Start"
                                      key="start-exam"
                                      id="start-exam"
                                      classNames="primary"
                                      onClick={() => onStartClick(history)}/>;
    buttons['submit_button'] = <Button label="Submit"
                                       key="submit-exam"
                                       id="submit-exam"
                                       classNames="secondary"
                                       onClick={() => onSubmitClick(state, history)}/>;
    buttons['review_button'] = <Button label="Review Questions"
                                       key="review-question"
                                       id="review-question"
                                       classNames="highlight"
                                       onClick={() => onReviewClick(history)}/>;
    buttons['prev_button'] = <Button label="Previous"
                                     key="prev-question"
                                     id="prev-question"
                                     classNames="secondary"
                                     onClick={() => onPrevClick(state.question.currentQuestion, history)}/>;
    buttons['next_button'] = <Button label="Next"
                                     key="next-question"
                                     id="next-question"
                                     classNames="secondary"
                                     onClick={() => onNextClick(state.question.currentQuestion, history)}/>;
    buttons['unmark_review_button'] = <Button label="Marked"
                                              key="remove-review-question"
                                              id="remove-review-question"
                                              classNames="highlight"
                                              onClick={() => onRemoveReviewClick(
                                                  state.question.currentQuestion,
                                                  state.question.reviewList
                                              )}/>;
    buttons['mark_review_button'] = <Button label="Mark to Review"
                                            key="add-review-question"
                                            id="add-review-question"
                                            classNames="secondary"
                                            onClick={() => onAddReviewClick(
                                                state.question.currentQuestion,
                                                state.question.reviewList
                                            )}/>;
    buttons['back_button'] = <Button label="Go Back"
                                     key="go-back"
                                     id="go-question"
                                     classNames="secondary"
                                     onClick={() => onBackClick(history)}/>;
    buttons['proceed_button'] = <Button label="Proceed"
                                     key="go-back"
                                     id="go-question"
                                     classNames="secondary"
                                     onClick={() => onProceedClick(history)}/>;
    buttons['check_button'] = <Button label="Check"
                                     key="check-answer"
                                     id="check-answer"
                                     classNames="secondary"
                                     onClick={() => onCheckClick(ExamData.QUESTIONS, state.question.currentQuestion)}/>;
    return buttons;
};
const renderButtons = (props) => {
    let buttons = getButtons(props);
    let state = props.state;
    let leftButtons = [];
    let rightButtons = [];
    if (state.exam.status === ExamStatus.STATUS_START) {
        leftButtons[30] = buttons['next_button'];
        rightButtons[30] = buttons['review_button'];
        rightButtons[1] = buttons['check_button'];
        if (state.question.currentQuestion > 0) {
            leftButtons[20] = buttons['prev_button'];
        }
        if (state.question.reviewList.indexOf(state.question.currentQuestion) >= 0) {
            rightButtons[10] = buttons['unmark_review_button'];
        } else {
            rightButtons[10] = buttons['mark_review_button'];
        }
    } else if (state.exam.status === ExamStatus.STATUS_REVIEW) {
        rightButtons[20] = buttons['submit_button'];
    } else if (state.exam.status === ExamStatus.STATUS_SUBMIT) {
        rightButtons[20] = buttons['submit_button'];
        rightButtons[30] = buttons['review_button'];
    } else if (state.exam.status === ExamStatus.STATUS_COMPLETE) {
        rightButtons[0] = buttons['welcome_button'];
    } else {
        let location = props.location.pathname;
        if (location === '/') {
            rightButtons[0] = buttons['proceed_button'];
        } else if (location === '/selection') {
            leftButtons[0] = buttons['back_button'];
            rightButtons[0] = buttons['start_button'];
        }
    }
    return ([
        (<div className="left" key="left-buttons">{leftButtons}</div>),
        (<div className="right" key="right-buttons">{rightButtons}</div>)
    ]);
};

const Controls = (props) => {
    return (
        <div className="control-actions">
            {renderButtons(props)}
        </div>
    );
};

export default withRouter(Controls);