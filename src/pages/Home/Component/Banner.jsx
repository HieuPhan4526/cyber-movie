import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react'
import { movieService } from '../../../Service/MovieService';



const contentStyle = {
  height: '750px',
  width: '100%',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
};

let RenderBanner = () => {

  let [bannerArr, setBannerArr] = useState([])
  useEffect(() => {
    movieService.GetBannerList().then((result) => {
      setBannerArr(result.data.content);
    }).catch((error) => {
      console.log(error)
    })
  }, [])


  return bannerArr.map((banner, index) => {
    return <div key={index}>
      <img style={contentStyle} src={banner.hinhAnh} alt="" />
    </div>
  })
}
export default function Banner() {
  return (
    <div className='section'>
      <h1>Đặt Vé Xem Phim</h1>
      <Carousel autoplay>
        {RenderBanner()}
      </Carousel>
    </div>
  )
}
