import HeaderThree from "../../../components/HeaderThree";
import SectionTwo from "../../../components/SectionTwo";

function Contact() {
  const contactPlatformList = [
    { "name": "LinkedIn", "link": "https://www.linkedin.com/in/saanviyerawar/" },
    { "name": "Gmail", "link": "mailto:saanvi.yerawar@gmail.com" },
    { "name": "GitHub", "link": "https://github.com/saanviyerawar" }
  ];

  return (
    <SectionTwo id="contact">
      <div className="flex flex-col items-center gap-11">
        <HeaderThree>Feel free to contact me! :)</HeaderThree>
        <p>Email: saanvi.yerawar@gmail.com</p>
        <div className="flex items-center justify-center gap-[50px] md:gap-[100px]">
          {contactPlatformList.map((contactPlatform, index) => (
            <a href={contactPlatform.link} key={index} target="_blank" rel="noopener noreferrer">
              <img
                className="w-[50px] h-[50px] md:w-[75px] md:h-[75px] aspect-square filter grayscale hover:grayscale-0 transition-all duration-300 
                shadow-lg hover:shadow-2xl transform hover:-translate-y-2 rounded-lg"
                src={`${process.env.PUBLIC_URL}/${contactPlatform.name}-Logo.png`}
                alt={`${contactPlatform.name} logo`}
              />
            </a>
          ))}
        </div>
      </div>
    </SectionTwo>
  );
}

export default Contact;
