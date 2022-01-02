
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

import { connect } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';

import { createStructuredSelector } from 'reselect';

import { withRouter } from '../../App';
import { useNavigate } from 'react-router-dom';


const CartDropdown = ({ cartItems }) => {
    
    
    const navigate = useNavigate();
    
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
            {
                cartItems.length ?
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                    :
                    <span className='empty-message'>Your cart is empty</span>
            }    
            </div>            
            <CustomButton onClick={() => navigate('/checkout')}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}
/* const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
}); */

/* const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
}); */

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropdown));
