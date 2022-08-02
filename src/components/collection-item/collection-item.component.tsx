import React, { useState, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMobileView } from '../../redux/app/app.selectors';

import { toast } from 'react-toastify';

import { addItem, openCartDropdown } from '../../redux/cart/cart.actions';
import { toggleWishlistItem, updateWishlist } from '../../redux/wishlist/wishlist.actions';

import FavIcon from '../fav-icon/fav-icon.component';
import Undo from '../undo-toast/undo-toast.component';

import { CollectionItemContainer, CollectionFooterContainer, BackgroundImage, NameContainer, PriceContainer, AddButton } from './collection-item.styles';
import { Action, Dispatch } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

interface CollectionItem extends PropsFromState, PropsFromDispatch {
  item: any;
  fav?: any;
}

const CollectionItem = ({ mobileView, item, fav, addItem, toggleWishlistItem, updateWishlist, openCartDropdown }: CollectionItem) => {
  const { name, price, imageUrl } = item;
  const [isFav, setFav] = useState<boolean>(fav);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(mobileView);
  const firstUpdate = useRef(true);
  
  // useLayoutEffect(() => {
  //   if (firstUpdate.current) {
  //     setFav(fav);
  //     setDisabled(false);
  //     firstUpdate.current = false;
  //   }
  // }, []);

  const undo = () => {
    setFav(currentIsFav => !currentIsFav);
  };

  const handleOnHover = hover => {
    if (!mobileView) {
      setIsHovered(hover);
    }
  }

  const handleOnClickFav = () => {
    if (isDisabled) {
      return ;
    } else {
      setDisabled(true);
      setFav(currentIsFav => !currentIsFav);
      toggleWishlistItem(item);
      toast(
        <Undo removed={isFav} item={item} onUndo={() => undo()} />,
        {onClose: () => {
          updateWishlist();
          setDisabled(false)}
        }
      );
    }
  };

  const handleOnClickAdd = (item) => {
    //openCartDropdown();
    addItem(item);
  }

  return (
  <CollectionItemContainer
    isFav={isFav}
    onMouseEnter={() => handleOnHover(true)}
    onMouseLeave={() => handleOnHover(false)}>
    <BackgroundImage imageUrl={imageUrl} className='image' />
    <CollectionFooterContainer>
      <NameContainer>{name}</NameContainer>
      <PriceContainer>${price}</PriceContainer>
    </CollectionFooterContainer>
    <FavIcon show={isHovered} isFav={isFav} onClick={handleOnClickFav} disabled={isDisabled}/>
    <AddButton mobile={mobileView} inverted onClick={() => handleOnClickAdd(item)}>Add to cart</AddButton>
  </CollectionItemContainer>
)};

interface PropsFromDispatch {
  addItem: (item: any) => void;
  toggleWishlistItem: (item: any) => void;
  updateWishlist: () => void;
  openCartDropdown: () => void;
}

interface PropsFromState {
  mobileView: any;
}

const mapStateToProps = createStructuredSelector({
  mobileView: selectMobileView
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>> | ThunkDispatch<ThunkAction<any, any, any, any>>): PropsFromDispatch => ({
  addItem: item => dispatch(addItem(item)),
  toggleWishlistItem: item => dispatch(toggleWishlistItem(item)),
  updateWishlist: () => dispatch(updateWishlist()),
  openCartDropdown: () => dispatch(openCartDropdown())
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);