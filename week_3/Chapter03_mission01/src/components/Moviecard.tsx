import { useState } from 'react';
import { Movie } from '../types/movie';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={(): void | Promise<void> => navigate(`/movie/${movie.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer 
      w-44 transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title}의 포스터`}
        className="w-full h-auto"
      />

      {isHovered && (
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md
            flex flex-col justify-center items-center text-white p-4"
        >
          <h2 className="text-lg font-bold leading-snug text-center">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
