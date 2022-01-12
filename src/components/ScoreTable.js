import {useEffect, useState} from "react";
import {storage_key} from "../values";
import {Table} from "react-bootstrap";

const ScoreTable = () => {
    const [scoreHistory, setScoreHistory] = useState(null);

    useEffect(() => {
        setScoreHistory(JSON.parse(localStorage.getItem(storage_key.history)).reverse())
    }, []);

    if (scoreHistory != null)
        return (
            <Table striped>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                    <th scope="col">Date</th>
                </tr>
                </thead>
                <tbody>
                {scoreHistory.map((item, i) => (
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item.playerName}</td>
                        <td>{item.score}/{item.no_questions}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    else return <></>
}

export default ScoreTable;