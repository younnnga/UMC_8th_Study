import { useEffect, useState } from 'react';
import useTrottle from '../hooks/useTrottle';

const ThrottlePage = () => {
  const[scrollY,setScrollY] = useState<number>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useTrottle(() => {
    setScrollY(window.scrollY);
  },2000);

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll);
  },[handleScroll]);

  console.log("리렌더링")

  return (
    <div className='h-dvh flex flex-col items-center justify-center'>
      <div>
        <h1>쓰로틸링이 무엇일까요?</h1>
          <p>ScrollY: {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage