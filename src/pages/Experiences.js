import React, { useEffect, useState } from "react";
import SectionTitle from "../component/SectionTitle";

const Experiences = () => {
  const [experiences, setExperiences] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/experiences/experiencesView"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setExperiences(data.experiences_view); // Corrected to data.experiences
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  return (
    <div>
      <SectionTitle title="Experiences" />

      <div className="relative z-10 flex gap-10 py-10 sm:flex-col">
        {experiences && (
          <div className="flex flex-col w-1/3 gap-5 sm:flex-row sm:overflow-scroll sm:w-full">
            {experiences.map((ex, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl ${
                    selectedItemIndex === index ? "text-tertiary" : "text-white"
                  }`}
                >
                  {ex.joying_dated}-{ex.last_dated}
                </h1>
              </div>
            ))}
          </div>
        )}

        {experiences && (
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl text-secondary">
              {experiences[selectedItemIndex].company_name}
            </h1>
            <h1 className="text-xl text-2xl text-tertiary">
              {experiences[selectedItemIndex].roll}
            </h1>
            <p className="text-white">
              To fix the LottiePlayer component correctly based on the available
              exports. You can do this by importing it like this:
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
