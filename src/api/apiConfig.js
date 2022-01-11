const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '835ae9d3716835b0f46d81f12631089b',
    orignalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;