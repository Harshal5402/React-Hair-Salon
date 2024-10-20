import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <img src={assets.footer_img} className='footer-img' alt="" />
      <div className="title-text">
        <p>CONTACT</p>
        <h1>Visit Shop Today</h1>
      </div>

      <div className="footer-row">
        <div className="footer-left">
          <h1>Opening Hours</h1>
          <p> <i className="fa fa-clock-o"></i> Monday to Friday - 9am to9pm</p>
          <p> <i className="fa fa-clock-o"></i>Saturday and Sunday - 8am to 11pm</p>
        </div>
        <div className="footer-right">
          <h1>Get In Touch</h1>
          <p>#98 Mhow, Indore <i className="fa fa-map-marker"></i></p>
          <p>hair@salon.com<i className="fa fa-paper-plane"></i></p>
          <p>+91 9990004466</p>
        </div>

      </div>

      <div className="social-links">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-instagram"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-youtube-play"></i>

        <p>Copyright @hairstudio</p>

      </div>
    </div>
  )
}

export default Footer