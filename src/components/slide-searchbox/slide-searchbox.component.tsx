import React, { useRef, useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { useSpring, animated, config } from 'react-spring';

import { Cover, SlideNavBar, SearchBoxContainer, SearchBox } from './slide-searchbox.styles.jsx';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';
import { GrFormClose as CloseSlide } from 'react-icons/gr';

import CheckOutItem from '../checkout-item/checkout-item.component';
import './slide-searchbox.styles';
import { useAppDispatch, useCategoriesSelector, useCollectionsSelector } from '../../hooks';
import { fetchQuery, selectIsFetchingQuery, selectQueryResults } from '../../redux/collections/collections.slice';
import { selectCategoriesList } from '../../redux/categories/categories.slice';

const SlideSearchBox = ({ headerWidthLeft, headerWidthRight }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [debouncedQueryInput, setDebouncedQueryInput] = useDebouncedState<string>('');
  const dispatch = useAppDispatch();
  const widthTarget = String(parseInt(headerWidthRight) - parseInt(headerWidthLeft) - 550);
  const inputRef = useRef(null);

  const isLoading = useCollectionsSelector(selectIsFetchingQuery);
  const queryResults = useCollectionsSelector(selectQueryResults);
  const sections = useCategoriesSelector(selectCategoriesList);

  const toggleDrawer = (toggle) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    event.stopPropagation();
    setDrawerOpen(toggle);
  };

  const fadeStyles = useSpring({
    config: { ...config.gentle },
    from: { position: 'absolute', top: -20, right: -20, opacity: 0, transform: "translateX(-150px)" },
    to: {
      display: drawerOpen ? 'inline' : 'none',
      opacity: drawerOpen ? 1 : 0,
      transform: !drawerOpen ? "translateX(130px)" : "translateX(0px)",
      zIndex: !drawerOpen ? 40 : 40
    }
  });
  
  const searchBoxAnimated = useSpring({
    config: { ...config.stiff },
    transform: drawerOpen ? `translateX(${widthTarget}px)` : "translateX(0px)",
    immediate: true,
  });

  const inputAnimated = useSpring({
    config: { ...config.stiff },
    opacity: showSearchInput ? 1 : 0,
    width: showSearchInput ? '400px' : '0px',
    zIndex: !showSearchInput ? 40 : 40,
  });

  const textAnimations = useSpring({
    config: config.slow,
    opacity: showSearchInput ? 1 : 0,
    transform: showSearchInput ? 'translateX(0px)' : 'translateX(100px)',
    reset: true,
  });

  const resultsAnimations = useSpring({
    config: config.slow,
    opacity: showSearchInput ? 1 : 0,
    transform: showSearchInput ? 'translateX(0px)' : 'translateX(100px)',
    reset: true,
  });

  const handleInputChange = event => {
    setDebouncedQueryInput(event.target.value);
    setDrawerOpen(true);
  };

  const handleSearchClick = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
    // when search sidebar is open, set scroll on body off.
    if (drawerOpen) {
      setTimeout(() => setShowSearchInput(true), 500);
      disableBodyScroll(inputRef);
    }
    else {
      setShowSearchInput(false);
      enableBodyScroll(inputRef);
      setDebouncedQueryInput('');
    }
    // will unmount:
    return () => clearAllBodyScrollLocks();
  }, [drawerOpen])

  useEffect(() => {
    if (debouncedQueryInput !== '') {
      console.log(debouncedQueryInput);
      dispatch(fetchQuery({ category: debouncedQueryInput }));
    };

  },[debouncedQueryInput]);

  return (
    <React.Fragment>
      <SearchBoxContainer as={animated.div} active={drawerOpen} style={searchBoxAnimated} onClick={handleSearchClick}>
        <SearchIcon size={22} className={`search-icon ${drawerOpen ? 'active' : ''}`}   />
        <SearchBox as={animated.input} style={inputAnimated} onChange={handleInputChange} />
        <CloseSlide size={22} className={`close-icon ${drawerOpen ? 'active' : ''}`} onClick={toggleDrawer(!drawerOpen)} />
      </SearchBoxContainer>
      <Cover active={drawerOpen} onClick={toggleDrawer(!drawerOpen)} />
      <SlideNavBar as={animated.div} style={fadeStyles} ref={inputRef} open={drawerOpen}>    
        { queryResults && (queryResults.length > 0) &&
          <animated.div style={resultsAnimations} className='links-container'>
            <h2 className='title-searchbar'>Products</h2>
            {queryResults.map(item => 
              <CheckOutItem key={item._id} cartItem={item}/>
              )}
          </animated.div>  
        }
        <animated.div style={textAnimations} className='links-container'>
          <h2 className='title-searchbar'>Popular Searches</h2>
            <div className='link-searchbar'><p>Heineken beer</p></div>
            <div className='link-searchbar'><p>Scotch</p></div>
            <div className='link-searchbar'><p>Beefeater gin</p></div>
        </animated.div>
        
        <animated.div style={textAnimations} className='links-container'>
          <h2 className='title-searchbar'>Recent Searches</h2>
          <div className='link-searchbar'><p>patagonia pack</p></div>
          <div className='link-searchbar'><p>whiskies</p></div>
        </animated.div>
        {queryResults && queryResults.length > 0
          ? queryResults.map(i => i.categoryIds.map(category => <div>{category}</div>))
          : <></>
        }
      </SlideNavBar>
  </React.Fragment>
  )
};

export default SlideSearchBox;

function useDebouncedState<T>(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}

