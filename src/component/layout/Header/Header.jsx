import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
const Header = () => {
    const userName = localStorage.getItem('user');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handlelogout = () => {
        dispatch(logout())
        navigate('/login')

    }
    return (
        <header className='navbar-main'>
            <Link to={"/"} className='navbar__title navbar__item' >E-commerce</Link>
            <Link to={"/about"} className='navbar__item'>About</Link>
            <Link to={"/contact"} className='navbar__item'>Contact Us</Link>
            <Link to={"/dashboard"} className='navbar__item'>Dashboard</Link>
            <Link to={"/orders"} className='navbar__item'>My Orders</Link>
            {userName ? (
                <Link to={"/login"} onClick={handlelogout} className='navbar__item'>Logout</Link>
            ) : (
                <Link to={"/login"} className='navbar__item'>Login/SignUp</Link>
            )}



        </header>
    )
}
export default Header;