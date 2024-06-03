import fetchMovies from './fetchMovies';

const getMovieNames = async () => {
  try {
    const movies = await fetchMovies();

    return movies.map(({ movie }) => movie);
  } catch (error) {
    return error;
  }
};

export default getMovieNames;
