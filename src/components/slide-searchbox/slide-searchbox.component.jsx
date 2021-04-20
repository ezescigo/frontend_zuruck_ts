import React, { useCallback, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';

import { createStructuredSelector } from 'reselect';

import {useSpring, useTransition, animated, config} from 'react-spring';

import { Cover, SlideNavBar, SearchBoxContainer, SearchBox } from './slide-searchbox.styles.jsx';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';
import { fetchQueryStartAsync } from '../../redux/collections/collections.actions';
import { selectCategoriesList } from '../../redux/categories/categories.selectors';
import { selectQueryResults, selectIsFetchingQuery } from '../../redux/collections/collections.selectors';

import CheckOutItem from '../checkout-item/checkout-item.component';

const SlideSearchBox = ({ isLoading, headerWidth, queryResults = [] }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [debouncedQueryInput, setDebouncedQueryInput] = useDebounce('');
  const dispatch = useDispatch();
  
  const toggleDrawer = (toggle) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    event.stopPropagation();
    setDrawerOpen(toggle);
  };

  const fadeStyles = useSpring({
    config: { ...config.gentle },
    from: { position: 'absolute', top: 0, right: 0, opacity: 0, transform: "translateX(-200px)" },
    to: {
      display: drawerOpen ? 'inline' : 'none',
      opacity: drawerOpen ? 1 : 0,
      transform: !drawerOpen ? "translateX(100px)" : "translateX(0px)",
      zIndex: !drawerOpen ? 40 : 40
    }
  });

  const searchBoxAnimated = useSpring({
    config: { ...config.gentle },
    // transform: !drawerOpen ? "translateX(0px)" : `translateX(${parseInt(headerWidth)}px)`,
    // from: { position: 'relative' },
    // to: { position: drawerOpen ? 'absolute' : 'relative' },
    zIndex: !drawerOpen ? 40 : 40,
  });

  const handleInputChange = event => {
    setDebouncedQueryInput(event.target.value);
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (debouncedQueryInput !== '') {
      console.log(debouncedQueryInput);
      dispatch(fetchQueryStartAsync(debouncedQueryInput));
    }
  },[debouncedQueryInput]);

  return (
    <React.Fragment>
      <animated.div style={searchBoxAnimated}>
        <SearchBoxContainer onClick={toggleDrawer(true)}>
          <SearchIcon size={36} className='search-icon' />
          <SearchBox onChange={handleInputChange} />
        </SearchBoxContainer>
      </animated.div>
      <Cover active={drawerOpen} onClick={toggleDrawer(!drawerOpen)} />
      <animated.div style={fadeStyles}>
        <SlideNavBar open={drawerOpen}>    
          { queryResults.products && queryResults.products.length
            ? queryResults.products.map(product => 
              <CheckOutItem key={product._id} cartItem={product}/>
              )
            : <div>Product not found.</div>
          }
          
          {queryResults.categories && queryResults.categories.length
            ? queryResults.categories.map(category => <div>{category.name}</div>)
            : <></>
          }
        </SlideNavBar>
      </animated.div>
  </React.Fragment>
  )
};

const mapStateToProps = createStructuredSelector({
  sections: selectCategoriesList,
  queryResults: selectQueryResults,
  isLoading: selectIsFetchingQuery
});

export default connect(mapStateToProps)(SlideSearchBox);

