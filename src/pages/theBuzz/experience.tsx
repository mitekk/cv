import { SectionLayout } from "../../layout/section.layout";

export const Experience: React.FC = () => {
  const experience = [
    {
      company: "Clarity",
      position: "Fullstack Team Lead",
      duration: "2023-2025",
      technologies: [
        "AWS",
        "Serverless",
        "Terraform",
        "Vue.js",
        "Node.js",
        "Apollo",
        "MongoDB",
      ],
      description: `Lorem ipsum dolor sit amet consectetur. Cursus eget justo vitae porta
      amet sagittis rutrum. Aliquet pretium amet erat velit tellus enim.
      Gravida non elit hendrerit eget purus enim non adipiscing. Adipiscing
      porta convallis eu risus id pretium porta. Integer euismod mattis
      morbi.`,
    },
    {
      company: "Daytwo",
      position: "Fullstack Team Lead",
      duration: "2018-2023",
      technologies: ["GCP", "AWS", "CDK", "React", "Node.js", "mySQL"],
      description: `Lorem ipsum dolor sit amet consectetur. Cursus eget justo vitae porta
      amet sagittis rutrum. Aliquet pretium amet erat velit tellus enim.
      Gravida non elit hendrerit eget purus enim non adipiscing. Adipiscing
      porta convallis eu risus id pretium porta. Integer euismod mattis
      morbi.`,
    },
    {
      company: "Softwave",
      position: "Fullstack Dev",
      duration: "2016-2018",
      technologies: ["Azure", "Angular", "React", ".Net Core", "SQL"],
      description: `Lorem ipsum dolor sit amet consectetur. Cursus eget justo vitae porta
      amet sagittis rutrum. Aliquet pretium amet erat velit tellus enim.
      Gravida non elit hendrerit eget purus enim non adipiscing. Adipiscing
      porta convallis eu risus id pretium porta. Integer euismod mattis
      morbi.`,
    },
    {
      company: "Eternity",
      position: "Fullstack Dev",
      duration: "2015-2016",
      technologies: ["Azure", "Angular.js", "C#", "SQL"],
      description: `Lorem ipsum dolor sit amet consectetur. Cursus eget justo vitae porta
      amet sagittis rutrum. Aliquet pretium amet erat velit tellus enim.
      Gravida non elit hendrerit eget purus enim non adipiscing. Adipiscing
      porta convallis eu risus id pretium porta. Integer euismod mattis
      morbi.`,
    },
    {
      company: "Qpoint",
      position: "Fullstack Dev",
      duration: "2014-2015",
      technologies: ["Javascript", "HTML", "CSS", "ASP.Net", "C#", "SQL"],
      description: `Lorem ipsum dolor sit amet consectetur. Cursus eget justo vitae porta
      amet sagittis rutrum. Aliquet pretium amet erat velit tellus enim.
      Gravida non elit hendrerit eget purus enim non adipiscing. Adipiscing
      porta convallis eu risus id pretium porta. Integer euismod mattis
      morbi.`,
    },
    {
      company: "Bynet",
      position: "Fullstack Dev",
      duration: "2012-2014",
      technologies: ["Javascript", "HTML", "CSS", "ASP.Net", "C#"],
      description: `Lorem ipsum dolor sit amet consectetur. Cursus eget justo vitae porta
      amet sagittis rutrum. Aliquet pretium amet erat velit tellus enim.
      Gravida non elit hendrerit eget purus enim non adipiscing. Adipiscing
      porta convallis eu risus id pretium porta. Integer euismod mattis
      morbi.`,
    },
  ];

  return (
    <SectionLayout>
      <div style={{ color: "#333332" }} className="flex flex-col h-full gap-5">
        {experience.map((exp) => (
          <div key={exp.company}>
            <div className="gap-1">
              <div className="text-xl font-bold">
                {exp.company}, tlv — {exp.position}
              </div>
              <div className="text-lg">{exp.duration}</div>
            </div>
            <div className="flex text-lg gap-2">
              {exp.technologies.map((tech) => (
                <div key={tech}>{tech}</div>
              ))}
            </div>
            <div className="text-base mt-2">{exp.description}</div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
