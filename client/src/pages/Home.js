import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import Requests from '../components/Requests'
import BackgroundSlideshow from 'react-background-slideshow';
import {useSelector} from 'react-redux';


import image1 from '../components/assets/image1.jpg'
import image2 from '../components/assets/image2.jpg'
import image3 from '../components/assets/image3.jpg'
import image4 from '../components/assets/image4.jpg'
import image5 from '../components/assets/image5.jpg'
import image6 from '../components/assets/image6.jpg'
import image7 from '../components/assets/image7.jpg'


class Homepage extends React.Component {

  

  render() {
  

    return (



      <div>
    <BackgroundSlideshow images={[ image1, image2, image3, image4, image5, image6, image7 ]} />
    </div>
)
}
}

export default Homepage;
