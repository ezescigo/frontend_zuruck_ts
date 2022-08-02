import React from 'react';
import { connect } from 'react-redux';

import { undo } from '../../redux/wishlist/wishlist.actions';
import './undo-toast.styles.scss';

interface UndoProps {
  removed: boolean,
  item: any, // item model
  undoAction?: any,
  closeToast?: any, 
  onUndo: () => void
}

const Undo = ({ removed, item, undoAction, closeToast, onUndo }: UndoProps) => {
  const handleClick = () => {
    onUndo();
    undoAction(item);
    closeToast();
  };

  return (
    <div className='undo-container'>
      {(removed)
      ? <h3>Item was removed from your Wishlist.</h3>
      : <h3>Item was added to your Wishlist.</h3>}
      <div onClick={ handleClick }>
        <span className='undo-button'>UNDO.</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  undoAction: item => dispatch(undo(item)),
});

export default connect(null, mapDispatchToProps)(Undo);