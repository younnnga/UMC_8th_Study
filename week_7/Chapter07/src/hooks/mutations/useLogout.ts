import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";
import { CommonResponse } from "../../types/common";

const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation<CommonResponse<null>, Error, void>({
    mutationFn: postLogout,
    onSuccess: async () => {
      await logout();
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogout;