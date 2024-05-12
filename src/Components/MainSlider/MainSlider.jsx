import React from 'react'
import Slider from 'react-slick'
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/blog-img-1.jpeg'
import blog2 from '../../Assets/images/blog-img-2.jpeg'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };

  return (
   <>
   <div className="row mb-3 mt-3 justify-content-center gx-0 pt-5">
    <div className="col-md-10">
        <Slider {...settings}>
            <img height={400} className='w-100' src={slide1} alt="slide" />
            <img height={400} className='w-100' src={slide2} alt="slide" />
            <img height={400} className='w-100' src={slide3} alt="slide" />
        </Slider>
    </div>
    <div className="col-md-2">
        <img height={200} className='w-100' src={blog1} alt="slide" />
        <img height={200} className='w-100' src={blog2} alt="slide" />
    </div>
   </div>
    
    
   </>
  )
}
