import React from 'react'
import PropTypes from 'prop-types'
import Link from "../elements/Link";

const Review = ({questions, reviewList, answers}) => {
    return (
        <div>
            <ol className="review-list">
                {questions.map((question, index) => {
                    let subElements = [];
                    let classNames = "review-question-link";
                    if (reviewList.indexOf(index) >= 0) {
                        classNames += " question-marked";
                        subElements.push(<span className='question-marked'>&nbsp;</span>);
                    }
                    for (let i = 0; i < answers.length; i++) {
                        if (Number(answers[i].question) === index) {
                            console.log(answers[i], index);
                            classNames += " question-answered";
                            subElements.push(<span className='question-answered'>&nbsp;</span>);
                        }
                    }

                    return (
                        <li className={classNames} key={index}>
                            <Link key={index}
                                  questionID={index}
                                  label={"Q." + (index + 1)}/>
                            {subElements}
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

Review.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.string.isRequired
            ).isRequired,
            answers: PropTypes.arrayOf(
                PropTypes.string.isRequired
            ).isRequired
        }).isRequired,
    ).isRequired,
    reviewList: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.number.isRequired,
            answers: PropTypes.arrayOf(
                PropTypes.number.isRequired
            ).isRequired
        }).isRequired
    ).isRequired
};

export default Review;