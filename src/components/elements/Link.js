import React from 'react';
import PropTypes from 'prop-types';
import {setCurrentQuestion} from "../../actions";

const Link = ({questionID, label, dispatch, classNames = ""}) => (
    <a href="#" id={"review-question-" + questionID} onClick={() => {
        dispatch(setCurrentQuestion(questionID));
    }} className={classNames}>{label}</a>
);

Link.propTypes = {
    questionID: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    classNames: PropTypes.string
};

export default Link;