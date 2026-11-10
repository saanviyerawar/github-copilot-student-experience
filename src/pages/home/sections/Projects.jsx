import HeaderThree from "../../../components/HeaderThree";
import HeaderTwo from "../../../components/HeaderTwo";
import ProjectSquare from "../../../components/ProjectSquare";
import SectionOne from "../../../components/SectionOne";

function Projects () {

  const projectList = [
    { title: "Capital W Website", image: "CapitalW", shadow: true, skills: ["Product", "Figma", "React", "HTML", "CSS"], description: ["Spearheaded the development of UNSW Capital W's official website as Product Manager, for the largest women in business society at UNSW", "Directed product development and strategy using HTML, JavaScript, and CSS", "Achieved a 25% increase in engagement, with the website reaching 5,000+ members, sponsors and affiliates"]},
    {title: "Flizzle", image: "Flizzle", shadow: true, skills: ["Python", "Product", "React", "Javascript", "Figma"], description: ["Co-founded Flizzle, an AI-powered Quizlet-style platform providing personalized, adaptive learning experiences for neurodivergent children", "Developed an MVP using Python, React, JavaScript, and AI/ML techniques", "Concept was part of UNSW Founder's New Wave Cohort (top 10 pitches)"]},
    {title: "NRL Predictive Modeling", image: "NRL", shadow: true, skills: ["Python","SQL","PowerBI"], description: ["Developed a data science project focused on predicting and analyzing key game metrics for NRL events", "The project provides insights into match strategies and real-time decision-making by predicting play-the-ball speed and game intensity", "Built regression and XGBoost models using Python libraries (Pandas, Scikit-learn, XGBoost, Matplotlib) and machine learning techniques"]},
    {title: "Style Sphere", image: "StyleSphere", shadow: true, skills: ["Product","Figma"], description: ["Style Sphere is an AI-powered online artisan marketplace that helps consumers visualize products on themselves and offers personalized recommendations, while providing valuable data insights to sellers.", "Achieved HD in UNSW's Digital Transformation in Business subject", "Led a team of 5 as the product manager to develop and design the product prototype on Figma"]}
  ];

  return (
    <SectionOne id="projects">
      <div className="flex flex-col items-center gap-11">
        <HeaderTwo>
          Projects.
        </HeaderTwo>
        <HeaderThree className="text-center md:text-left">
          Here are some projects I have worked on, including both technical and non-technical.
        </HeaderThree>
        <p className="self-start">Click on one of the boxes to learn more!</p>
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