import { connect } from 'react-redux';
import App from '../components/App';
import {submitExam} from "../actions";

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    onSubmitClick: () => dispatch(submitExam())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);