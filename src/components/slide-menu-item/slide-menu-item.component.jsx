import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import {toggleMenuSideDrawer } from '../../redux/app/app.actions';

import './slide-menu-item.styles.scss';

const SlideMenuItem = ({ history, children, onClick, type, path, onClose }) => {

  const handleOnClick = () => {
    if (type === 'category') {
      onClick();
    } else {
      history.push(`/shop/${path}`);
      onClose();
    }
  }

  return (
    <div className={`slide-menu-item ${type}`} onClick={() => handleOnClick()}>
      { children }
      <div className={`slide-icon-container`}>
        <IoIosArrowForward className='arrow-icon' />
      </div>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  CloseDrawer: (drawerOpen) => dispatch(toggleMenuSideDrawer(drawerOpen))
});

export default withRouter(connect(null, mapDispatchToProps)(SlideMenuItem));


