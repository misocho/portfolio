import React, { Component } from 'react';

import EmailIcon from '../../icons/email.svg';
import PhoneIcon from '../../icons/phone2.svg';
import AddressIcon from '../../icons/location-pin.svg';
import Contacts from '../../db/contactpage.db';


import './contactpage.css';


export class ContactPageContainer extends Component {
  
  render() {
    const { address, email, phone } = Contacts;

    return (
      <div className="contact-page-wrapper">
        <div className="contacts-wrapper">
          <div className="contact-title">Let's get in touch...</div>
          <div className="contact-cards-wrapper">
            <div className="contact-card end-cards"> 
              <div id="address-card">
                <div id="contact-address-icon">
                  <AddressIcon className="contact-svg" id="contact-address-svg" />
                  <div className="contact-name">Address</div>
                  <div className="contact">{address}</div>
                </div>
              </div>
            </div>
            <div className="contact-card">
              <div id="email-card">
              <div id="contact-email-icon">
                  <EmailIcon className="contact-svg" id="contact-email-svg"/>
                  <div className="contact-name">Email</div>
                  <div className="contact">{ email }</div>
              </div>
              </div>
            </div>
            <div className="contact-card end-cards"> 
              <div id="phone-card">
                <div id="contact-phone-icon">
                  <PhoneIcon className="contact-svg" id="contact-phone-svg" />
                  <div className="contact-name">Phone</div>
                  <div className="contact">{ phone }</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPageContainer