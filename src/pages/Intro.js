import React, { useState, useEffect } from "react";

const Intro = () => {
  const [homeList, setHomeList] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/home/homeView");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setHomeList(data.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (homeList.length > 0) {
      interval = setInterval(() => {
        const currentText = homeList[currentTextIndex].input_typing[currentSentenceIndex];
        if (typedText.length < currentText.length) {
          setTypedText(currentText.substring(0, typedText.length + 1));
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (currentSentenceIndex < homeList[currentTextIndex].input_typing.length - 1) {
              setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
              setTypedText('');
            } else {
              setCurrentSentenceIndex(0);
              setCurrentTextIndex((prevIndex) =>
                prevIndex === homeList.length - 1 ? 0 : prevIndex + 1
              );
              setTypedText('');
            }
          }, 1000);
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [currentTextIndex, homeList, typedText, currentSentenceIndex]);

  return (
    <div className='h-[80vh] bg-primary flex flex-col items-start justify-center gap-5 py-10'>
      <div className="h-24 p-6 overflow-hidden rounded-lg shadow-lg w-96"> 
        <h1 className='text-white'>I, am</h1>
        <h1 className='text-3xl font-semibold text-tertiary'>{typedText}</h1>
      </div>
      {homeList.length > 0 && (
        <>
          <p className='w-2/3 text-white'>{homeList[0].description}</p>
          <button className='px-10 py-3 text-white border-2 rounded border-tertiary hover:bg-forever hover:text-primary'>Get Started</button>
        </>
      )}
    </div>
  );
}

export default Intro;
