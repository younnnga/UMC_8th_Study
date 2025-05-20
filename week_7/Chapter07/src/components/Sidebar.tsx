import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { deleteUser } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { createPortal } from "react-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SidebarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleClickWithdraw = () => {
    if (!accessToken) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser();
      await logout();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <aside className=" h-screen w-40 bg-zinc-900 p-4 space-y-4 absolute md:relative z-20 transition-transform duration-300 ease-in-out transform translate-x-0">
      {/* ✅ 닫기 버튼 추가 */}
      <button
        className="text-white mb-4"
        onClick={() => setSidebarOpen(false)} // ✅ 수정됨
      >
        닫기
      </button>

      
      <button 
        className="mb-3 text-gray-500 hover:text-gray-200 hover:cursor-pointer flex items-center"
      >
        <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
        찾기
      </button>

      <button
        onClick={() => navigate("my")}
        className="mb-4 text-gray-500 hover:text-gray-200 hover:cursor-pointer"
      >
        <img
          alt="프로필"
          className="w-5 h-5 inline-block mr-2 rounded-full object-cover"
        />
        마이페이지
      </button>


      <div className="mt-30 text-center">
        <button
          className="text-sm text-gray-500 mt-105"
          onClick={handleClickWithdraw}
        >
          탈퇴하기
        </button>
      </div>

      {accessToken && showModal && createPortal(
        <DeleteModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />,
        document.body
      )}
    </aside>
  );
};

export default Sidebar;
