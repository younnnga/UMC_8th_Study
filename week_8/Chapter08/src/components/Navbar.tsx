import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth >= 768);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { accessToken, user, logout } = useAuth();
  const navigate = useNavigate();

  // 화면 크기에 따라 사이드바 기본 열림/닫힘
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 외부 클릭(사이드바나 토글 버튼 바깥) 시 사이드바 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        sidebarOpen &&
        sidebarRef.current &&
        toggleRef.current &&
        !sidebarRef.current.contains(target) &&
        !toggleRef.current.contains(target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* 네비바 */}
      <nav className="bg-neutral-900 text-white px-4 py-3 flex items-center justify-between fixed w-full z-50">
        <div className="flex items-center space-x-4">
          {/* 토글 버튼: 클릭할 때만 toggleSidebar 호출 */}
          <button ref={toggleRef} onClick={toggleSidebar} className="text-white">
            <Menu size={24} />
          </button>

          <Link to="/" className="text-pink-500 text-2xl font-bold">
            돌려돌려LP판
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/search">
            <Search className="text-white" size={20} />
          </Link>
          {accessToken ? (
            <>
              <span className="text-white font-medium">
                {user?.name}님 반갑습니다.
              </span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-pink-400"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-pink-400">
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 text-white px-3 py-1 font-semibold hover:bg-pink-600"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* 사이드바 */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar isOpen ={sidebarOpen} />
      </div>
    </>
  );
};

export default Navbar;
