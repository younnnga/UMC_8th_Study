import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";

const MyPage = () => {
  const [fixInfo, setFixInfo] = useState(false);
  const { data, isLoading, isError, error } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const { mutate: updateMyInfo } = useUpdateMyInfo();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setBio(data.data.bio ?? "");
      setAvatar(data.data.avatar ?? "");
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("닉네임은 필수 사항입니다.");
      return;
    }

    updateMyInfo({ name, bio, ...(avatar && { avatar }) });
    setFixInfo(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white py-20">
      <div className="flex flex-col gap-4 w-[300px] items-center relative">
        {/* 상단 바 */}
        <div className="relative flex items-center justify-between py-2 w-full px-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <img
              src="https://icon-library.com/images/ios-back-icon/ios-back-icon-10.jpg"
              alt="뒤로가기"
              className="w-6 h-6"
            />
          </button>
          <h1 className="text-xl font-bold text-white text-center flex-1">
            마이페이지
          </h1>
          {!fixInfo ? (
            <button
              className="text-white cursor-pointer hover:text-pink-500"
              onClick={() => setFixInfo(true)}
            >
              수정
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="text-white cursor-pointer hover:text-pink-500"
            >
              저장
            </button>
          )}
        </div>

        {/* 프로필 이미지 */}
        {fixInfo ? (
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <img
              src={
                avatar ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              className="w-40 h-40 rounded-full object-cover"
              alt="프로필"
            />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setAvatar(reader.result as string);
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
        ) : (
          <img
            src={
              avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            className="w-40 h-40 rounded-full object-cover"
            alt="프로필"
          />
        )}

        {/* 이름 */}
        <div className="text-left w-full">
          <h2 className="text-sm text-gray-400">이름</h2>
          {fixInfo ? (
            <input
              type="text"
              value={name}
              placeholder="닉네임"
              onChange={(e) => setName(e.target.value)}
              className="bg-black border-none border p-2 text-white w-full rounded"
            />
          ) : (
            <p className="text-white font-medium">{name}</p>
          )}
        </div>

        {/* 소개 */}
        <div className="text-left w-full">
          <h2 className="text-sm text-gray-400">소개</h2>
          {fixInfo ? (
            <input
              type="text"
              value={bio}
              placeholder="자기소개"
              onChange={(e) => setBio(e.target.value)}
              className="bg-black border-none border p-2 text-white w-full rounded"
            />
          ) : (
            <p className="text-white font-medium">
              {bio || "자기소개를 작성해주세요"}
            </p>
          )}
        </div>

        {/* 이메일 */}
        <div className="text-left w-full">
          <h2 className="text-sm text-gray-400">이메일</h2>
          <p className="text-white font-medium">{data?.data.email}</p>
        </div>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-700 mt-4"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;