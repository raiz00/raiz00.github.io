import {Link} from "react-router-dom";

const Header = ({titlePage, titleBtn}) => {
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <h1 className='visually-hidden'>{titlePage}</h1>
            <Link to="/" className="align-items-center mb-3 mb-md-0 me-auto text-dark text-decoration-none">
                <span className="fs-4">{titlePage}</span>
            </Link>

            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">
                        {titleBtn}
                    </Link>
                </li>
            </ul>
        </header>
    );
};

Header.defaultProps = {
    titlePage: 'Dog Quiz',
    titleBtn: 'New Game'
}

export default Header;


// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title} Dog Quiz</h1>
//         </header>
//     );
// };
//
// Header.defaultProps = {
//     title: 'Dog Quiz'
// }
// import PropTypes from 'prop-types'
//
// Header.propTypes = {
//     title: PropTypes.string.isRequired,
// }
//
// export default Header;
