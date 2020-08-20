import {connect} from 'react-redux';
import {ExamData} from "../../actions/variables";
import Review from "../../components/exam/Review";

const mapStateToProps = state => ({
    questions: ExamData.QUESTIONS,
    reviewList: state.question.reviewList,
    answers: state.question.answers
});

export default connect(mapStateToProps)(Review);