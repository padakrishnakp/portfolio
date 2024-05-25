import React from "react";
import Header from "../component/Header";
import Intro from "./Intro";
import About from "./About";
import Experiences from "./Experiences.js";
import Project from "./Project.js";
import { SparklesCore } from "../ui/sparkles.tsx"; 

const Home = () => {
  return (
    <div>
      <div className="relative z-10"> 
        <Header />
      </div>
      <SparklesCore
        id="homeSparkles" 
        background="transparent"
        minSize={1.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0 z-0" 
        particleColor="#FFFFFF"
      />
      <div className="px-40 bg-primary sm:px-5">
        <Intro />
        <About/>
        <Experiences/>
        <Project/>
      </div>
    </div>
  );
};

export default Home;
