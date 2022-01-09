import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Intro({pageHeader, inputLabel, placeholder, textBtn}) {
    let navigate = useNavigate();
    const [name, setName] = useState("");

    return (
        <>
            <h2 className='mb-3'>{pageHeader}</h2>

            <div className='row d-flex justify-content-center'>
                <div className="col-md-6">
                    <form action='#'>

                        <div className="mb-3">
                            <label htmlFor='playerName' className='form-label visually-hidden'>{inputLabel}</label>
                            <input type='text' value={name} onInput={e => setName(e.target.value)}
                                   className='form-control' id='playerName' placeholder={placeholder}
                                   required=''/>
                        </div>
                        <button type="button" className="btn btn-primary"
                                onClick={() => {
                                    navigate('/game', {state: {playerName: name}})
                                }}>
                            {textBtn}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

Intro.defaultProps = {
    pageHeader: 'New Game',
    inputLabel: 'Name',
    placeholder: 'Please enter your name',
    textBtn: 'Start'
}

export default Intro;