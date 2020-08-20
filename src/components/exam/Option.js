import React from 'react';
import PropTypes from "prop-types";
import renderHTML from 'react-render-html';
import {updateAnswer} from "../../actions";
import {useDispatch, useStore} from 'react-redux';

const Option = ({id, option, value, type, name, classNames = ""}) => {
    let input;
    let dispatch = useDispatch();
    let allAnswers = useStore().getState().question.answers;
    let selected = false;
    for (let i=0; i<allAnswers.length; i++) {
        let item = allAnswers[i];
        if (item && item.question === name) {
            for (let j=0; j<item.answers.length; j++) {
                let answer = item.answers[j];
                if (answer === value) {
                    selected = true;
                }
            }
        }
    }
    return (
        <li id={"option_" + id} className={"option " + classNames}>
            <label>
                <input
                    type={type}
                    value={value}
                    name={name}
                    ref={node => (input = node)}
                    onChange={() => {
                        let answer = allAnswers[name];
                        if (answer) {
                            if (type === "radio") {
                                answer.answers = [Number(input.value)];
                            } else {
                                answer.answers.push(Number(input.value));
                                answer.answers = answer.answers.filter((value) => {
                                    if (value === Number(input.value)) {
                                        return input.checked;
                                    }
                                    return true;
                                });
                            }
                            allAnswers[name] = answer;
                        } else {
                            allAnswers[name] = {
                                question: name,
                                answers: [Number(input.value)]
                            };
                        }
                        dispatch(updateAnswer(allAnswers));
                    }}
                    defaultChecked={selected}/>
                <div className="option-content">{renderHTML(option)}</div>
            </label>
        </li>
    );
};

Option.propTypes = {
    id: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.number.isRequired,
    classNames: PropTypes.string
};

export default Option;