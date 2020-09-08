import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from "react-render-html";
import Option from "./Option";
import {ExamData} from "../../actions/variables";

const Question = ({id}) => {
    if (ExamData.QUESTIONS[id]) {
        let question = ExamData.QUESTIONS[id];
        return (
            <div id={"question_" + id}>
                <h3 className="question"><span
                    className="question-number">{id + 1}.</span>{renderHTML(question.question.replace(/(?:\r\n|\r|\n)/g, '<br>'))}
                </h3>
                <ol className="options-list">
                    {question.options.map((option, index) => (
                        <Option key={id + "-" + index}
                                option={option}
                                value={index}
                                name={id}
                                id={id + "-" + index}
                                type={question.answers.length > 1 ? "checkbox" : "radio"}/>
                    ))}
                </ol>
            </div>
        );
    } else {
        return (
            <div>No question found!</div>
        );
    }
};

Question.propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired,
        answers: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired
    })
};

export default Question;