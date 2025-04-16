const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center text-white p-10 bg-opacity-70 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn">404</h1>
        <p className="text-2xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          페이지를 찾을 수 없습니다!
        </p>
        <p className="text-xl animate__animated animate__fadeIn animate__delay-2s">
          요청한 페이지는 삭제되었거나, 이동했을 수 있습니다. <br />
          다시 시도하거나 다른 경로로 이동해 보세요.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
