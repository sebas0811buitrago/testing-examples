import * as fetchMovies from './fetchMovies';
import getMovieNames from './getMovieNames';

describe('getMovieNames', () => {
  it('should return an array of movie names', () => {
    const fetchMoviesSpy = vi
      .spyOn(fetchMovies, 'default')
      .mockResolvedValueOnce([{ movie: 'Movie 1' }, { movie: 'Movie 2' }]);
    getMovieNames();
    expect(fetchMoviesSpy).toHaveBeenCalledOnce();
  });
});
