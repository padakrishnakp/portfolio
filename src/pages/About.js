import React from "react";
import SectionTitle from "../component/SectionTitle";
import pic from "../img/my_pic_-_Copy_100 (1).png"
import video from "../img/videoj.mp4"

const About = () => {
  console.log("ppppp",pic)
    const skill = [
        "javaScript",
        "React js",
        "Node js",
        "GraphQL"
      ]
  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex items-center w-full sm:flex-col">
            <video className="mr-8 h-60 w-45"  autoPlay muted loop>
            <source src={video} type="video/mp4"/>
          </video>
    

        <div className="flex flex-col w-1/2 gap-1 sm:w-full">

          <p className="text-white">
            To fix the LottiePlayer component correctly based on the available
            exports. You can do this by importing it like this:
          </p>
          <p className="text-white">
            To fix this, you should import the LottiePlayer component correctly
            based on the available exports. You can do this by importing it like
            this:
          </p>
          
        </div>
      </div>

      <div className="py-5">
      <h1 className="text-2xl text-tertiary">
      To fix the LottiePlayer component correctly based on the available exports. You can do this by importing it like this:
      </h1>

      <div className="flex flex-wrap gap-6 mt-5">
      
      {skill.map((skill, index) => (
          <div className="px-10 py-3 border border-tertiary" key={index}>
              <h1 className="text-tertiary">{skill}</h1>
          </div>
      ))}
  </div>


      </div>
    </div>
  );
};
export default About;
