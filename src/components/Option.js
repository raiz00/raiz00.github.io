const Option = ({handleAnswerOptionClick, answerOption, answered = false}) => {
    const btnClass = {
        normal: 'btn m-1 btn-primary',
        correct: 'btn m-1 btn-success',
        incorrect: 'btn m-1 btn-danger'
    }

    const decideClassName = () => {
        if (answered) {
            return answerOption.isCorrect ? btnClass.correct : btnClass.incorrect
        } else {
            return btnClass.normal
        }
    }

    return (
        <button
            className={decideClassName()}
            onClick={handleAnswerOptionClick}
            disabled={answered}>
            {answerOption.answerText}
        </button>
    )
};

export default Option;