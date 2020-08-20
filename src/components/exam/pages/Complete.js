import React from 'react';
import {useStore} from "react-redux";
import Controls from "../../../containers/exam/Controls";
import PageComponent from "./Page";

const CompletePage = (props) => {
    let state = useStore().getState();
    return (
        <div>
            <PageComponent {...props}>
                <div>
                    <h2>Complete</h2>
                    <p>Your score is {state.exam.score}%</p>
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default CompletePage;