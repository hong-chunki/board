/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Next.js app 디렉토리 내 모든 JS/TS 파일 검사
    './components/**/*.{js,ts,jsx,tsx}', // 컴포넌트 폴더 내 파일도 검사
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3', // 커스텀 색상 추가 가능
      },
    },
  },
  plugins: [],
};
