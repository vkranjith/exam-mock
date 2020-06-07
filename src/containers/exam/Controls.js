import {connect} from 'react-redux';
import Controls from '../../components/exam/Controls';
import {addToReview, removeReview, nextQuestion, previousQuestion, reviewQuestions, startExam} from "../../actions";

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    onStartClick: () => dispatch(startExam()),
    onNextClick: (currentID) => dispatch(nextQuestion(currentID)),
    onPrevClick: (currentID) => dispatch(previousQuestion(currentID)),
    onReviewClick: () => dispatch(reviewQuestions()),
    onAddReviewClick: (currentID, reviewList) => dispatch(addToReview(currentID, reviewList)),
    onRemoveReviewClick: (currentID, reviewList) => dispatch(removeReview(currentID, reviewList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);