import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCategoriesList } from '../../redux/categories/categories.selectors';
import { selectIsCollectionFetching } from '../../redux/collections/collections.selectors';
import { selectWishlistItemsCount } from '../../redux/wishlist/wishlist.selectors';
import { auth } from '../../firebase/firebase.utils';

import useMeasure from 'react-use-measure';
import { usePrevious } from '../../hooks';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import SideSearchBox from '../slide-searchbox/slide-searchbox.component';
import { HeaderContainer, OptionsContainer, OptionsContainerTop, OptionsPanel, OptionLink, LogoContainer, LogoText, NavbarMenuContainer, NavbarMenuItem, NavbarContainer, NavbarItem } from './header-desktop.styles.jsx';
import { useSpring, useTransition, animated, config } from 'react-spring';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import transitions from '@material-ui/core/styles/transitions';


const HeaderDesktop = ({  isxsdevice, isMobile, hidden, isLoading, categories, currentUser, history, location, toggleCartHidden, wishlistItemCount }) => {

  const [isActive, setIsActive] = useState({
    category: ''
  });
  const prevActive = usePrevious(isActive);
  const [subMenuHidden, setHideSubMenu] = useState(true);
  const [ref, bounds] = useMeasure();
  const [submenuItems, setSubmenuItems] = useState([]);

  const { url } = useRouteMatch();

  const slide = useTransition(!hidden, null, {
    from: { opacity: 0, transform: "translateY(0px)", transform: "scale(0)" },
    enter: { opacity: 1, transform: "translateY(0px)", transform: "scale(1)" },
    leave: { opacity: 0, transform: "translateY(-100px)" },
    });

  const fadeStylesDropdown = useSpring({
    config: { ...config.slow },
    // reset: true,
    // reverse: true,
    from: { display: 'none', zIndex: -50, opacity: 0, transform: "translateY(-100px)" },
    to: {
      display: hidden ? 'none' : 'flex',
      opacity: !hidden ? 1 : 0,
      transform: hidden ? "translateY(-100px)" : "translateY(-50px)",
      zIndex: hidden ? -50 : 30,
    }
  });

  const transitionsDropdown = useTransition(!hidden, null, {
    from: { transform: "translateY(-100px)", opacity: 0 },
    enter: { transform: "translateY(-30px)", opacity: 1, zIndex: 40 },
    leave: { transform: "translateY(-100px)", opacity: 0 }
  })

  const transitionSubNavbar = useTransition(!subMenuHidden, null, {
    from : { height: 0, zIndex: 0, opacity: 0 },
    enter: { height: 200, zIndex: 10, opacity: 1 },
    leave: { height: 0, zIndex: 0, opacity: 0 },
    config: !subMenuHidden ? { ...config.slow } : { duration: 400 }
  });

  const transitionSubnavbarItem = useTransition(submenuItems, submenuItem => submenuItem._id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, transform: 'translateY(-300px)', display: 'none' },
    config: submenuItems ? { ...config.stiff } : { duration: 100 }
  });

  const handleShowSubcategories = () => {
    setHideSubMenu(false);
    categories.map(category => 
      category.slug === isActive.category &&
      setSubmenuItems(category.children)
    )
  }

  useEffect(() => {
    if (isActive.category === '') {
      setHideSubMenu(true);
      setSubmenuItems([]);
    } else {
      handleShowSubcategories()
    }
  }, [isActive]);

  return(
    <HeaderContainer 
      styled={location.pathname === '/' ? false : true}
      onMouseLeave={() => setIsActive({ category: '' })}>
      <OptionsContainerTop>
        <LogoContainer to='/' styled={location.pathname === '/' ? false : true}>
          <LogoText >ZURÜCK</LogoText>
        </LogoContainer>
        <SideSearchBox ref={ref} headerWidth={bounds.left} />
        <OptionsPanel>
          { currentUser ? 
            (
              <OptionLink as='div' onClick={() => auth.signOut()} styled={location.pathname === '/' ? false : true}>
                { !isMobile
                ? <span className='sign-salute'>Welcome, {currentUser.displayName}!</span>
                : null
                }
                <IoPerson size={30} className='navbar-icon' />
              </OptionLink>
            ) : (
              <OptionLink to='/signin' styled={location.pathname === '/' ? false : true}>
                <IoPersonOutline size={30} className='navbar-icon' />
              </OptionLink>
            )}
          <OptionLink to={{ 
            pathname: '/checkout', 
            state: { from: location.pathname,
                     active: 'wishlist' 
                    }
          }} 
            styled={location.pathname === '/' ? false : true}
          >
            { wishlistItemCount > 0
              ? (<div>
                  <AiFillHeart size={30} className='navbar-icon' onClick={() => toggleCartHidden('wishlist')} />
                </div>)
              : <AiOutlineHeart size={30} className='navbar-icon' onClick={() => toggleCartHidden('wishlist')} />
            }
              
          </OptionLink>
          <OptionLink to='#' styled={location.pathname === '/' ? false : true}>
            <CartIcon mobile={isMobile} isxsdevice={isxsdevice} onClick={() => toggleCartHidden('cart')} />
          </OptionLink>
        </OptionsPanel>
      </OptionsContainerTop>
      {transitionsDropdown.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props}><CartDropdown hidden={hidden} /></animated.div>
      )}
      
      <OptionsContainer 
        onMouseEnter={() => setIsActive({ category: isActive || prevActive })}
        onMouseLeave={() => setIsActive({ category: '' })}
      >
        <NavbarContainer>
          { categories.map(category =>
            <NavbarItem 
              key={category._id}
              onMouseEnter={() => {setIsActive({ category: category.slug })}}
              onMouseLeave={() => {setIsActive({ category: '' })}}
              onClick={() => history.push(`/shop/${category.slug}`)}
              styled={location.pathname === '/' ? false : true}
            >
              {category.name}
            </NavbarItem>
          )}
        </NavbarContainer>
      </OptionsContainer>
      { transitionSubNavbar.map(
        ({ item, key, props }) => (
          item && 
          <animated.div key={key} style={props}>
            <OptionsContainer 
              onMouseEnter={() => setIsActive({ category: isActive.category })}
              onMouseLeave={() => setIsActive({ category: '' })}
            >
              <NavbarMenuContainer>
                
                      { transitionSubnavbarItem.map(
                        ({ item, key, props }) => (
                          item &&
                            <animated.div key={key} style={props}>
                              <NavbarMenuItem
                              key={item._id}
                              type='item'
                              onClick={() => history.push(`/shop/${isActive.category}/${item.slug}`)}>
                                { item.name }
                              </NavbarMenuItem>
                            </animated.div>
                          )
                        )
                      }
              </NavbarMenuContainer>
            </OptionsContainer>
          </animated.div>
        )
      )}
      
    </HeaderContainer>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  isLoading: selectIsCollectionFetching,
  categories: selectCategoriesList,
  wishlistItemCount: selectWishlistItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: (menuActive) => dispatch(toggleCartHidden(menuActive))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderDesktop));
