import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='h-dvh flex flex-col'>
      <nav>네비게이션 바 입니다.</nav>
      <main className='flex-1'>
        <Outlet/>
      </main>
      <footer className='bg-gray-100 dark-bg-gray-900 py-6 mt-12'>
        <p>
          &copy;{new Date().getFullYear()} SpinningSpinning Dolipan. All rights reserved
        </p>
        </footer>
    </div>
  )
}

export default HomeLayout
