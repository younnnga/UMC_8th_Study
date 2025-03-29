
import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';

export default function ThemeContent() : JSX.Element {
  const { theme, toggleTheme } = useTheme();
    
  const isLightMode = theme === THEME.LIGHT;

  return ( 
    <div
      className={clsx(
        'p-4 h-dvh w-full', 
        isLightMode ? 'bg-white' : 'bg-gray-800'
      )}
    >
    <h1
      className={clsx(
        'text-wxl font-bold',
        isLightMode ? 'text-black' : 'text-white'
      )}
    >
      Theme Content
    </h1>
    <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>    
      안녕하세요 유엠씨 7th WeB 챌린저입니다.
    </p>
  </div>
  );
};
