import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getQuestions} from "../api/DogApi";
import Option from "./Option";
import {storage_key} from "../values";

const Game = ({playerName, pageHeader}) => {
    let navigate = useNavigate()

    const [questions, setQuestions] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(false)

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem(storage_key.is_game_started))) {
            let savedQuestions = JSON.parse(sessionStorage.getItem(storage_key.questions))
            if (savedQuestions == null) {
                getQuestions()
                    .then(res => {
                        sessionStorage.setItem(storage_key.questions, JSON.stringify(res.data))
                        setQuestions(res.data);
                        setError(res.msg)
                    })
                    .finally(() => setIsLoading(false))
            } else {
                setQuestions(savedQuestions)
                setIsLoading(false)

                let saved_current_question = JSON.parse(sessionStorage.getItem(storage_key.current_question))
                if (saved_current_question != null) setCurrentQuestion(saved_current_question)
                else sessionStorage.setItem(storage_key.current_question, JSON.stringify(currentQuestion))

                let saved_score = JSON.parse(sessionStorage.getItem(storage_key.score))
                if (saved_score != null) setScore(saved_score)
                else sessionStorage.setItem(storage_key.score, JSON.stringify(score))
            }
        } else {
            navigate("/")
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem(storage_key.current_question, JSON.stringify(currentQuestion))
    }, [currentQuestion])

    useEffect(() => {
        sessionStorage.setItem(storage_key.score, JSON.stringify(score))
    }, [score])

    useEffect(() => {
        if (!showScore) return
        sessionStorage.clear()
    }, [showScore])


    const checkIsCorrect = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setAnswered(true)
    }

    const handleAnswerOptionClick = () => {
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setAnswered(false)
            setCurrentQuestion(nextQuestion)
        } else {
            saveScore()
            setShowScore(true);
        }
    };

    const saveScore = () => {
        let item = {
            playerName: playerName,
            date: Date.now(),
            score: score,
            no_questions: questions.length
        }

        let history = JSON.parse(localStorage.getItem(storage_key.history))

        if (history == null)
            history = [item]
        else
            history.push(item)

        localStorage.setItem(storage_key.history, JSON.stringify(history))
    }

    if (isLoading) return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

    if (error) return error

    return (
        <>
            {showScore ?
                navigate("/score", {state: {pageHeader: false}})
                : (
                    <>
                        <h2 className='mb-3'>{pageHeader}, {playerName}</h2>

                        <div className='d-flex flex-wrap align-items-center'>
                            <div className='question-section col-12 col-md-8 mb-4'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <img className='img-fluid question-image' src={questions[currentQuestion].imageLink}
                                     alt='dog'/>
                            </div>
                            <div className="col-12 col-md-4">
                                <div
                                    className='answer-section d-flex flex-wrap align-content-center justify-content-center'>
                                    {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                        <Option
                                            key={i}
                                            handleAnswerOptionClick={() => checkIsCorrect(answerOption.isCorrect)}
                                            answerOption={answerOption}
                                            answered={answered}/>
                                    ))}

                                    <button className="btn btn-secondary mt-3"
                                            onClick={() => handleAnswerOptionClick()}>Next question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

Game.defaultProps = {
    pageHeader: 'Guess the Breed',
    playerName: 'Player'
}

export default Game;