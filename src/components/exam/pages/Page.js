import React from 'react';
import {useDispatch, useStore} from "react-redux";
import {verifyRoute} from "../../../actions/function";

const PageComponent = ({containerClass = "", children, match, history}) => {
    let state = useStore().getState();
    const dispatch = useDispatch();
    verifyRoute(state, match, dispatch, history);
    containerClass += " exam-area";
    return (
        <div className={containerClass}>
            {children}
        </div>
    );
};

export default PageComponent;