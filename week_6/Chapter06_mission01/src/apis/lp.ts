// src/apis/lp.ts
import axiosInstance from './axios';
import { PaginationDto } from '../types/common';
import { ResponseLpListDto, Lp } from '../types/lp';

export const getLpList = async (
  params: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get<ResponseLpListDto>('/v1/lps', {
    params,
  });
  return data;
};

// LP 상세 정보를 가져오는 함수 (리턴 값을 Lp로 가공)
export const fetchLpDetail = async (lpId: string): Promise<Lp> => {
  const { data } = await axiosInstance.get<{
    status: boolean;
    statusCode: number;
    message: string;
    data: Lp;
  }>(`/v1/lps/${lpId}`);
  return data.data;
};
