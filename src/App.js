import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Home from "./components/Home";
import Game from "./components/Game";
import Score from "./components/Score";
import {constant_string} from "./values";


function App() {
    const customHistory = createBrowserHistory();

    return (
        <Container>
            <Router history={customHistory}>
                <Header/>

                <main className='p-5 text-center bg-light rounded-3 shadow'>

                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/game" element={<Game/>}/>
                        <Route exact path="/score" element={<Score/>}/>
                        <Route path="*" element={<h2>{constant_string.not_found}</h2>}/>
                    </Routes>
                </main>
            </Router>
        </Container>
    );
}

export default App;