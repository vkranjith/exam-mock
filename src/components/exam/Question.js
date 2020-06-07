import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from "react-render-html";
import Option from "../../containers/exam/Option";

const Question = ({selectedAnswers, id, question}) => {
    return (
        <div id={"question_" + id}>
            <div className="question"><span className="question-number">{id + 1}.</span>{renderHTML(question.question)}</div>
            <ol className="options-list">
                {question.options.map((option, index) => (
                    <Option key={id + "-" + index}
                            selected={false}
                            option={option}
                            value={index}
                            name={id}
                            id={id + "-" + index}
                            selectedAnswers={selectedAnswers}
                            type={question.answers.length > 1 ? "checkbox" : "radio"}/>
                ))}
            </ol>
        </div>
    );
}

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
    }).isRequired
};

export default Question;