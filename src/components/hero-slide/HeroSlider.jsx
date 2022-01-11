import React, { useState, useEffect } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';

import tmdbApi, { category, movieType }from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import {useHistory} from 'react-router';

const HeroSlider = () => {

    SwiperCore.use([Autoplay]);

    const [movieItem, setMovieItems] = useState([]);

    useEffect(() => {
       const getMovies = async () => {
           const params = {page: 1}
           try {
               const response = await tmdbApi.getMoviesList(movieType.popular, {params});
               setMovieItems(response.results.slice(0, 5));
               console.log(response);
           } catch {
               console.log('error');
           }
       }
       getMovies();
    }, []);

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 3000}}
            >
                {
                    movieItem.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                              <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

const HeroSlideItem = props => {
    let hisrory = useHistory();

    const item = props.item;
    
    const background = apiConfig.orignalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    return (
        <div 
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>{item.overview}</div>
                    <div className='btns'>
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={() => console.log('trailer')}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt=''/>
                </div>
            </div>

        </div>
    )
}

export default HeroSlider;