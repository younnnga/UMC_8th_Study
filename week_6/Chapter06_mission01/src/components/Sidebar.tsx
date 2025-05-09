import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 z-30 pt-16`} // 네비바 높이만큼 위 여백
    >
      <div className="px-6">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <Search size={18} />
            <Link to="/search" className="text-white">
              찾기
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <User size={18} />
            <Link to="/mypage" className="text-white">
              마이페이지
            </Link>
          </li>
        </ul>
      </div>

      {/* 하단 중앙 정렬 탈퇴하기 */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <button className="text-sm text-gray-400 hover:text-red-500">
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
