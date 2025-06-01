import { useEffect } from 'react';
import type { Movie } from '../types/movie';

interface ModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
  if (!movie) return null;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";       // 포스터 이미지
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; // 상단 배경 이미지
  const fallbackImage = "https://placehold.co/600x400";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-30 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg w-full max-w-5xl overflow-hidden shadow-lg">
        {/* 상단 배경 이미지 */}
        <div className="relative h-64 w-full">
          <img
            src={movie.backdrop_path ? `${backdropBaseUrl}${movie.backdrop_path}` : fallbackImage}
            alt={movie.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90 flex items-end px-6 py-4">
            <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
          </div>

          {/* 닫기 버튼 */}
          <button
            className="absolute top-4 right-4 text-white rounded-full bg-black bg-opacity-50 hover:bg-black p-2 rounded-full"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 상세 정보 */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽 포스터 이미지 */}
          <div>
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
              alt={movie.title}
              className="w-60 h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* 오른쪽 영화 정보 */}
          <div className="lg:col-span-2">
            <p className="text-sm text-gray-500 mb-2">
              {movie.release_date} | {movie.original_language.toUpperCase()}
            </p>

            <div className="mb-4 space-y-2">
              <p><span className="font-semibold text-gray-700">평점:</span> {movie.vote_average.toFixed(1)}</p>
              <p><span className="font-semibold text-gray-700">인기도:</span> {movie.popularity}</p>
              <p><span className="font-semibold text-gray-700">개봉일:</span> {movie.release_date}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">줄거리</h3>
              <p className="text-gray-700">{movie.overview}</p>
            </div>

            <div className="flex justify-start mt-6 space-x-2">
              <a
                href={`https://www.imdb.com/find?q=${movie.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 bg-white py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="text-blue-600 bg-white py-2 px-4 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white "
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
