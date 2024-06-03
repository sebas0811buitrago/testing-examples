interface Movie {
  id: number;
  movie: string;
  rating?: number;
  image?: string;
  imdb_url?: string;
}

const fetchMovies = async () => {
  return await fetch('https://dummyapi.online/api/movies')
    .then((response) => response.json())
    .then((json) => json as Movie[]);
};

export default fetchMovies;
