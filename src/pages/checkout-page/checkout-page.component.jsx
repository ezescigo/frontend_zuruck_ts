import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CheckOut from '../../components/checkout/checkout.component';
import { selectMobileView } from '../../redux/app/app.selectors';
import './checkout-page.styles.scss';

const CheckOutPage = ({ location, mobileView }) => {
  return (
  <div className='checkout-page'>
    {mobileView
      ? <CheckOut active={location.state.active} from={location.state.from} />
      : <div>desktop checkout page</div>
    }
    
  </div>
)}

const mapStateToProps = createStructuredSelector({
  mobileView: selectMobileView
});

export default withRouter(connect(mapStateToProps)(CheckOutPage));