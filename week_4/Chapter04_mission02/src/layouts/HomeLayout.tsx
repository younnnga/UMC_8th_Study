import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 bg-neutral-900">
        <div className="text-pink-500 font-bold text-lg">돌려돌려LP판</div>
        <div className="space-x-4">
          <button className="bg-black text-white hover:text-pink-400 px-4 py-1 rounded">로그인</button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded">
            회원가입
          </button>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-sm text-neutral-500">
        푸터
      </footer>
    </div>
  );
};

export default HomeLayout;

