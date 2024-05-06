import React, { useState } from "react";
import SectionTitle from "../component/SectionTitle";
import { experiences } from "../resource/resource.js";

const Experiences = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <div>
    
      <SectionTitle title="Experiences" />

      <div className="relative z-10 flex gap-10 py-10 sm:flex-col"> 
        <div className="flex flex-col w-1/3 gap-5 sm:flex-row sm:overflow-scroll sm:w-full">
          {experiences.map((ex, index) => (
            <div
              key={index} 
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1 className={`text-xl ${selectedItemIndex === index ? 'text-tertiary' : 'text-white'}`}>{ex.period}</h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-2xl text-secondary">{experiences[selectedItemIndex].title}</h1>
          <h1 className="text-xl text-2xl text-tertiary">{experiences[selectedItemIndex].company}</h1>
          <p className="text-white">To fix the LottiePlayer component correctly based on the available exports. You can do this by importing it like this:</p>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
