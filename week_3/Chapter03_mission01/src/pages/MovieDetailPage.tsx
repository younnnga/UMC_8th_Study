import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner'; // 로딩 스피너 컴포넌트
import { Movie, MovieCredits } from '../types/movie'; // Movie 타입, MovieCredits 타입을 정의

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>(); // URL에서 movieId를 추출
  const [movie, setMovie] = useState<Movie | null>(null); // 영화 정보 상태
  const [credits, setCredits] = useState<MovieCredits | null>(null); // 출연/감독 정보 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const [isError, setIsError] = useState(false); // 에러 상태

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // 영화 정보 API 호출
        const movieResponse = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(movieResponse.data);

        // 출연 및 감독 정보 API 호출
        const creditsResponse = await axios.get<MovieCredits>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCredits(creditsResponse.data);
      } catch (error) {
        if (error instanceof Error) {
          // 에러를 console에 출력 
          console.error(error.message); // 콘솔에 에러 메시지 출력
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  // 로딩 중일 때 처리
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 발생 시 처리
  if (isError) {
    return (
      <div className="text-red-500 text-xl text-center mt-10">
        <span>영화 정보를 불러오는 데 오류가 발생했습니다.</span>
      </div>
    );
  }

  // 영화 정보가 없으면 처리
  if (!movie) {
    return (
      <div className="text-center text-lg mt-10">
        <span>영화 정보를 찾을 수 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-black text-white">
      <div className="flex items-center gap-6 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-72 h-96 object-cover"
        />
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-xl text-gray-400 mt-2">{movie.release_date}</p>
          <p className="text-lg text-gray-300 mt-4">{movie.overview}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">출연 및 감독</h2>
        <div className="flex gap-8">
          {/* 감독 */}
          <div className="w-1/3">
            <h3 className="text-xl font-medium mb-2">감독</h3>
            {credits?.crew
              ?.filter((member) => member.job === 'Director')
              .map((director) => (
                <div key={director.name} className="mb-4">
                  {director.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                      alt={director.name}
                      className="rounded-full mb-2 w-32 h-32 object-cover"
                    />
                  )}
                  <p className="text-lg">{director.name}</p>
                </div>
              ))}
          </div>

          {/* 출연 */}
          <div className="w-2/3">
            <h3 className="text-xl font-medium mb-2">출연</h3>
            {credits?.cast?.slice(0, 5).map((actor) => (
              <div key={actor.cast_id} className="mb-4 flex items-center gap-4">
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-full w-16 h-16 object-cover"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
