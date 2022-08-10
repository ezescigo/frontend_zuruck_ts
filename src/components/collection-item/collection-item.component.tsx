import React, { useState } from 'react';

import { toast } from 'react-toastify';

import FavIcon from '../fav-icon/fav-icon.component';
import Undo from '../undo-toast/undo-toast.component';

import { CollectionItemContainer, CollectionFooterContainer, BackgroundImage, NameContainer, PriceContainer, AddButton } from './collection-item.styles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Item } from '../../models/item';
import { selectMobileView } from '../../redux/app';
import { updateWishlist } from '../../redux/wishlist';
import { toggleWishlistItem } from '../../redux/wishlist/wishlist.slice';
import { addItem } from '../../redux/cart/cart.slice';

interface CollectionItem {
  item: Item;
  fav?: boolean;
}

const CollectionItem = ({ item, fav = false }: CollectionItem) => {
  const { name, price, imageUrl } = item;
  const mobileView = useAppSelector(selectMobileView);
  const dispatch = useAppDispatch();

  const [isFav, setFav] = useState<boolean>(fav);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(mobileView);

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
      dispatch(toggleWishlistItem(item._id))
      toast(
        <Undo removed={isFav} item={item} onUndo={() => undo()} />,
        {onClose: () => {
          dispatch(updateWishlist());
          setDisabled(false)}
        }
      );
    }
  };

  const handleOnClickAdd = () => {
    //dispatch(openCartDropdown())
    dispatch(addItem(item));
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
    <AddButton mobile={mobileView} inverted onClick={handleOnClickAdd}>Add to cart</AddButton>
  </CollectionItemContainer>
)};

export default CollectionItem;