import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCategoriesList } from '../../redux/categories/categories.selectors';
import { selectIsCollectionFetching } from '../../redux/collections/collections.selectors';
import { selectWishlistItemsCount } from '../../redux/wishlist/wishlist.selectors';
import { auth } from '../../firebase/firebase.utils';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { useOnClickOutside, debounce } from '../../hooks';
import useMeasure from 'react-use-measure';
import { usePrevious } from '../../hooks';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import SlideSearchBox from '../slide-searchbox/slide-searchbox.component';
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
  const [refContainer, boundsContainer] = useMeasure();
  const [refSearchBox, boundsSearchBox] = useMeasure();
  const [submenuItems, setSubmenuItems] = useState([]);

  const inputRef = useRef();

  const transitionsDropdown = useTransition(!hidden, null, {
    from: { transform: "translateY(-100px)", opacity: 0 },
    enter: { transform: "translateY(-30px)", opacity: 1, zIndex: 40 },
    leave: { transform: "translateY(-100px)", opacity: 0 }
  })

  const transitionSubNavbar = useTransition(!subMenuHidden, null, {
    from : { height: 0, zIndex: 0, opacity: 0 },
    enter: { height: 200, zIndex: 10, opacity: 1 },
    leave: { height: 0, zIndex: 0, opacity: 0 },
    config: !subMenuHidden ? { ...config.slow } : { ...config.stiff }
  });

  const transitionSubnavbarItem = useTransition(submenuItems, submenuItem => submenuItem._id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, transform: 'translateY(-300px)', display: 'none' },
    config: submenuItems ? { ...config.stiff } : { ...config.stiff, duration: 100 }
  });

  // START HIDE-FUNCTIONALITY HANDLER WHILE SCROLLING //
  const [state, setState] = useState({
    prevScrollPos: 0,
    visible: true
  });

  const { prevScrollPos, visible } = state;
  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    const visible = (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || window.scrollY < 100;
  
    setState({
      prevScrollPos: currentScrollPos,
      visible: visible
    });
  }, 50);

  useEffect(() => {
    // scroll listener setup when mounted.
      window.addEventListener('scroll', handleScroll);
    // cleaning up listener
    return () => window.removeEventListener('scroll', handleScroll);
  },[prevScrollPos, visible]);

  const headerContainerStyles = {
    transition: 'top 0.6s ease' 
  }

  // END HIDE-FUNCTIONALITY HANDLER WHILE SCROLLING //

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
      style={{ ...headerContainerStyles, top: visible ? '0' : '-200px' }}
      styled={location.pathname === '/' ? null : 'styled'}
      onMouseLeave={() => setIsActive({ category: '' })}>
      <OptionsContainerTop ref={refContainer}>
        <LogoContainer ref={refSearchBox} to='/'>
          <LogoText >ZURÜCK</LogoText>
        </LogoContainer>
        <SlideSearchBox headerWidthRight={boundsContainer.right} headerWidthLeft={boundsSearchBox.right} />
        <OptionsPanel>
          { currentUser ? 
            (
              <OptionLink as='div' onClick={() => auth.signOut()} styled={location.pathname === '/' ? null : 'styled'}>
                { !isMobile
                ? <span className='sign-salute'>Welcome, {currentUser.displayName}!</span>
                : null
                }
                <IoPerson size={22} className='navbar-icon' />
              </OptionLink>
            ) : (
              <OptionLink to='/signin' styled={location.pathname === '/' ? null : 'styled'}>
                <IoPersonOutline size={22} className='navbar-icon' />
              </OptionLink>
            )}
          <OptionLink to={{ 
            pathname: '/checkout', 
            state: { from: location.pathname,
                     active: 'wishlist' 
                    }
          }} 
            styled={location.pathname === '/' ? null : 'styled'}
          >
            { wishlistItemCount > 0
              ? (<div>
                  <AiFillHeart size={22} className='navbar-icon' onClick={() => toggleCartHidden('wishlist')} />
                </div>)
              : <AiOutlineHeart size={22} className='navbar-icon' onClick={() => toggleCartHidden('wishlist')} />
            }
              
          </OptionLink>
          <OptionLink to='#' styled={location.pathname === '/' ? null : 'styled'}>
            <CartIcon mobile={isMobile} isXsDevice={isxsdevice} onClick={() => toggleCartHidden('cart')} />
          </OptionLink>
        </OptionsPanel>
      </OptionsContainerTop>
      {transitionsDropdown.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props}><CartDropdown hidden={hidden} /></animated.div>
      )}
      
      <OptionsContainer 
        onMouseEnter={() => isActive.category && setIsActive({ category: isActive || prevActive })}
        onMouseLeave={() => setIsActive({ category: '' })}
      >
        <NavbarContainer>
          { categories.map(category =>
            <NavbarItem 
              key={category._id}
              onMouseEnter={() => {setIsActive({ category: category.slug })}}
              onMouseLeave={() => {setIsActive({ category: '' })}}
              onClick={() => history.push(`/shop/${category.slug}`)}
              styled={location.pathname === '/' ? null : 'styled'}
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
              onMouseLeave={() => setHideSubMenu(false)}
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
