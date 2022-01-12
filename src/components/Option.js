import {useEffect, useState} from "react";

const Option = ({handleAnswerOptionClick, answerOption, isSelected, isSubmitting}) => {
    const btnStyle = {
        normal: 'btn m-1 btn-primary',
        correct: 'btn m-1 btn-success',
        incorrect: 'btn m-1 btn-danger'
    }

    const [disabled, setDisabled] = useState(false);
    const [btnClass, setBtnClass] = useState(btnStyle.normal);

    useEffect(() => {
        if (isSubmitting) {
            setDisabled(true)
            if (answerOption.isCorrect) {
                setBtnClass(btnStyle.correct)
            } else if (isSelected && !answerOption.isCorrect) {
                setBtnClass(btnStyle.incorrect)
            }
        } else {
            setDisabled(false)
            setBtnClass(btnStyle.normal)
        }
    }, [isSubmitting]);

    return (
        <button
            className={btnClass}
            onClick={handleAnswerOptionClick}
            disabled={disabled}>
            {answerOption.answerText}
        </button>
    )
};

export default Option;