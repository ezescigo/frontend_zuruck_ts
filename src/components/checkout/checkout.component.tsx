import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';
import CustomButton from '../custom-button/custom-button.component';
import CheckOutItem from '../checkout-item/checkout-item.component';
import StripeCheckoutButton from '../stripe-button/stripe-button.component';
import { RiShoppingCartFill } from 'react-icons/ri';
import { AiFillHeart } from 'react-icons/ai';

import './checkout.styles.scss';
import { closeCartDropdown, selectCartItems, selectCartItemsCount, selectCartTotal } from '../../redux/cart/cart.slice';
import { selectWishlistItems } from '../../redux/wishlist/wishlist.slice';
import { DropdownMenus } from '../../redux/cart/cart.types';
import { useAppDispatch } from '../../hooks';
import { useCartSelector, useWishlistSelector } from '../../hooks/useAppSelector';

interface CheckOutProps {
  active: DropdownMenus;
  goToCheckOut?: () => void;
  isDropdown?: boolean;
}

const CheckOut = ({ active, isDropdown, goToCheckOut }: CheckOutProps) => {
  const [isActive, setIsActive] = useState<DropdownMenus>(active);
  const history = useHistory();

  const dispatch = useAppDispatch();
  const itemCount = useCartSelector(selectCartItemsCount); 
  const cartItems = useCartSelector(selectCartItems); 
  const total = useCartSelector(selectCartTotal); 
  const wishlist = useWishlistSelector(selectWishlistItems); 

  const closeCheckOut = () => {
    if (isDropdown) {
      dispatch(closeCartDropdown());
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
            ? cartItems.map((cartItem, idx) => (
              <CheckOutItem key={`${cartItem._id}${idx}`} cartItem={cartItem}/>
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
              ? <CustomButton large onClick={() => goToCheckOut && goToCheckOut()}>Go To Checkout</CustomButton>
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
                .map(itemID => {
                  const item = cartItems.find(c => c._id === itemID)
                  return item ? (
                    <CollectionItem key={item._id} item={item} />
                  ) : null}
                )
              : <div>Your wishlist is empty.</div>
            }
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  )
};

export default withRouter(CheckOut);