import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import img from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loginInUser,setLoginInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={img} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Oder Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={()=>setLoginInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;