import React from 'react';
import PropTypes from 'prop-types';

const Button = ({id, label, onClick, path = "", classNames = ""}) => (
    <button id={id} onClick={onClick} className={classNames}>{label}</button>
);

Button.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    path: PropTypes.string,
    classNames: PropTypes.string
};

export default Button;