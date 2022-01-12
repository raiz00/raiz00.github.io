import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {constant_string, storage_key} from "../values";
import {getFromLocalStorageOrDefault} from "../utils";

const Home = () => {
    const [playerName, setPlayerName] = useState("Player");
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear()
        getFromLocalStorageOrDefault(storage_key.player_name, playerName, setPlayerName)
    }, [])

    useEffect(() => {
        localStorage.setItem(storage_key.player_name, JSON.stringify(playerName))
    }, [playerName]);

    function onNewGame() {
        sessionStorage.setItem(storage_key.is_game_started, JSON.stringify(true))
        navigate("/game")
    }

    return (
        <>
            <h2 className="mb-4">{constant_string.welcome}</h2>

            <Form.Label htmlFor="playerName" className="visually-hidden">{constant_string.name_input_label}</Form.Label>
            <Form.Control type="text" placeholder={constant_string.name_input_placeholder + playerName}
                          onChange={e => setPlayerName(e.target.value)}/>

            <Button variant="primary" className="my-4"
                    onClick={() => onNewGame()}>{constant_string.new_game_label}</Button>
        </>
    )
}
export default Home;