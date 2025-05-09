import { useQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { getLpList } from '../../apis/lp';
import { ResponseLpListDto } from '../../types/lp';  // ResponseLpListDto 타입 임포트
import { QUERY_KEY } from '../../constants/key';

// PaginationDto를 사용하여 getLpList 호출
function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery<ResponseLpListDto>({
    queryKey: [QUERY_KEY.lps, search, order],  // 쿼리 키 설정
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5,  // 5분 동안 데이터가 신선하다고 간주
    gcTime: 1000 * 60 * 10,  // 10분 동안 데이터가 사용되지 않으면 캐시에서 제거
  });
}

export default useGetLpList;
