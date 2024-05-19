import React, { useEffect, useState } from "react";
import SectionTitle from "../component/SectionTitle";
import video from "../img/videoj.mp4";

const About = () => {
  const [list_data, setList_data] = useState(null);
  const [skill, setSkill] = useState([]);
  const [skill_title, setSkill_title] = useState("");

  useEffect(() => {
    fetchAboutList();
    skillView();
  }, []);

  const fetchAboutList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/about/view');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setList_data(data.data); // Set list_data correctly
    } catch (error) {
      console.error('Error fetching about list:', error);
    }
  };

  const skillView = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/skill/skillView');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("SSSSSSSSSSSSSSSSSSSS", data);
      if (data.skill_view.length > 0) {
        setSkill_title(data.skill_view[0].title);
        setSkill(data.skill_view[0].skills);
      }
    } catch (e) {
      console.error('Error fetching skill list:', e);
    }
  };

  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex items-center w-full sm:flex-col">
        <video className="mr-8 h-60 w-45" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>

        <div className="flex flex-col w-1/2 gap-1 sm:w-full">
          {list_data && (
            <p className="text-white">
              {list_data.description}
            </p>
          )}
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-2xl text-tertiary">
          {skill_title}
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
