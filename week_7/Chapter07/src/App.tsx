import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GooleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";

const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
      {
        path: "lp/:lpId",
        element: <LpDetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;