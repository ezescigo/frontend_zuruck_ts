import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SlideMenu from '../slide-menu/slide-menu.component';
import { SlideNavBar, NavButton, NavIcon, NavContainer, Cover } from './header-sidebar.styles.jsx';
import {useSpring, useTransition, animated, config} from 'react-spring';

import { selectIsMenuSideDrawerOpen } from '../../redux/app/app.selectors';
import { toggleMenuSideDrawer } from '../../redux/app/app.actions';


const HeaderSideBar = ({ isLoading, toggleMenuSideDrawer, isDrawerOpen}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = (toggle) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    event.stopPropagation();
    setDrawerOpen(toggle);
  };
  const slide = useTransition(drawerOpen, null, {
    from: { opacity: 0  },
    enter: { opacity: 1  },
    leave: { opacity: 0 },
    });
  const fadeStyles = useSpring({
    config: { ...config.gentle },
    from: { zIndex: 10, opacity: 0, transform: "translateX(-200px)" },
    to: {
      display: drawerOpen ? 'inline' : 'none',
      opacity: drawerOpen ? 1 : 0,
      transform: !drawerOpen ? "translateX(-200px)" : "translateX(-65px)",
      zIndex: !drawerOpen ? 40 : 40
    }
  });

  return (
    <React.Fragment>
      <NavContainer>
        <NavButton onClick={toggleDrawer(!drawerOpen)}>
          <NavIcon open={drawerOpen} />
        </NavButton>
      </NavContainer>
      <Cover active={drawerOpen} onClick={() => setDrawerOpen(false)} />
      <animated.div style={fadeStyles}>
        <SlideNavBar open={drawerOpen}>    
          {isLoading
            ? 'Loading...'
            : <SlideMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          }
        </SlideNavBar>
      </animated.div>
  </React.Fragment>
  )
};

// const mapStateToProps = createStructuredSelector({
//   isDrawerOpen: selectIsMenuSideDrawerOpen,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleMenuSideDrawer: (drawerOpen) => dispatch(toggleMenuSideDrawer(drawerOpen))
// });

export default (HeaderSideBar);