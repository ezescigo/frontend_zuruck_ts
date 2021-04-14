import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './footer.styles.scss';
import { RiVisaLine, RiMastercardLine, RiPaypalLine } from 'react-icons/ri';
import { SiBitcoin } from 'react-icons/si';


const Footer = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
  });
  const handleSubmit = () => {
    // handlesubmit
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value })
  };

  return (
    <div className='footer-container'>
      <section className='newsletter-container'>
        <div className='newsletter-text'>
          <span className='header'>Stay in touch</span>
        <p>Fancy weekly discounts and new arrivals delivered straight to your inbox? You know what to do.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className='newsletter-input'
            name="email" 
            type="email" 
            value={userCredentials.email}
            onChange={handleChange}
            label='Enter your email address'
            required />
          <CustomButton className='subscribe' type="submit">Subscribe</CustomButton>
        </form>
      </section>
      <div className='social-icons'>
      </div>
      <div className='footer-column'>
        <div><a href='#'>Contact us</a></div>
        <div><a href='#'>About us</a></div>
        <div><a href='#'>Delivery information</a></div>
        <div><a href='#'>Careers</a></div>
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
            <strong>•</strong>
            <a href='#' rel='nofollow'>Privacy Policy</a>
            <strong>•</strong>
            <a href='#'>Sitemap</a>
          </div>
          <span>© Copyright &nbsp;
          <strong>Züruck™</strong>
          .&nbsp; All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer;