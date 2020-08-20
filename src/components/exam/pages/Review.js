import React from 'react';
import Review from "../../../containers/exam/Review";
import Controls from "../../../containers/exam/Controls";
import PageComponent from "./Page";

const ReviewPage = (props) => {
    return (
        <div>
            <PageComponent {...props}>
                <div>
                    <h3>Review questions.</h3>
                    <Review/>
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default ReviewPage;