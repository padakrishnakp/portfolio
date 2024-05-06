import { useMemo, useState, useEffect } from "react";

const Intro = () => {
  
  const [typedText, setTypedText] = useState('');
  const targetTexts = useMemo(() => ['Find Your Favorite', 'Welcome to your home', 'krishna','MERN Stack'], []);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= targetTexts[currentTextIndex].length) {
        setTypedText(targetTexts[currentTextIndex].slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentTextIndex((prevIndex) =>
            prevIndex === targetTexts.length - 1 ? 0 : prevIndex + 1
          );
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentTextIndex, targetTexts]);

  return (
    <div className='h-[80vh] bg-primary flex flex-col items-start justify-center gap-5 py-10'>
      <div className="h-24 p-6 overflow-hidden rounded-lg shadow-lg w-96"> 
      <h1 className='text-white'>I, am</h1>
        <h1 className='text-3xl font-semibold text-tertiary'>{typedText}</h1>
      </div>
      <p className='w-2/3 text-white'>Try upgrading the versions of React and React Router DOM. Sometimes, compatibility issues</p>
      <button className='px-10 py-3 text-white border-2 rounded border-tertiary hover:bg-forever hover:text-primary'>Get Started</button>
    </div>
  );
}

export default Intro;
