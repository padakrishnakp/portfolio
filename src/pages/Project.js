import React, { useState, useEffect } from 'react';
import SectionTitle from '../component/SectionTitle';
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";

const Project = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [list_data, setListData] = useState([]);

    useEffect(() => {
        fetchHomeList();
    }, []);

    const fetchHomeList = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/project/projectView');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setListData(data.view_list); // Corrected accessing the array
        } catch (error) {
            console.error('Error fetching about list:', error);
        }
    };

    return (
        <div>
            <SectionTitle title="Project" />

            <div className="flex gap-10 py-10 sm:flex-col">
                <div className="flex flex-col w-1/3 gap-5 sm:flex-row sm:overflow-scroll sm:w-full">
                    {list_data.map((ex, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectedItemIndex(index);
                            }}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center">
                                <h1 className={`text-xl ${selectedItemIndex === index ? 'text-tertiary' : 'text-white'}`}>{ex.project_name}</h1>
                                {selectedItemIndex === index && <FaPersonWalkingDashedLineArrowRight className="ml-2" style={{ color: 'silver' }} />}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <img src={list_data[selectedItemIndex]?.project_image} alt="Project Image" className="mr-8 h-60 w-45" /> {/* Use the imported image */}
                        <div>
                            <h1 className="text-2xl text-secondary">{list_data[selectedItemIndex]?.project_name}</h1>
                            <h1 className="text-xl text-2xl text-tertiary">{list_data[selectedItemIndex]?.Roll}</h1>
                            <p className="text-white">{list_data[selectedItemIndex]?.project_description}</p>
                            <a href={list_data[selectedItemIndex]?.project_url} className="text-white">{list_data[selectedItemIndex]?.project_url}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
