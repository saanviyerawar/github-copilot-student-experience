import DescriptionCard from "./DescriptionCard";
import HeaderThree from "./HeaderThree";

function WorkExperienceDescription ({ workExperience }) {
  const information = workExperience?.information;

  return (
    <div className="w-[100%] h-[100%] p-6 flex flex-col content-between gap-2 md:gap-7">
      <div className="flex flex-col lg:flex-row items-center gap-3 md:gap-9 lg:gap-11">
        <p className="h-[80px] flex items-center justify-center text-center font-semibold">
          {information.company}
        </p>
        <HeaderThree className="text-center lg:text-left">{information.title}</HeaderThree>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-10 h-[100%]">
        {information.description.map((description, index) => (
          <DescriptionCard description={description} borderColour={workExperience.colour} key={`workExperienceDescription-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default WorkExperienceDescription;