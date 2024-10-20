import React from 'react'
import './Service.css'
import { assets } from '../../assets/assets'

const Service = () => {
  return (
    <div className='service'>
        <div className="title-text">
            <p>SERVICES</p>
            <h1>We provide Better</h1>
        </div>
        <div className="service-box">
            <div className="single-service">
                <img src={assets.pic_one} alt="" />
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Hair Styling</h3>
                    <hr />
                    <p>Transform your look with our expert hair styling services, tailored to suit your individual style and occasion. Whether it's a casual day out or a special event, our skilled stylists will create the perfect style for you!</p>
                </div>
            </div>
            <div className="single-service">
                <img src={assets.pic_two} alt="" />
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Beard Trim</h3>
                    <hr />
                    <p>Achieve a polished and refined look with our professional beard trim service, designed to enhance your facial features. Our skilled barbers use precision techniques to ensure your beard looks its best, every time!</p>
                </div>
            </div>
            <div className="single-service">
            <img src={assets.pic_three} alt="" />
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Hair Cut</h3>
                    <hr />
                    <p>Refresh your style with our professional hair cut service, tailored to complement your face shape and personal style. Our experienced stylists ensure precision and creativity, leaving you with a look you'll love!</p>
                </div>
            </div>
            <div className="single-service">
            <img src={assets.pic_four} alt="" />
                <div className="overlay"></div>
                <div className="service-desc">
                    <h3>Dry Shampoo</h3>
                    <hr />
                    <p>Revitalize your hair between washes with our convenient dry shampoo service, perfect for adding volume and freshness. Experience a quick and easy way to refresh your look without the need for a full wash!</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Service