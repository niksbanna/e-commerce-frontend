import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { logout } from "../../../actions/userAction";
import CartIcon from "./cartIcon.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../../actions/cartAction";

const Header = () => {
    const userName = localStorage.getItem('user');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart);
    const [cartCount, setCartCount] = useState(0);
    const handlelogout = () => {
        dispatch(emptyCart())
        dispatch(logout())
        navigate('/login')

    }

    useEffect(() => {
        cartItems && setCartCount(cartItems?.reduce((acc, item) => acc + item.quantity, 0));
        if (!cartItems) {
            setCartCount(0);
        }
    });
    return (
        <div className="top">
            <header className='navbar-main'>
                <Link to={"/"} className='navbar__title navbar__item' >E-commerce</Link>
                <Link to={"/about"} className='navbar__item'>About</Link>
                <Link to={"/contact"} className='navbar__item'>Contact Us</Link>
                <Link to={"/dashboard"} className='navbar__item'>Dashboard</Link>
                <Link to={"/orders"} className='navbar__item'>My Orders</Link>

                {userName ? (<>
                    <img className="cart-icon" src={CartIcon} onClick={() => navigate("/order/confirm")} alt="cart icon" />
                    <span className="cart-count">{cartCount}</span>
                    <Link to={'/login'} onClick={handlelogout} className='navbar__item'>Logout</Link>
                </>
                ) : (
                    <Link to={"/login"} className='navbar__item'>Login/SignUp</Link>
                )}



            </header>
        </div>
    )
}
export default Header;