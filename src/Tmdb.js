const API_KEY = '2082ad5363da0f487df7694c2d8c3109';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais da netflix
- recomendados
- em alta
- acao
- comedia
- terror
- romance 
- documentarios
- animacoes
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    return await req.json();
};

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'treading',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'topRated',
                title: 'Em alta',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Acao',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=53&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'anime',
                title: 'Animes',
                items: await basicFetch(`/discover/movie?with_genres=16&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'crime',
                title: 'Crime',
                items: await basicFetch(`/discover/movie?with_genres=80&language=pt-br&api_key=${API_KEY}`)
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-br&api_key=${API_KEY}`)
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-br&api_key=${API_KEY}`)
                    break;
                default:
                    info = null
                    break;
            }
        }

        return info
    }
};