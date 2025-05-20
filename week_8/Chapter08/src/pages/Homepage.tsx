import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetinfiniteLpList from '../hooks/queries/useGetinfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';
import Modal from "../components/Modal";
import useDebounce from '../hooks/useDebounce';
import { SEARCH_DEBOUNCEDELAY } from '../constants/delay';
import useTrottle from '../hooks/useTrottle';

const Homepage = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCEDELAY);
  const [, setScrollY] = useState<number>(0);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
    refetch,
  } = useGetinfiniteLpList(10, debouncedValue, sortOrder);

  const { ref, inView } = useInView({ threshold: 0 });

  // ✅ Throttle Scroll Event
  const handleScroll = useTrottle(() => {
    setScrollY(window.scrollY);
    console.log("Throttled Scroll Y:", window.scrollY);
  }, 4000); // 2초에 한 번만 실행

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log("리렌더링")

  // ✅ 무한 스크롤 트리거
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) return <div className="mt-20">Loading...</div>;
  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-6">
      {/* ✅ LP 추가 후 refetch */}
      <Modal onLpAdded={refetch} />

      <div className="flex justify-end items-center mb-4 space-x-2">
        <input
          className="border p-2 bg-gray-800 text-white"
          placeholder="LP 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-2 border rounded-lg ${sortOrder === PAGINATION_ORDER.asc ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-2 border rounded-lg ${sortOrder === PAGINATION_ORDER.desc ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          오래된순
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default Homepage;
