import React from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';

import './checkout-item.styles.scss';
import { useAppDispatch } from '../../hooks';
import { addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.slice';
import { Item } from '../../models/item';

interface CheckOutItemProps {
  cartItem: Item;
}

const CheckOutItem = ({ cartItem }: CheckOutItemProps) => {
  const dispatch = useAppDispatch();

  const { name, imageUrl, quantity, price } = cartItem;
  const description = 'Some description.'

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <a href='#'>
          <img src={imageUrl} alt='item' />
        </a>
      </div>
      <div className='product-info'>
        <div className='row'>
          <span className='product-name'>{name}</span>
        </div>
        <div className='row middle'>
          <span className='product-description'>{description}</span>
          <div className='quantity'>
            <button className='arrow' onClick={() => dispatch(removeItem(cartItem))}>
             <HiMinusSm size={24} className='arrow-icon'/>
            </button>
            <div className='value'><p>{quantity}</p></div>
            <button className='arrow' onClick={() => dispatch(addItem(cartItem))}>
              <HiPlusSm size={24} className='arrow-icon' />
            </button>
          </div>
        </div>
        <div className='footer'>
          <button className='checkout-button-icon' onClick={() => dispatch(clearItemFromCart(cartItem))}>
            <RiDeleteBin7Line size={30} className='checkout-footer-icon' />
          </button>
          <button className='checkout-button-icon'>
           <AiOutlineHeart size={30} className='checkout-footer-icon' />
          </button>
          <div className='price'>
            <p className='value'>${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutItem;