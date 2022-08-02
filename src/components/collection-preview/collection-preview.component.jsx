import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWishlistItems } from '../../redux/wishlist/wishlist.selectors';

import CollectionItem from '../collection-item/collection-item.component';

import { Slider } from '@lifarl/react-scroll-snap-slider';

import './collection-preview.styles.scss';

const slidesPerPageSettings = {
  mobileSmall: 1.5,
  mobileBig: 2.5,
  tablet: 4,
  desktop: 4,
}

const CollectionPreview = ({ title, categories, wishlist }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      <Slider
      slidesPerPageSettings={slidesPerPageSettings}>
        {categories
          .map(({ items }) => items.map(item => {
            return wishlist.find(wishlistItem => wishlistItem._id === item._id)
            ? <CollectionItem key={item._id} item={item} fav />
            : <CollectionItem key={item._id} item={item} />
            }
          ) 
          )
        }
      </Slider>
    </div>
    
  </div>
);

const mapStateToProps = createStructuredSelector({
  wishlist: selectWishlistItems,
})

export default connect(mapStateToProps, null)(CollectionPreview);