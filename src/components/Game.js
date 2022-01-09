import Option from "./Option";
import {useEffect, useState} from "react";
import {getQuestions} from "../api/DogApi";
import {useLocation} from "react-router-dom";
import History from "./History";

const Game = ({pageHeader}) => {
    const {state} = useLocation()
    let playerName = state.playerName ? state.playerName : "Player"

    const [questions, setQuestions] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(false)

    useEffect(() => {
        getQuestions()
            .then(res => {
                setQuestions(res.data);
                setError(res.msg)
            })
            .finally(() => setIsLoading(false))
    }, []);


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
        console.log(item)

        let history = JSON.parse(localStorage.getItem("history"))

        if (history == null)
            history = [item]
        else
            history.push(item)

        localStorage.setItem("history", JSON.stringify(history))
    }

    if (isLoading) return "loading..."
    if (error) return error

    return (
        <>
            {showScore ? (
                <div className='score-section'>
                    <h2 className="mb-5">You scored {score} out of {questions.length}</h2>
                    <h3>Game history</h3>
                    <History pageHeader={false}/>
                </div>
            ) : (
                <>
                    <h2 className='mb-3'>{pageHeader}, {playerName}</h2>

                    <div className='d-flex flex-wrap align-items-center'>
                        <div className='question-section col-12 col-md-8 '>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <img className='img-fluid' src={questions[currentQuestion].imageLink} alt='dog'/>
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
            )}
        </>
    );
};

Game.defaultProps = {
    pageHeader: 'Guess the Breed'
}

export default Game;