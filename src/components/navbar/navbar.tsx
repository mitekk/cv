import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../UI";
import avatarImg from "../../assets/mitya2.png";
import email from "./../../assets/email.svg";
import github from "./../../assets/github.svg";
import linkedin from "./../../assets/linkedin.svg";

const emailUrl = "mitekk@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/mitya-kurs-8b058452/";
const githubUrl = "https://github.com/mitekk";

export const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("about");

  return (
    <nav className="relative flex justify-center items-center w-80 h-full ">
      <div className="absolute inset-0 m-[20px] p-8 max-h-200 flex flex-col  bg-zinc-700 rounded-xl">
        <div
          className="flex flex-col justify-between h-full max-h-200"
          style={{ userSelect: "none" }}
        >
          <div className="flex-1 py-2">
            <Avatar
              src={avatarImg}
              className="flex items-center flex-1 saturate-100 h-25 w-25"
            />
            <div className="flex flex-col">
              <span className="text-3xl">Mitya Kurs</span>
              <span>Fullstack developer</span>
            </div>
          </div>
          <div className="flex-1  py-2">
            <ul className="nav-links flex flex-col h-full min-w-fit justify-around">
              <li onClick={() => setActiveLink("about")}>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row justify-center w-5">
                    {activeLink === "about" && (
                      <div className="pt-1 text-xs">➜</div>
                    )}
                  </div>
                  <Link to="about" className="nav-link">
                    about
                  </Link>
                </div>
              </li>
              <li onClick={() => setActiveLink("skills")}>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row justify-center w-5">
                    {activeLink === "skills" && (
                      <div className="pt-1 text-xs">➜</div>
                    )}
                  </div>
                  <Link to="skills" className="nav-link">
                    skills
                  </Link>
                </div>
              </li>
              <li onClick={() => setActiveLink("experience")}>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row justify-center w-5">
                    {activeLink === "experience" && (
                      <div className="pt-1 text-xs">➜</div>
                    )}
                  </div>
                  <Link to="experience" className="nav-link">
                    experience
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col justify-end h-full py-2 gap-1">
            <a
              href={`mailto:${emailUrl}?subject=Hi%20Mitya&body=How%20are%20you%3F`}
              className="flex flex-row gap-2"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="flex flex-row justify-center w-5">
                <img src={email} alt="email" draggable={false} />
              </div>
              <span>{emailUrl}</span>
            </a>
            <div
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => window.open(linkedinUrl, "_blank")}
            >
              <div className="flex flex-row justify-center w-5">
                <img src={linkedin} alt="linkedin" draggable={false} />
              </div>
              <span>linkedin</span>
            </div>
            <div
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <div className="flex flex-row justify-center w-5">
                <img src={github} alt="github" draggable={false} />
              </div>
              <span>github</span>
            </div>
            <div
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <div className="flex flex-row justify-center w-5">
                <img src={github} alt="github" draggable={false} />
              </div>
              <span>download CV</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
