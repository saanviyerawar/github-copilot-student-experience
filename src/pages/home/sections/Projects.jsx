import HeaderThree from "../../../components/HeaderThree";
import HeaderTwo from "../../../components/HeaderTwo";
import ProjectSquare from "../../../components/ProjectSquare";
import SectionOne from "../../../components/SectionOne";

function Projects () {

  const projectList = [
    {title: "CS1101 project", shadow: true, skills: ["Python"], description: ["Introduction to programming: a command-line task tracker", "Practised functions, loops and basic data structures", "Added input validation and tests for common scenarios"]},
    {title: "CS2101 project", shadow: true, skills: ["React", "Javascript", "HTML", "CSS"], description: ["Web development: a responsive student study planner", "Built reusable components to organise tasks and deadlines", "Practised accessible forms and responsive layouts"]},
    {title: "CS2201 project", shadow: true, skills: ["SQL", "Python"], description: ["Databases: a sample library management system", "Designed tables and relationships for books and loans", "Wrote queries and tested them with fictional records"]},
    {title: "CS3101 project", shadow: true, skills: ["Python", "SQL", "PowerBI"], description: ["Data analysis: an exploratory report using a sample dataset", "Cleaned records and created charts to explain patterns", "Documented the analysis steps and limitations"]}
  ];

  return (
    <SectionOne id="projects">
      <div className="flex flex-col items-center gap-11">
        <HeaderTwo>
          Projects.
        </HeaderTwo>
        <HeaderThree className="text-center md:text-left">
          Illustrative course projects for this student demo. Course codes, subjects and project details are fictional examples.
        </HeaderThree>
        <p className="self-start">Hover over one of the boxes to learn more!</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-[25px] lg:gap-[50px] xl:gap-[100px] sm:p-[50px] md:p-[75px] lg:p-0">
          {projectList.map((project, index) => {
            return <ProjectSquare project={project} key={`project-${index}`} />
          })}
        </div>
      </div>
    </SectionOne>
  );
}

export default Projects;