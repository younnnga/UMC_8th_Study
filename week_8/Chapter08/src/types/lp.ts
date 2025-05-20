import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;  // string으로 변경: ISO 8601 형식으로 처리
  updatedAt: string;  // string으로 변경: ISO 8601 형식으로 처리
  tags: Tag[];
  likes: Likes[];
};

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export interface UpdateLpDto {
  id: number;  // 수정: lpId -> id로 일관성 유지
  title: string;
  content: string;
  thumbnail: string;
}
