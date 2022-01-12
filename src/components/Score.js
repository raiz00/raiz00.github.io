import {useState, useEffect} from "react"
import {Button, Modal} from "react-bootstrap";
import ScoreTable from "./ScoreTable";
import {constant_string, storage_key} from "../values";

const Score = () => {
    const [scoreHistory, setScoreHistory] = useState([]);
    const [showScore, setShowScore] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowScore(JSON.parse(sessionStorage.getItem(storage_key.show_score)))
        sessionStorage.clear()
        let history = JSON.parse(localStorage.getItem(storage_key.history))
        if (history != null)
            setScoreHistory(history)
    }, []);

    const clearHistory = () => {
        setScoreHistory([])
        localStorage.removeItem(storage_key.history)
        handleClose()
    }

    if (scoreHistory.length <= 0)
        return <p className="lead">{constant_string.no_history}</p>

    const handleClose = () => {
        setShowAlert(false)
    }

    const formatResult = (score, no_questions) => {
        return `${constant_string.player_score_1} ${score} ${constant_string.player_score_2} ${no_questions}`
    }

    return (
        <div className='score-section'>
            {
                showScore != null && showScore ?
                    <>
                        <h2 className="mb-5">{formatResult(scoreHistory[scoreHistory.length - 1].score, scoreHistory[scoreHistory.length - 1].no_questions)}</h2>
                        <h3>Game history</h3>
                    </>
                    : <h2>Game history</h2>
            }
            <ScoreTable scoreHistory={scoreHistory}/>
            <Button variant="link" onClick={() => setShowAlert(true)}>{constant_string.clear_history_label}</Button>

            <Modal
                show={showAlert}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{constant_string.clear_history_label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{constant_string.clear_history_alert}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {constant_string.cancel}
                    </Button>
                    <Button variant="danger" onClick={clearHistory}>
                        {constant_string.clear}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Score;