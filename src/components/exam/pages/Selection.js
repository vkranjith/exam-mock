import React from 'react';
import PageComponent from "./Page";
import Controls from "../../../containers/exam/Controls";
import Dropdown from "../../elements/Dropdown";
import QuestionSets from "../../../assets/data/question-set";
import {fetchQuestionsIfNeeded} from "../../../actions/fetcher";
import {useDispatch} from "react-redux";

const SelectionPage = (props) => {
    let dispatch = useDispatch();
    let options = [];
    for (let i = 0; i < QuestionSets.count; i++) {
        options.push({
            value: QuestionSets.files[i].file.slice(0, -5),
            label: QuestionSets.files[i].name
        });
    }
    let loadQuestionSet = (e) => {
        dispatch(fetchQuestionsIfNeeded(e.target.value));
    };
    return (
        <div>
            <PageComponent {...props}>
                <div>
                    <h2>Select The Exam.</h2>
                    <div>
                        <p>Select the appropriate mock exam set that you want to run from the below dropdown.</p>
                        <Dropdown id="exam-selection" options={options} emptyOption="Select a set ..." onChange={loadQuestionSet}/>
                    </div>
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default SelectionPage;