import React from 'react'
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import UseNetwork from '../../Hooks/UseNetwork';



export default function Home() {
  let x = UseNetwork()
  
  return <>
    <Helmet>
      <title>Fresh Cart Home</title>
    </Helmet>
    {x}
    <MainSlider/>
    <CategorySlider/>
    <FeaturedProducts/>
  </>
}
