import React from 'react';
import './footer.styles.scss';
import { RiVisaLine, RiMastercardLine, RiPaypalLine } from 'react-icons/ri';
import { SiBitcoin } from 'react-icons/si';


const Footer = () => {

  return (
    <div className='footer-container'>
      <div className='social-icons'>
      </div>
      <div className='footer-column'>
        <a href='#'>Contact us</a>
        <a href='#'>About us</a>
        <a href='#'>Delivery information</a>
        <a href='#'>Careers</a>
      </div>
      <div className='bottom'>
        <div className='payment-methods'>
          <RiVisaLine size={30} />
          <RiMastercardLine size={30} />
          <RiPaypalLine size={30} />
          <SiBitcoin size={30} />
        </div>
        <div className='copyright'>
          <div className='legal-links'>
            <a href='#' rel='nofollow'>Terms & Conditions</a>
            <a href='#' rel='nofollow'>Privacy Policy</a>
            <a href='#'>Sitemap</a>
          </div>
          <span>© Copyright
          <strong>Züruck™️</strong>
          . All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer;