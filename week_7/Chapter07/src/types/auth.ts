import { CommonResponse } from "./common";
import { Lp } from './lp';

// 회원가입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};


export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  likedLps: Lp[];  // 좋아요 한 LP 목록
  writtenLps: Lp[];  // 내가 작성한 LP 목록
  createAt: Date;
  updateAt: Date;
}>;

// 로그인
export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = CommonResponse<{
  avatar: null;
  bio: null;
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
}>;

export type UpdateMyInfoDto = {
  name: string;
  bio: string;
  avatar?: string;
};