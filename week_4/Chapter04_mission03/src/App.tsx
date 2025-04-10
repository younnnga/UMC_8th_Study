import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomeLayout from './layouts/HomeLayout';
import MyPage from './pages/MyPage';
;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      { index:true, element:<Homepage/>},
      { path:"login", element:<LoginPage />},
      { path:"SignupPage", element:<SignUpPage/>},
      { path:"my", element:<MyPage/>}]
  },
]);

function App() {
  return ( 
    <RouterProvider router={router}/>
  )
}

export default App
