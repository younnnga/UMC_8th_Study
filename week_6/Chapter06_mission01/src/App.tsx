import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomeLayout from './layouts/HomeLayout';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GooleLoginRedirectPage from './pages/GooleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './pages/LpDetailPage';

const publicRoutes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'v1/auth/google/callback', element: <GooleLoginRedirectPage /> },
      { path: 'lp/:lpid', element: <LpDetailPage /> },
    ],
  },
];

const protectedRoutes = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { path: 'my', element: <MyPage /> },
    ],
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 상태 초기화
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // 다크모드 토글
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode ? 'true' : 'false');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className={isDarkMode ? 'dark' : ''}>
          {/* 배경색 및 글자색 다크모드 적용 */}
          <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {/* 다크모드 토글 버튼 */}
            <button
              onClick={toggleDarkMode}
              className="p-2 fixed top-4 right-4 z-10 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
            >
              {isDarkMode ? '🌙 다크' : '☀️ 라이트'}
            </button>

            <RouterProvider router={createBrowserRouter([...publicRoutes, ...protectedRoutes])} />
          </div>
        </div>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
