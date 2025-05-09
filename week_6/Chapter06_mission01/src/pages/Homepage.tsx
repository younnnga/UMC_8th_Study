import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetinfiniteLpList from '../hooks/queries/useGetinfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';


const Homepage = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc); // 정렬 상태 추가

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError
  } = useGetinfiniteLpList(10, search, sortOrder); // 정렬 상태 전달

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) return <div className="mt-20">Loading...</div>;

  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-6">
      {/* 정렬 버튼과 검색창 */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        <input
          className="border p-2 bg-gray-800 text-white"
          placeholder="LP 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-2 border rounded-lg ${
            sortOrder === PAGINATION_ORDER.asc
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-2 border rounded-lg ${
            sortOrder === PAGINATION_ORDER.desc
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          오래된순
        </button>
      </div>
  
      {/* 카드 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
  
};

export default Homepage;
