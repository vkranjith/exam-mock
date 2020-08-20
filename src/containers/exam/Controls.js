import {connect} from 'react-redux';
import Controls from '../../components/exam/Controls';
import {
    welcome,
    addToReview,
    removeReview,
    nextQuestion,
    previousQuestion,
    reviewQuestions,
    startExam,
    clearAnswers,
    setCurrentQuestion,
    submitExam
} from "../../actions";
import {
    checkAnswer,
    goBack,
    proceed
} from "../../actions/function";

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    onWelcomeClick: (history) => dispatch(welcome(history)),
    onStartClick: (history) => {
        dispatch(startExam(history));
        dispatch(clearAnswers());
        dispatch(setCurrentQuestion(0))
    },
    onSubmitClick: (state, history) => dispatch(submitExam(state, history)),
    onNextClick: (currentID, history) => dispatch(nextQuestion(currentID, history)),
    onPrevClick: (currentID, history) => dispatch(previousQuestion(currentID, history)),
    onReviewClick: (history) => dispatch(reviewQuestions(history)),
    onAddReviewClick: (currentID, reviewList) => dispatch(addToReview(currentID, reviewList)),
    onRemoveReviewClick: (currentID, reviewList) => dispatch(removeReview(currentID, reviewList)),
    onBackClick: (history) => goBack(history),
    onProceedClick: (history) => proceed(history),
    onCheckClick: (questions, currentID) => checkAnswer(questions, currentID)
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);