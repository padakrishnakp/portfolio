import React, { useEffect, useState } from "react";
import SectionTitle from "../component/SectionTitle";

const About = () => {
  const [listData, setListData] = useState(null);
  const [skill, setSkill] = useState([]);
  const [skillTitle, setSkillTitle] = useState("");
  const [videoPath, setVideoPath] = useState("");

  useEffect(() => {
    fetchAboutList();
    skillView();
  }, []);

  const fetchAboutList = async () => {
    try {
      const storedSession = localStorage.getItem('session');
      if (!storedSession) throw new Error('No session found');
      const sessionData = JSON.parse(storedSession);
      const userId = sessionData?.userDetails?._id;
      if (!userId) throw new Error('User ID not found');

      const response = await fetch(`http://localhost:3001/api/v1/about/homeView/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('About data:', data);
      setListData(data.data); // Set listData correctly
      setVideoPath(data.data.about_video_path); // Set video path
    } catch (error) {
      console.error('Error fetching about list:', error);
    }
  };

  const skillView = async () => {
    try {
      const storedSession = localStorage.getItem('session');
      if (!storedSession) throw new Error('No session found');
      const sessionData = JSON.parse(storedSession);
      const userId = sessionData?.userDetails?._id;
      if (!userId) throw new Error('User ID not found');

      const response = await fetch(`http://localhost:3001/api/v1/skill/skillHomeView/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Skill data:', data);

      if (data.data && Array.isArray(data.data.skills) && data.data.skills.length > 0) {
        setSkillTitle(data.data.title);
        setSkill(data.data.skills);
      } else {
        setSkillTitle("No skills available");
        setSkill([]);
      }
    } catch (e) {
      console.error('Error fetching skill list:', e);
    }
  };

  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex items-center w-full sm:flex-col">
        {videoPath ? (
          <video className="mr-8 h-60 w-45" autoPlay muted loop>
            <source src={videoPath} type="video/mp4" />
          </video>
        ) : (
          <p>No video available</p>
        )}

        <div className="flex flex-col w-1/2 gap-1 sm:w-full">
          {listData && (
            <p className="text-white">
              {listData.description}
            </p>
          )}
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-2xl text-tertiary">
          {skillTitle}
        </h1>

        <div className="flex flex-wrap gap-6 mt-5">
          {skill.map((skillItem, index) => (
            <div className="px-10 py-3 border border-tertiary" key={index}>
              <h1 className="text-tertiary">{skillItem}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
