/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // 다크 모드를 class 기반으로 활성화
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',   // 라이트 모드 배경
          dark: '#1a202c',    // 다크 모드 배경
        },
        text: {
          light: '#333333',   // 라이트 모드 텍스트
          dark: '#f5f5f5',    // 다크 모드 텍스트
        },
      },
    },
  },
  plugins: [],
}
