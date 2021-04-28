import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { animated } from 'react-spring';
import useBoop from '../../hooks/useBoop';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { RiShoppingCartLine, RiShoppingCartFill } from 'react-icons/ri';

import './cart-icon.styles.scss';

const CartIcon = ({ onClick, itemCount, mobile, isXsDevice }) => {
  const [style, trigger] = useBoop({ y: -10 });
  const size = {
    default: '22',
    xsDevice: '22'
  };
  let iconSizeSeed = isXsDevice ? size.xsDevice : size.default;
  const [iconSize, setIconSize] = useState(iconSizeSeed);

  useEffect(() => {
    if (isXsDevice) {
      setIconSize(size.xsDevice)
    } else {
      setIconSize(size.default)
    }
  }, [isXsDevice])

  const handleOnClick = () => {
    if (!mobile) {
      return onClick()
    }
  }

  useEffect(() => {
    trigger();
  }, [itemCount])

  return (
  <animated.div style={style} className='cart-icon' onClick={() => handleOnClick()}>
    { itemCount > 0
      ? <RiShoppingCartFill size={iconSize} className='shopping-icon' />
      : <RiShoppingCartLine size={iconSize} className='shopping-icon' />
    }
    { isXsDevice
      ? null
      : <span className='cart-item-count'>{itemCount}</span>
    }
  </animated.div>
)};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(
  mapStateToProps,
  null
)(CartIcon);

