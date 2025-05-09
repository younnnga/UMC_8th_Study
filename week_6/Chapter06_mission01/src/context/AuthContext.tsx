import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postLogout, postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface User {
  id: number;
  name: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessToken,
    setItem: setAccessToken,
    removeItem: removeAccessToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshToken,
    setItem: setRefreshToken,
    removeItem: removeRefreshToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const {
    getItem: getUser,
    setItem: setUserInStorage,
    removeItem: removeUser,
  } = useLocalStorage(LOCAL_STORAGE_KEY.user);

  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    getAccessToken()
  );
  const [refreshToken, setRefreshTokenState] = useState<string | null>(() =>
    getRefreshToken()
  );
  const [user, setUser] = useState<User | null>(() => getUser());

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      if (data) {
        const newUser: User = {
          id: data.id,
          name: data.name,
        };

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setUserInStorage(newUser);

        setAccessTokenState(data.accessToken);
        setRefreshTokenState(data.refreshToken);
        setUser(newUser);

        alert("로그인 성공");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessToken();
      removeRefreshToken();
      removeUser();

      setAccessTokenState(null);
      setRefreshTokenState(null);
      setUser(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider로 감싸야 합니다.");
  }
  return context;
};
