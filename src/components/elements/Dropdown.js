import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({id, options, label = "", onChange = () => {}, classNames = "", defaultOption = "", emptyOption = ""}) => {
    let optionElements = [];
    if (emptyOption) {
        optionElements.push(<option key="empty-option">{emptyOption}</option>);
    }
    for (let i = 0; i < options.length; i++) {
        optionElements.push(<option value={options[i].value} key={i}>{options[i].label}</option>);
    }
    return (
        <div>
            <label>
                {label}
                <select id={id} onChange={(e) => onChange(e)}>
                    {optionElements}
                </select>
            </label>
        </div>
    );
};

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired.isRequired
        })
    ).isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    classNames: PropTypes.string,
    defaultOption: PropTypes.string,
    emptyOption: PropTypes.string
};

export default Dropdown;