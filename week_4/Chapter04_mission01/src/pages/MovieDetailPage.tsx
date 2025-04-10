import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieDetailResponse, CreditsResponse } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  const { isPending, isError, data: movie } = useCustomFetch<MovieDetailResponse>(url);
  const { data: credits } = useCustomFetch<CreditsResponse>(creditUrl);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        로딩 중...
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        에러가 발생했습니다.
      </div>
    );
  }

  const director = credits?.crew.find((member) => member.job === 'Director');
  const topCast = credits?.cast.slice(0, 5);

  const getProfileImage = (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/w200${path}` : '/no-profile.png';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 배경 이미지 + 포스터 */}
      <div className="relative h-[500px]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-40 md:w-60 rounded-xl shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-sm md:text-base text-gray-300">{movie.tagline}</p>
          </div>
        </div>
      </div>

      {/* 정보 섹션 */}
      <div className="max-w-4xl mx-8 space-y-2">
        <p><span className="font-semibold">개봉일:</span> {movie.release_date}</p>
        <p><span className="font-semibold">평점:</span> {movie.vote_average} / 10</p>
        <p><span className="font-semibold">러닝타임:</span> {movie.runtime}분</p>
        <p><span className="font-semibold">장르:</span> {movie.genres.map(g => g.name).join(', ')}</p>
        <p><span className="font-semibold">제작사:</span> {movie.production_companies.map(c => c.name).join(', ')}</p>

        {/* 감독/출연 섹션 */}
        <div className="max-w-4xl mx-8 space-y-2">
          <h2 className="text-xl font-semibold mb-8">감독/출연</h2>
          <div className="flex flex-wrap gap-8">
            {/* 감독 정보 */}
            {director && (
              <div className="flex flex-col items-center">
                <img
                  src={getProfileImage(director.profile_path)}
                  alt={director.name}
                  className="w-24 h-24 object-cover rounded-full border-1 border-white shadow-md mb-2"
                />
                <p className="text-lg font-semibold">{director.name}</p>
              </div>
            )}

            {/* 출연진 */}
            {topCast && topCast.map(actor => (
              <div key={actor.id} className="flex flex-col items-center">
                <img
                  src={getProfileImage(actor.profile_path)}
                  alt={actor.name}
                  className="w-24 h-24 object-cover rounded-full border-1 border-white shadow-md mb-2"
                />
                <p className="text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 줄거리 */}
        <div>
          <span className="font-semibold block mb-1">줄거리:</span>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;



