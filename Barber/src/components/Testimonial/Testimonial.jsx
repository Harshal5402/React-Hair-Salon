import React from 'react'
import './Testimonial.css'
import { assets } from '../../assets/assets'

const Testimonial = () => {
  return (
    <div className='testimonial'>
        <div className="title-text">
            <p>TESTIMONIAL</p>
            <h1>What Client Say's</h1>
        </div>
        <div className="testimoinal-row">
            <div className="testimonial-col">
                <div className="user">
                    <img src={assets.img_one} alt="" />
                    <div className="user-info">
                        <h4>Aarav
                            <i className="fa fa-twitter"></i>
                        </h4>
                        <small>@Aarav_Official</small>
                    </div>
                </div>
                <p>I absolutely love my new haircut! The stylist listened to exactly what I wanted and delivered beyond my expectations. I've received so many compliments and will definitely be coming back for more!</p>
            </div>
            <div className="testimonial-col">
                <div className="user">
                    <img src={assets.img_two} alt="" />
                    <div className="user-info">
                        <h4>Ananya
                            <i className="fa fa-twitter"></i>
                        </h4>
                        <small>@Ananya_Speaks</small>
                    </div>
                </div>
                <p>The team here is amazing! They made me feel so comfortable and took the time to understand my hair needs. The color treatment was flawless, and I couldn't be happier with the results. Highly recommend!</p>
            </div>
            <div className="testimonial-col">
                <div className="user">
                    <img src={assets.img_three} alt="" />
                    <div className="user-info">
                        <h4>Rohan
                            <i className="fa fa-twitter"></i>
                        </h4>
                        <small>@Rohan_Tweets</small>
                    </div>
                </div>
                <p>I had the best experience at this salon! The atmosphere is welcoming, and the staff is incredibly talented. My beard trim was perfect, and I left feeling refreshed and confident. I can't wait for my next visit!</p>
            </div>
        </div>
    </div>
  )
}

export default Testimonial