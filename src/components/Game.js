import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getQuestions} from "../api/DogApi";
import Option from "./Option";
import {getFromLocalStorageOrDefault, getFromSessionStorageOrDefault} from "../utils";
import {constant_string, storage_key} from "../values";

const Game = () => {
    let navigate = useNavigate()

    const [questions, setQuestions] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [playerName, setPlayerName] = useState("Player");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem(storage_key.is_game_started))) {
            getFromLocalStorageOrDefault(storage_key.player_name, playerName, setPlayerName)

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

                getFromSessionStorageOrDefault(storage_key.current_question, currentQuestion, setCurrentQuestion)
                getFromSessionStorageOrDefault(storage_key.score, score, setScore)
                getFromSessionStorageOrDefault(storage_key.answered_option, answered, setAnswered)
                getFromSessionStorageOrDefault(storage_key.is_submitted, isSubmitting, setIsSubmitting)
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
        sessionStorage.setItem(storage_key.is_submitted, JSON.stringify(isSubmitting))
    }, [isSubmitting])

    useEffect(() => {
        sessionStorage.setItem(storage_key.answered_option, JSON.stringify(answered))
    }, [answered])

    useEffect(() => {
        if (!showScore) return
        sessionStorage.clear()
        sessionStorage.setItem(storage_key.show_score, JSON.stringify(showScore))
    }, [showScore])

    const checkIsCorrect = (answerOption) => {
        setAnswered(answerOption)
        setIsSubmitting(true)

        if (answerOption.isCorrect) {
            setScore(score + 1);
        }
    }

    const handleAnswerOptionClick = () => {
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
                setIsSubmitting(false)
                setAnswered(null)
                setCurrentQuestion(nextQuestion)
            } else {
                saveScore()
                setShowScore(true);
            }
        }, 750)
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
                navigate("/score")
                : (
                    <>
                        <h2 className='mb-3'>{constant_string.game_page_header} {playerName}</h2>

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
                                    {questions[currentQuestion].answerOptions.map((answerOption, i) => {
                                        let isSelected = JSON.stringify(answerOption) === JSON.stringify(answered)

                                        return (
                                            <Option
                                                key={i}
                                                handleAnswerOptionClick={() => checkIsCorrect(answerOption)}
                                                answerOption={answerOption}
                                                isSelected={isSelected}
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    })}

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

export default Game;