import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommentApiResponse } from "../../types/comment";
import { useParams } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useInView } from "react-intersection-observer";
import CommentListSkeletonList from "./CommentListSkeletonList";

const LIMIT = 10;

const CommentList = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const id = lpid;
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  const token = rawToken?.replace(/^"|"$/g, "");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id, order],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms 지연
      const res = await axios.get<CommentApiResponse>(
        `http://localhost:8000/v1/lps/${id}/comments`,
        {
          params: {
            cursor: pageParam,
            limit: LIMIT,
            order,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    enabled: !!id && !!token,
  });

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <CommentListSkeletonList count={3} />;
  if (isError) return <div className="text-white">댓글 불러오기 실패</div>;

  return (
    <div className="mt-10 text-white">
      {/* 댓글 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl">댓글</div>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`cursor-pointer px-4 py-2 rounded ${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-2 rounded ${
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 mb-10">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-3 py-2 rounded border border-gray-600 bg-[#1f1f1f] text-white focus:outline-none"
        />
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-[#212121] cursor-pointer">
          작성
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div className="space-y-4">
        {data?.pages
          .flatMap((page) => page.data.data)
          .map((comment) => (
            <div key={comment.id} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold">
                {comment.author?.name?.[0] ?? "?"}
              </div>
              <div className="flex flex-col items-start ml-2">
                <span className="font-semibold">
                  {comment.author?.name ?? "알 수 없음"}
                </span>
                <p className="text-sm text-gray-300">{comment.content}</p>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

        {isFetchingNextPage && <CommentListSkeletonList count={3} />}
        <div ref={ref} className="h-20" />
      </div>
    </div>
  );
};

export default CommentList;