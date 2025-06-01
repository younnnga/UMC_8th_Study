import { useCallback, useMemo, useState } from 'react';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import useFetch from '../hooks/useFetch';
import Modal from '../components/Modal';
import type { Movie, MovieFilters, MovieResponse } from '../types/movie';

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: "ko-KR",
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters],
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback((filters: MovieFilters) => {
    setFilters(filters);
  }, [setFilters]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie); // 영화 클릭 시 선택된 영화 상태 업데이트
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // 모달 닫기
  };

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onMovieClick={handleMovieClick} // 클릭 시 호출될 함수 전달
        />
      )}

      {/* 모달이 열리면 선택된 영화 정보를 Modal 컴포넌트에 전달 */}
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
