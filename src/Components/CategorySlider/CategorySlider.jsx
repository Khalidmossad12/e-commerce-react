import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'


export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows : false
      };
    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {isLoading , isError , data} = useQuery('CategorySlider' , getCategories)
    console.log(data?.data.data);
  return (
    <>
        {data?.data.data?
        <div className="py-2">
            <Slider {...settings}> 
                {data?.data.data.map((category)=> <img height={200} key={category._id} className='w-100' src= {category.image}/>)}
            </Slider>
        </div>:''}
        
    </>
  )
}
