import {Link, useNavigate} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {constant_string} from "../values";

const Header = () => {
    const navigate = useNavigate()
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <h1 className='visually-hidden'>{constant_string.dog_quiz_label}</h1>
            <Link to="/" className="align-items-center mb-3 mb-md-0 me-auto text-dark text-decoration-none">
                <span className="fs-4">{constant_string.dog_quiz_label}</span>
            </Link>

            <Nav
                activeKey="/"
                onSelect={(selectedKey) => {
                    navigate(selectedKey)
                }}
            >
                <Nav.Item>
                    <Nav.Link eventKey="/">{constant_string.new_game_label}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/score">{constant_string.history_label}</Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    );
};

export default Header;