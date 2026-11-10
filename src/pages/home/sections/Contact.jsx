import HeaderThree from "../../../components/HeaderThree";
import SectionTwo from "../../../components/SectionTwo";

function Contact() {
  const contactPlatformList = [
    { "name": "LinkedIn" },
    { "name": "Gmail" },
    { "name": "GitHub" }
  ];

  return (
    <SectionTwo id="contact">
      <div className="flex flex-col items-center gap-11">
        <HeaderThree>        Let's connect! :)</HeaderThree>
        <p>Contact details are hidden in this anonymised student demo.</p>
        <div className="flex items-center justify-center gap-[50px] md:gap-[100px]">
          {contactPlatformList.map((contactPlatform, index) => (
            <button
              key={index}
              type="button"
              className="flex flex-col items-center gap-2"
              aria-label={`${contactPlatform.name} demo (no navigation)`}
              title="Demo only - no external link"
            >
              <img
                className="w-[50px] h-[50px] md:w-[75px] md:h-[75px] aspect-square filter grayscale hover:grayscale-0 transition-all duration-300 
                shadow-lg hover:shadow-2xl transform hover:-translate-y-2 rounded-lg"
                src={`${process.env.PUBLIC_URL}/${contactPlatform.name}-Logo.png`}
                alt={`${contactPlatform.name} logo`}
              />
              <span>{contactPlatform.name} (demo)</span>
            </button>
          ))}
        </div>
      </div>
    </SectionTwo>
  );
}

export default Contact;
