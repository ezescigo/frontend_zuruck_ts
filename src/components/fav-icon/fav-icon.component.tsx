import React, { useState, useEffect } from 'react';
import { useBoop } from '../../hooks/useBoop';
import { animated } from 'react-spring';

import './fav-icon.styles.scss';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { useAppSelector } from '../../hooks';
import { selectIsXs } from '../../redux/app';

interface FavIconProps {
  show: Boolean;
  onClick: () => void;
  isFav: Boolean;
  disabled?: Boolean;
  isXsDevice?: Boolean;
}

const FavIcon = ({ show, onClick, isFav, disabled = false }: FavIconProps) => {
  const size = {
    default: '28',
    xsDevice: '22'
  }
  const [iconSize, setIconSize] = useState(size.default)
  const [style, trigger] = useBoop({ scale: 1.2 });
  const isXsDevice = useAppSelector(selectIsXs);
  
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
    style={{ ...style, display: show ? 'flex' : isFav ? 'flex' : 'none' }}>
      {(isFav)
      ? <RiHeartFill size={iconSize} />
      : <RiHeartLine size={iconSize} />
      }
  </animated.div>
)};

export default FavIcon;