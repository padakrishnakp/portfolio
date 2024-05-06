import React, { useState } from 'react';
import SectionTitle from '../component/SectionTitle';
import { projects } from '../resource/resource';
import projectImage from '../img/pro1.jpeg'; // Import the image

const Project = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    return (
        <div>
            <SectionTitle title="Project" />

            <div className="flex gap-10 py-10 sm:flex-col">
                <div className="flex flex-col w-1/3 gap-5 sm:flex-row sm:overflow-scroll sm:w-full">
                    {projects.map((ex, index) => (
                        <div
                            key={index} 
                            onClick={() => {
                                setSelectedItemIndex(index);
                            }}
                            className="cursor-pointer"
                        >
                            <h1 className={`text-xl ${selectedItemIndex === index ? 'text-tertiary' : 'text-white'}`}>{ex.Project_name}</h1>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <img src={projectImage} alt="Project Image" className="mr-8 h-60 w-45" /> {/* Use the imported image */}
                        <div>
                            <h1 className="text-2xl text-secondary">{projects[selectedItemIndex].Project_name}</h1>
                            <h1 className="text-xl text-2xl text-tertiary">{projects[selectedItemIndex].Roll}</h1>
                            <p className="text-white">{projects[selectedItemIndex].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
