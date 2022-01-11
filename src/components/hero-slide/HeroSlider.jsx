import React, { useState, useEffect } from 'react';

import tmdbApi, { category, movieType }from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const HeroSlider = () => {

    const [movieItem, setMovieItems] = useState([]);

    useEffect(() => {
       const getMovies = async () => {
           const params = {page: 1}
           try {
               const response = await tmdbApi.getMoviesList(movieType.popular, {params});
               setMovieItems(response.results.slice(0, 4));
               console.log(response);
           } catch {
               console.log('error');
           }
       }
       getMovies();
    }, [])

    return (
        <div className='hero-slide'>
            HeroSlider
        </div>
    )
}

export default HeroSlider;