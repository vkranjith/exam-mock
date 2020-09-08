import React from 'react';
import Timer from "./elements/Timer";
import Info from "./exam/Info";
import {Route} from "react-router-dom";

const Header = () => (
    <header>
        <h1 className="heading">Mock Exam</h1>
        <div className="header-content">
            {/*<Route path="/(review|submit|question)" component={Timer} />*/}
            <Route path="/(review|submit|question)" component={Info} />
        </div>
        <hr/>
    </header>
);

export default Header;