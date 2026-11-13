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
    { colour: `${mode === "dark" ? "#9F3B47" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "-3deg", top: { default: "20px", sm: "30px", md: "40px", lg: "50px" }, information: { title: "Software intern", company: "Company A", description: ["Helped build and test small application features", "Collaborated with a team through code reviews and documentation"]}},
    { colour: `${mode === "dark" ? "#D37B44" : "#98CB3D"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "3deg", top: { default: "60px", sm: "90px", md: "120px", lg: "150px" }, information: { title: "Software intern", company: "Company B", description: ["Worked on a responsive web interface", "Practised debugging and writing reusable components"]}},
    { colour: `${mode === "dark" ? "#9F3B47" : "#97D7FF"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "5deg", top: { default: "100px", sm: "140px", md: "180px", lg: "220px" }, information: { title: "Software intern", company: "Company C", description: ["Supported data processing and reporting tasks", "Wrote scripts and checked results with sample datasets"]}},
    { colour: `${mode === "dark" ? "#D37B44" : "#98CB3D"}`, textColour: `${mode === "dark" ? "#FFFFFF" : "#000000"}`, rotate: "-5deg", top: { default: "140px", sm: "200px", md: "260px", lg: "320px" }, information: { title: "Software intern", company: "Company D", description: ["Contributed bug fixes to a team project", "Added tests and updated developer documentation"]}}
  ];

  return (
    <SectionTwo id="work-experience">
      <div className="flex flex-col md:flex-row gap-[50px] md:gap-[100px] justify-between h-auto">
        <div className="flex flex-col gap-11">
          <HeaderTwo className="text-center md:text-left">Work experience.</HeaderTwo>
          <HeaderThree className="text-center md:text-left">Four illustrative internships showing how a student could present their experience. Companies and responsibilities are fictional demo examples.</HeaderThree>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <div className="flex flex-col gap-[30vh] w-[80%] md:w-auto">
            {workExperienceList.map((workExperience, index) => (
              <WorkExperienceCard
                workExperience={workExperience}
                key={`workExperience-${index}`}
                onClick={() => setClickedWorkExperience(
                  clickedWorkExperience?.information?.company === workExperience.information.company
                    ? "" : workExperience
                )}
                selected={clickedWorkExperience?.information?.company === workExperience.information.company}
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
