import React from 'react';
import PropTypes from "prop-types";
import renderHTML from 'react-render-html';
import {updateAnswer} from "../../actions";

const Option = ({id, option, value, type, name, selected, dispatch, selectedAnswers = []}) => {
    let input;
    return (
        <li id={"option_" + id} className="option">
            <label>
                <input
                    type={type}
                    value={value}
                    name={name}
                    ref={node => (input = node)}
                    onChange={() => {
                        let answers = selectedAnswers;
                        let answerUpdated = false;
                        answers.map((answer) => {
                            if (type === "radio" && answer.question === name) {
                                answerUpdated = true;
                                answer.answers = [input.value];
                                return answer;
                            } else if (answer.question === name) {
                                answerUpdated = true;
                                answer.answers.push(input.value);
                                answer.answers = answer.answers.filter((value) => {
                                    if (value === input.value) {
                                        return input.checked;
                                    }
                                    return true;
                                });
                            }
                        });
                        if (!answerUpdated) {
                            answers.push({
                                question: name,
                                answers: [input.value]
                            });
                        }
                        dispatch(updateAnswer(answers));
                    }}
                />
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
    selected: PropTypes.bool.isRequired,
    selectedAnswers: PropTypes.array
};

export default Option;