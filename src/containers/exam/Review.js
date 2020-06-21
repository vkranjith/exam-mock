import {connect} from 'react-redux';
import {ExamStatus} from "../../actions";
import Review from "../../components/exam/Review";

const mapStateToProps = state => ({
    questions: ExamStatus.QUESTIONS,
    reviewList: state.question.reviewList
});

export default connect(mapStateToProps)(Review);