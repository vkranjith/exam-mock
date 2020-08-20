import React from 'react';
import PageComponent from "./Page";
import Controls from "../../../containers/exam/Controls";

const WelcomePage = (props) => {
    return (
        <div>
            <PageComponent {...props}>
                <div>
                    <h2>Welcome</h2>
                    <div>
                        <p>This is a mock test application and hope you make use of it well.</p>
                    </div>
                </div>
                <hr/>
                <Controls/>
            </PageComponent>
        </div>
    );
};

export default WelcomePage;