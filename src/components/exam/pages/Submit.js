import React from 'react';
import Controls from "../../../containers/exam/Controls";
import PageComponent from "./Page";

const SubmitPage = (props) => {
    return (
        <div>
            <PageComponent {...props}>
                <div>
                    <h3>Are you sure you are ready to submit?</h3>
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default SubmitPage;