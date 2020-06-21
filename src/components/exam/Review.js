import React from 'react'
import PropTypes from 'prop-types'
import Link from "../elements/Link";

const Review = ({questions, reviewList}) => {
    //console.log('Review', param);
    return (
        <div>
            <ol className="review-list">
                {questions.map((question, index) => {
                    let marked = false;
                    if (reviewList.indexOf(index) >= 0) {
                        marked = true;
                    }
                    let classNames = "review-question-link";
                    classNames += marked ? " question-marked" : "";
                    return (
                        <li className={classNames} key={index}>
                            <Link key={index}
                                  questionID={index}
                                  label={"Q." + (index + 1)}/>
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
    ).isRequired
};

export default Review;