import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { fetchLpDetail } from '../apis/lp'; // API 호출 함수
import { Lp } from '../types/lp';
import CommentList from '../components/CommentCard/CommentList';

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  // 1) 로그인 체크 (비로그인 시 바로 리다이렉트)
  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // 2) useQuery object API 사용
  const {
    data: lpData,
    isLoading,
    isError,
    error,
  } = useQuery<Lp, Error>({
    queryKey: ['lpDetail', lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: Boolean(lpid) && Boolean(accessToken),
  });

  // 3) 로딩 / 에러 처리
  if (isLoading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }
  if (isError) {
    return <div className="mt-20 text-center">Error: {error.message}</div>;
  }
  if (!lpData) {
    return <div className="mt-20 text-center">해당 LP를 찾을 수 없습니다.</div>;
  }

  // 4) 실제 렌더링
  return (
    <div className="w-full bg-black text-white px-10 py-10">
      {/* LP 정보 */}
      <div className="mb-6">
        <div className="relative">
          {/* LP 이미지를 원형으로 변경 */}
          <img
            src={lpData.thumbnail}
            alt={lpData.title}
            className="w-80 h-80 object-cover rounded-full mb-4 lp-spin mx-auto"
          />
          {/* LP 중앙의 작은 원 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{lpData.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(lpData.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="text-base leading-relaxed">{lpData.content}</p>
      </div>

      {/* 버튼들 (디자인만) */}
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          ♥ 좋아요
        </button>
        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          수정
        </button>
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          삭제
        </button>
      </div>

      {/* CSS for spinning animation */}
      <style>{`
        /* LP 이미지 회전 애니메이션 */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .lp-spin {
          animation: spin 10s linear infinite;
        }
      `}</style>

      {/* 댓글 */}
      <div className="mt-8">
        <CommentList />
      </div>
    </div>
  );
};

export default LpDetailPage;
