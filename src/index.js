import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import {saveState} from "./actions/localStorage";

const store = createStore(rootReducer);

store.subscribe(() => {
    saveState(store.getState());
});

render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);