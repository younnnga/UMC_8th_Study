import {
  RequestSignupDto,
  RequestSigninDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto
} from '../types/auth';

import axiosInstance from './axios';

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.post("/v1/users/me");
  return data;
};


