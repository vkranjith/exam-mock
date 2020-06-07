import {connect} from 'react-redux';
import Question from '../../components/exam/Question';
import {ExamStateInit} from "../../actions";

const mapStateToProps = state => ({
    selectedAnswers: state.question.answers,
    id: state.question.currentQuestion,
    question: ExamStateInit.question.data[state.question.currentQuestion]
});

export default connect(mapStateToProps)(Question);