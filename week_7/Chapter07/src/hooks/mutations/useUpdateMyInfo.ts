import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResponseMyInfoDto, UpdateMyInfoDto } from "../../types/auth";
import { patchMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: UpdateMyInfoDto) => patchMyInfo(data),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      if (previousMyInfo) {
        const updatedUser = {
          ...previousMyInfo.data,
          name: data.name,
          bio: data.bio ?? previousMyInfo.data.bio,
          avatar: data.avatar ?? previousMyInfo.data.avatar,
        };

        queryClient.setQueryData([QUERY_KEY.myInfo], {
          ...previousMyInfo,
          data: updatedUser,
        });

        // ✅ 낙관적 업데이트로 바로 Context도 업데이트
        setUser(updatedUser);
      }

      return { previousMyInfo };
    },

    onError: (error) => {
      alert("정보 수정 과정에서 에러가 발생했습니다. " + error);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
};

export default useUpdateMyInfo;
