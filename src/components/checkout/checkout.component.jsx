import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CollectionItem from '../collection-item/collection-item.component';
import CustomButton from '../custom-button/custom-button.component';
import CheckOutItem from '../checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import { RiShoppingCartFill } from 'react-icons/ri';
import { AiFillHeart } from 'react-icons/ai';

import { closeCartDropdown } from '../../redux/cart/cart.actions';
import { selectWishlistItems } from '../../redux/wishlist/wishlist.selectors';
import { selectCartItemsCount, selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckOut = ({ history, active, isDropdown, itemCount, cartItems, wishlist, total, goToCheckOut, closeCartDropdown }) => {
  const [isActive, setIsActive] = useState(active);

  const closeCheckOut = () => {
    if (isDropdown) {
      closeCartDropdown();
    } else {
      history.goBack();
    }
  }
  
  return(
    <React.Fragment>
      <div className='checkout-header'>
        <div className={`checkout-header-title ${isActive === 'cart' ? 'active' : ''}`} onClick={() => setIsActive('cart')}>
          <div className='cart-icon'>
            <RiShoppingCartFill size={30} className='shopping-icon' />
          </div>
          <span>CART ({itemCount})</span>
        </div>
        <div className={`checkout-header-title ${isActive === 'wishlist' ? 'active' : ''}`} onClick={() => setIsActive('wishlist')}>
          <div className='cart-icon'>
            <AiFillHeart size={30} className='shopping-icon' />
          </div>
          <span>wishlist</span>
        </div>
        <div className='exit-button'>
          <span onClick={() => closeCheckOut()}>&#x2716;</span>
        </div>
      </div>
      { isActive === 'cart'
      ? <React.Fragment>
          <div className='checkout-main'>
            {cartItems.length
            ? cartItems.map(cartItem => (
              <CheckOutItem key={cartItem._id} cartItem={cartItem}/>
            ))
            : (
              <span className='empty-cart'>
                <p>Your shopping bag is empty.</p>
                <p>Check if there are any products on your wishlist and snatch them up before they're gone!</p>
                <p>You can also check out the latest arrivals ;</p>
              </span>
            )}
          </div>
          <div className='checkout-footer'>
            <div className='total'>
              <span className='total-text'>TOTAL</span>
              <span className='total-price'>${total}</span>
            </div>
            <div className='checkout-button-container'>
              {isDropdown
              ? <CustomButton large onClick={() => goToCheckOut()}>Go To Checkout</CustomButton>
              : <StripeCheckoutButton price={total} />}
            </div>
            <div className='test-warning'>
              *test credit card for payments*
              <br />
              4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
              <br />
            </div>
          </div>
        </React.Fragment>
      : <React.Fragment>
          <div className={`checkout-main ${isActive === 'wishlist' ? 'wishlist' : null}`}>
            {wishlist.length
              ? wishlist
              .map(item => (
                <CollectionItem key={item.id} item={item} />
              ))
              : <div>Your wishlist is empty.</div>
            }
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  )};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
  total: selectCartTotal,
  wishlist: selectWishlistItems,
});

const mapDispatchToProps = dispatch => ({
  closeCartDropdown: () => dispatch(closeCartDropdown())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckOut));