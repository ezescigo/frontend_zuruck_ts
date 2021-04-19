import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useBoop from '../../hooks/useBoop';
import { createStructuredSelector } from 'reselect';
import { animated } from 'react-spring';

import { selectWishlistItemsCount } from '../../redux/wishlist/wishlist.selectors';

import './fav-icon.styles.scss';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const FavIcon = ({ show, onClick, isFav, disabled, itemCount }) => {
  
  const [style, trigger] = useBoop({ scale: 1.2 });
  
  const handleOnClick = () => {
    onClick();
    if (!disabled) {
      trigger();
    }
    
  }
  // useEffect(() => {
  //   trigger();
  // }, [onClick])

  return (
  <animated.div style={style}
    className='fav-icon-container'
    onClick={handleOnClick}
    isFav={isFav}
    style={{ ...style, display: show ? 'flex' : isFav ? 'flex' : 'none' }}>
      {(isFav)
      ? <RiHeartFill size={28} />
      : <RiHeartLine size={28} />
      }
  </animated.div>
)};

const mapStateToProps = createStructuredSelector({
  itemCount: selectWishlistItemsCount
});

export default connect(mapStateToProps, null)(FavIcon);

// ? <FavIconOn className='fav-icon' />
//     : <FavIconOff className='fav-icon' />