import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { useBoop } from '../../hooks/useBoop';

import { RiShoppingCartLine, RiShoppingCartFill } from 'react-icons/ri';

import './cart-icon.styles.scss';
import { useCartSelector } from '../../hooks';
import { selectCartItemsCount } from '../../redux/cart/cart.slice';

interface CartIcon {
  onClick: () => void;
  mobile: boolean;
  isXsDevice: boolean;
}

const CartIcon = ({ onClick, mobile, isXsDevice }: CartIcon) => {
  const [style, trigger] = useBoop({ y: -10 });
  const size = {
    default: '22',
    xsDevice: '22'
  };
  const iconSizeSeed = isXsDevice ? size.xsDevice : size.default;
  const itemCount = useCartSelector(selectCartItemsCount);
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

export default CartIcon;

