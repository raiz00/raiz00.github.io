import {useState, useEffect} from "react"

const History = ({pageHeader = true}) => {
    const [scoreHistory, setScoreHistory] = useState([]);

    useEffect(() => {
        let history = JSON.parse(localStorage.getItem("history"))
        if (history != null)
            setScoreHistory(history.reverse())
    }, []);

    return (
        <>
            {pageHeader ? <h2>Game history</h2> : <></>}
            <ul>
                {scoreHistory.slice(1).map((item, i) => (
                    <li key={i}>{item.playerName} - {item.score}/{item.no_questions} on {new Date(item.date).toLocaleString()}</li>
                ))}
            </ul>
        </>
    )
}

export default History;