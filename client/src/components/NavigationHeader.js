import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container';
import Logout from './Logout';
import Search from './Search';

function NavigationHeader (props) {
    const cartAmount = useSelector(state => Object.keys(state.cart.items).length)
    const loggedIn = useSelector(state => Object.keys(state.auth).length !== 0);
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 800);
    }, [cartAmount])

    let pulseClass =
        pulse && cartAmount > 0
        ? "navbar__cart green pulse"
        : (cartAmount > 0 ? "navbar__cart green" : "navbar__cart");
        

    return (
        <>
        <div className="navbar__purple"></div>
        <div className="navbar">
            <Container className="navbar__container">
                <div className="navbar__left">
                    <div className="navbar__items">
                        <Link to="/">
                                <img src='client/public/favicon.ico' alt='' />
                        </Link>
                    </div>
                    <div className="navbar__items">
                        <Link to="/games">STORE</Link>
                    </div>
                    <div className="navbar__items">
                        <Link to="/about">ABOUT</Link>
                    </div>
                    <div className="navbar__items login-logout">
                        {loggedIn
                            ? <Logout />
                            : <Link to="/login">SIGN IN</Link>}
                    </div>
                    <Search />
                </div>
                <div className="navbar__right">
                    <div className="navbar__items">
                        <Link to="/checkout">
                            <i className="fa fa-shopping-cart" />
                            <div className={pulseClass}> {cartAmount}</div>
                        </Link>
                    </div>
                    <div className="navbar__items">
                        <i className='fa fa-search search-icon' />
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default NavigationHeader;
