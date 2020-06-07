import React from 'react';
import Button from '../elements/Button';
import {ExamStatus} from "../../actions";

const buttons = ({state, onStartClick, onNextClick, onPrevClick, onReviewClick, onAddReviewClick, onRemoveReviewClick}) => {
    let leftButtons = [];
    let rightButtons = [];
    if (state.exam.status === ExamStatus.STATUS_START || state.exam.status === ExamStatus.STATUS_SUBMIT) {
        leftButtons.push(<Button label="Next"
                                 key="next-question"
                                 id="next-question"
                                 classNames="secondary"
                                 onClick={() => onNextClick(state.question.currentQuestion)}/>);
        leftButtons.push(<Button label="Previous"
                                 key="prev-question"
                                 id="prev-question"
                                 classNames="secondary"
                                 onClick={() => onPrevClick(state.question.currentQuestion)}/>);
        rightButtons.push(<Button label="Review Questions"
                                  key="review-question"
                                  id="review-question"
                                  classNames="highlight"
                                  onClick={() => onReviewClick()}/>);

        if (state.exam.status !== ExamStatus.STATUS_SUBMIT) {
            if (state.question.reviewList.indexOf(state.question.currentQuestion) >= 0) {
                leftButtons.push(<Button label="Marked"
                                         key="remove-review-question"
                                         id="remove-review-question"
                                         classNames="highlight"
                                         onClick={() => onRemoveReviewClick(
                                             state.question.currentQuestion,
                                             state.question.reviewList
                                         )}/>);
            } else {
                leftButtons.push(<Button label="Mark to Review"
                                         key="add-review-question"
                                         id="add-review-question"
                                         classNames="secondary"
                                         onClick={() => onAddReviewClick(
                                             state.question.currentQuestion,
                                             state.question.reviewList
                                         )}/>);
            }
        }
    } else {
        leftButtons.push(<Button label="Start"
                                 key="start-exam"
                                 id="start-exam"
                                 classNames="primary"
                                 onClick={() => onStartClick()}/>);
    }
    return ([
        (<div className="left" key="left-buttons">{leftButtons}</div>),
        (<div className="right" key="right-buttons">{rightButtons}</div>)
    ]);
};

const Controls = (props) => (
    <div className="control-actions">
        {buttons(props)}
    </div>
);

export default Controls;