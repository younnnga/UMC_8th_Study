import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void; // 클릭 이벤트 핸들러
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://placehold.co//600x400";

  return (
    <div
      onClick={onClick} // 클릭 시 onClick 함수 실행
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date} | {movie.original_language.toUpperCase()}</p>
        <p className="mt-2 text-sm text-gray-700">
          {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
