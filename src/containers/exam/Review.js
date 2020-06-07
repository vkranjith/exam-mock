import {connect} from 'react-redux';
import {ExamStateInit} from "../../actions";
import Review from "../../components/exam/Review";

const mapStateToProps = state => ({
    questions: ExamStateInit.question.data,
    reviewList: state.question.reviewList
});

export default connect(mapStateToProps)(Review);