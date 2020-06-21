import React from 'react';
import PropTypes from 'prop-types';
import {setCurrentQuestion} from "../../actions";
import {useDispatch} from "react-redux";

const Link = ({questionID, label, classNames = ""}) => {
    let dispatch = useDispatch();
    return (
        <a href={`/question/${questionID + 1}`}
           id={`review-question-${questionID}`}
           onClick={() => {
               dispatch(setCurrentQuestion(questionID));
           }} className={classNames}
        >
            {label}
        </a>
    );
};

Link.propTypes = {
    questionID: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    classNames: PropTypes.string
};

export default Link;