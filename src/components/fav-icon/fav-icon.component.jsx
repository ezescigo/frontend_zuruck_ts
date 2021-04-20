import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useBoop from '../../hooks/useBoop';
import { createStructuredSelector } from 'reselect';
import { animated } from 'react-spring';

import { selectWishlistItemsCount } from '../../redux/wishlist/wishlist.selectors';
import { selectIsXs } from '../../redux/app/app.selectors';

import './fav-icon.styles.scss';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const FavIcon = ({ show, onClick, isXsDevice, isFav, disabled, itemCount }) => {
  const size = {
    default: '28',
    xsDevice: '22'
  }
  const [iconSize, setIconSize] = useState(size.default)
  const [style, trigger] = useBoop({ scale: 1.2 });
  
  const handleOnClick = () => {
    onClick();
    if (!disabled) {
      trigger();
    }
    
  }

  useEffect(() => {
    if (isXsDevice) {
      setIconSize(size.xsDevice)
    } else {
      setIconSize(size.default)
    }
  }, [isXsDevice])

  return (
  <animated.div
    className='fav-icon-container'
    onClick={handleOnClick}
    isFav={isFav}
    style={{ ...style, display: show ? 'flex' : isFav ? 'flex' : 'none' }}>
      {(isFav)
      ? <RiHeartFill size={iconSize} />
      : <RiHeartLine size={iconSize} />
      }
  </animated.div>
)};

const mapStateToProps = createStructuredSelector({
  itemCount: selectWishlistItemsCount,
  isXsDevice: selectIsXs
});

export default connect(mapStateToProps, null)(FavIcon);

// ? <FavIconOn className='fav-icon' />
//     : <FavIconOff className='fav-icon' />