import { APIContext } from "./ContextAPI";

function ProviderAPI ({children}) {
    const api_key = "f0f9e74e5fd05626665a49734847bbbd"
    const getListMovies = async (type) => {
        // type == top_rated || popular || upcoming
        const response = await fetch (`https://api.themoviedb.org/3/movie/${type}?api_key=${api_key}&language=en-US&page=1`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        let movies = await response.json()

        return movies
    }

    const getListTvShow = async (type) => {
        // type == top_rated || popular || on_the_air
        let response = await fetch (`https://api.themoviedb.org/3/tv/${type}?api_key=${api_key}&language=en-US&page=1`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const tvshows = await response.json()

        return tvshows
    }

    // type == movie || tv
    const getDetail = async (type, id) => {
        let response = await fetch (`https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=en-US`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    // type == all | movie | tv | person        time == day | week
    const getTrending = async (type, time) => {
        let response = await fetch (`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${api_key}`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }
    
    // type == movie | tv       srtSort == vote_average || popularity || primary_release_date (movie) || first_air_date (tv)
    const getDiscover = async (type, strSort, genres, page) => {
        let response = await fetch (`https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=en-US&sort_by=${strSort}&page=${page}&with_genres=${encodeURI(genres)}&with_runtime.gte=0&with_runtime.lte=200&primary_release_date.gte=2002-11-04&primary_release_date.lte=2022-07-28&air_date.gte=2002-11-04&air_date.lte=2022-07-28`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    // type == movie | tv
    const getGenres = async (type) => {
        let response = await fetch (`https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    // type == tv | person | movie
    const getSearch = async (type, page, query) => {
        let response = await fetch (`https://api.themoviedb.org/3/search/${type}?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    // type == movie | tv
    const getSimilar = async (type, id) => {
        let response = await fetch (`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${api_key}&language=en-US&page=1`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    const getCast = async (type, id) => {
        let response = await fetch (`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${api_key}`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    const getSeasons = async (id, ssNumber) => {
        let response = await fetch (`https://api.themoviedb.org/3/tv/${id}/season/${ssNumber}?api_key=${api_key}&language=en-US`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    const getVideoMovie = (id) => {
        return `https://2embed.org/embed/movie?tmdb=${id}`
    }

    const getVideoTVShow = (id, ssNumber, episodeNumber) => {
        return `https://2embed.org/embed/series?tmdb=${id}&s=${ssNumber}&e=${episodeNumber}`
    }

    const getRecommendations = async (id) => {
        let response = await fetch (`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`)

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const ans = await response.json()

        return ans
    }

    // https://2embed.org/embed/movie?tmdb={id}
    // https://2embed.org/embed/series?tmdb={id}&s={ssNumber}&e={episodeNumber}

    // https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
    
    return <APIContext.Provider value={{getListMovies, getListTvShow, getDetail, 
                getTrending, getDiscover, getGenres, 
                getSearch, getSimilar, getCast, 
                getSeasons, getVideoMovie, getVideoTVShow,
                getRecommendations
            }}>

        {children}
    </APIContext.Provider>
}

export default ProviderAPI