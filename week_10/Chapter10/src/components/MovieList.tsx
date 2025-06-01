import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void; // 클릭한 영화 정보를 부모 컴포넌트로 전달
}

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie)} // 클릭 시 onMovieClick 호출
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
