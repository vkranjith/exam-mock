import { connect } from 'react-redux';
import App from '../components/App';
import {submitExam} from "../actions";

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    onSubmitClick: (state) => dispatch(submitExam(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);