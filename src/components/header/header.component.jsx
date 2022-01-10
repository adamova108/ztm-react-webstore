import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils';
import { signOut } from "firebase/auth";

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to="/shop">SHOP</Link>
                <Link className='option' to="/contact">CONTACT</Link>
                {
                    currentUser ?
                    <span className='option' onClick={() => signOut(auth) }>SIGN OUT</span>
                    :
                    <Link className='option' to="/sign-in">SIGN IN</Link>
                }
                {
                    currentUser ? <p>Welcome (header), {currentUser.displayName}!</p> : ''
                }
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
        </div>
    )
}

/* const mapStateToProps = state => ({
    currentUser: state.user.currentUser
}) */

/* const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({ // nested desctructuring
    currentUser,
    hidden
}) */

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);