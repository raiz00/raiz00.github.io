import Header from "./components/Header";
import Intro from "./components/Intro";
import Game from "./components/Game";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {createBrowserHistory} from "history";
import History from "./components/History";


function App() {

    const customHistory = createBrowserHistory();


    return (
        <div className='container'>
            <Router history={customHistory}>
                <Header/>
                <main className='p-5 text-center bg-light rounded-3 shadow'>

                <Routes>
                    <Route exact path="/" element={<Intro/>}/>
                    <Route exact path="/game" element={<Game/>}/>
                    <Route exact path="/history" element={<History/>}/>
                    <Route path="*" element={<div>something wrong</div>}/>
                </Routes>
                </main>

            </Router>
        </div>
    );
}

export default App;









/*

import {fetchBreedsList} from "./api/DogApi";
import {useEffect, useState} from "react";

const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    fetchBreedsList()
        .then(res => {
            setData(res.data);
            setError(res.msg)
        })
        .finally(() => setIsLoading(false))
}, []);

if (isLoading) return "Loading..."
if (error) return "Error!"
*/