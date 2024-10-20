import React from 'react'
import './Feature.css'
import { assets } from '../../assets/assets'


const Feature = () => {
  return (
    <div className='Feature'>
        <div className="title-text">
            <p>FEATURE'S</p>
            <h1>Why Choose Us</h1>
        </div>

        <div className="feature-box">
            <div className="features">
                <h1>Experienced Staff</h1>
                <div className="features-desc">
                    <div className="feature-icon">
                        <i className="fa fa-shield"></i>
                    </div>
                    <div className="feature-text">
                        <p>Our salon features seasoned professionals with years of experience in cutting, coloring, and styling, ensuring exceptional hair care. Whether you seek a bold transformation or want to maintain your signature look, our dedicated team delivers precision and personalized service.</p>
                    </div>
                </div>
                <h1>Pre Booking Online</h1>
                <div className="features-desc">
                    <div className="feature-icon">
                        <i className="fa fa-check-square-o"></i>
                    </div>
                    <div className="feature-text">
                        <p>Enjoy the convenience of pre-booking your appointments online, ensuring you secure your preferred time with our expert stylists. Experience hassle-free scheduling and never miss out on your desired look!</p>
                    </div>
                </div>
                <h1>Affordable Cost</h1>
                <div className="features-desc">
                    <div className="feature-icon">
                        <i className="fa fa-inr"></i>
                    </div>
                    <div className="feature-text">
                        <p>Experience top-notch hair services at competitive prices that won’t break the bank. Enjoy exceptional quality and style without compromising your budget!</p>
                    </div>
                </div>

            </div>
            <div className="features-img">
                <img src={assets.barber_man}alt="" />
            </div>

        </div>
    </div>
  )
}

export default Feature