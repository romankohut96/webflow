import React, { useState, useEffect } from "react";

export default function MovieList(props) {

  const [movieList, setMovieList] = useState([]);

  const getMovies = (genre, year) => {
    genre = genre ? genre.id.toString() : '';
    console.log(genre)
    year = year ? year.name : null;
    const startDate = year ? `${year}-01-01` : '';
    const endDate = year ? `${year}-12-31` : '';

    const api = `https://api.themoviedb.org/3/discover/movie?api_key=41ecc174e82b6b1f94905705134b107a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&with_genres=${genre}&with_watch_monetization_types=flatrate`;

    console.log(api);
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data.results);
      });
  }

  const searchIsValid = () => {
    if (props.year && props.year.name.length == 4) {
      return true
    } else if (!props.year) {
      return true
    } else {
      return false
    }
  }
  useEffect(() => {
    if (searchIsValid()) {
      getMovies(props.genre, props.year);
    } else {
      console.log('not a 4 digit year')
    }
    console.log(movieList.map(movie => movie.title))
  }, [props.genre, props.year]);

  return(
    <div className="movie-list">
      { movieList.map(movie => {
        return (
          <div 
            key={movie.id} 
            className="movie-list-item">
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
          </div>
        );
      }) }
    </div>
  );
}