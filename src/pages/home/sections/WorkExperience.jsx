import React, { useState, useContext } from "react";
import HeaderTwo from "../../../components/HeaderTwo";
import HeaderThree from "../../../components/HeaderThree";
import SectionTwo from "../../../components/SectionTwo";
import WorkExperienceCard from "../../../components/WorkExperienceCard";
import WorkExperienceModal from "../../../components/WorkExperienceModal";
import { ModeContext } from "../../../contexts/ModeProvider";

function WorkExperience() {
  const [clickedWorkExperience, setClickedWorkExperience] = useState("");
  const { mode } = useContext(ModeContext);
  
  const workExperienceList = [
    { colour: `${mode === "dark" ? "#9F3B47" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "-3deg", top: { default: "20px", sm: "30px", md: "40px", lg: "50px" }, information: { title: "Cloud & AI Platforms Specialist", company: "Microsoft", image: "Microsoft", description: [""]}},
    { colour: `${mode === "dark" ? "#D37B44" : "#98CB3D"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "3deg", top: { default: "60px", sm: "90px", md: "120px", lg: "150px" }, information: { title: "Solutions Architect Intern", company: "Amazon Web Services (AWS)", image: "AWS", description: [""]}},
    { colour: `${mode === "dark" ? "#9F3B47" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "5deg", top: { default: "100px", sm: "140px", md: "180px", lg: "220px" },  information: { title: "Chief of Staff", company: "Build Club", image: "BuildClub", description: [""]}},
    { colour: `${mode === "dark" ? "#D37B44" : "#98CB3D"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "-5deg", top: { default: "140px", sm: "200px", md: "260px", lg: "320px" }, information: { title: "Data Science & Analytics", company: "Atlassian", image: "Atlassian", description: [""]}},
    { colour: `${mode === "dark" ? "#9F3B47" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "5deg", top: { default: "180px", sm: "260px", md: "340px", lg: "420px"  },  information: { title: "Investment Intern | Venture Capital", company: "NAB Ventures", image: "NAB", description: [""]}},
    { colour: `${mode === "dark" ? "#B25754" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "5deg", top: { default: "220px", sm: "320px", md: "420px", lg: "520px"}, information: { title: "Data & Digital Transformation", company: "PwC", image: "PwC", description: [""] } },
    { colour: `${mode === "dark" ? "#D37B44" : "#98CB3D"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "-5deg", top: { default: "260px", sm: "380px", md: "500px", lg: "620px"}, information: { title: "Research Assistant", company: "UNSW School of Information Systems, Technology & Management", image: "UNSWSISTM", description: [""]}},
    { colour: `${mode === "dark" ? "#B25754" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "5deg", top: { default: "300px", sm: "440px", md: "580px", lg: "720px" },  information: { title: "Data Science Ambassador", company: "UNSW",  image: "UNSW", description: [""]}}
  ];

  return (
    <SectionTwo id="work-experience">
      <div className="flex flex-col md:flex-row gap-[50px] md:gap-[100px] justify-between h-auto">
        <div className="flex flex-col gap-11">
          <HeaderTwo className="text-center md:text-left">Work Experience.</HeaderTwo>
          <HeaderThree className="text-center md:text-left">I have gained valuable experience through internships at multiple organizations, where I have contributed to various projects and developed key skills.</HeaderThree>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <div className="flex flex-col gap-[30vh] w-[80%] md:w-auto">
            {workExperienceList.map((workExperience, index) => (
              <WorkExperienceCard
                workExperience={workExperience}
                key={`workExperience-${index}`}
                onClick={() => setClickedWorkExperience(
                  clickedWorkExperience?.information?.title === workExperience.information.title
                    ? "" : workExperience
                )}
                selected={clickedWorkExperience?.information?.title === workExperience.information.title}
              />
            ))}
          </div>
        </div>
      </div>
      <WorkExperienceModal
        workExperience={clickedWorkExperience}
        isOpen={!!clickedWorkExperience}
        onClose={() => setClickedWorkExperience("")}
      />
    </SectionTwo>
  );
}

export default WorkExperience;
