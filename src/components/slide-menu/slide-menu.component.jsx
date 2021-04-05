import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategoriesList } from '../../redux/categories/categories.selectors';
import { CSSTransition } from 'react-transition-group';
import SlideMenuItem from '../slide-menu-item/slide-menu-item.component';

import { IoIosArrowBack } from 'react-icons/io';

import './slide-menu.styles.scss';

const SlideMenu = ({ open, sections, onClose }) => {
  const [activeMenu, setActiveMenu] = useState('main');

  const handleOnClick = (goToMenu) => {
    goToMenu && setActiveMenu(goToMenu)
  };  

  const handleOnClose = () => {
    onClose();
  };

  return (
    <React.Fragment>    
    {open && 
      <div className='slide-menu'>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={200}
        classNames="menu-primary"
        unmountOnExit>
        <div className='menu'>
        
          {sections.map(({_id, name}) =>
            <SlideMenuItem key={_id} onClick={() => handleOnClick(name)} type='category'>
              {name}
            </SlideMenuItem> 
          )}
        </div>
      </CSSTransition>

      { sections.map(({ _id, name, slug, children }) => (
        <CSSTransition
          key={_id}
          in={activeMenu === `${name}`}
          timeout={200}
          classNames="menu-secondary"
          unmountOnExit>
          <div className='menu'>
            <div className='slide-menu-category'>
              <div className='slide-icon-container'>
                <IoIosArrowBack className='arrow-icon' onClick={() => handleOnClick('main')}/>
              </div>
              <SlideMenuItem type='category-title' path={slug} onClose={() => handleOnClose()}>{name}</SlideMenuItem>
            </div>
            
            {children.map(subcategory =>  
              <SlideMenuItem key={subcategory._id} path={`${slug}/${subcategory.slug}`} type='item' onClose={() => handleOnClose()}>
              { subcategory.name }
              </SlideMenuItem>)}

          </div>
      </CSSTransition>
      ))}
      
    </div>}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectCategoriesList,
});

export default connect(mapStateToProps)(SlideMenu);

