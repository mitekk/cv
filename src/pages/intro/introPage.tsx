import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TetrominoesGrid } from "../../components/grid/grid";
import { Prompter } from "../../components/prompter/prompter";
import { PromptLines } from "../../assets/prompts";
import { Avatar, Button } from "../../components/UI";
// import avatarImg from "../../assets/avatar.png";
// import avatarImg from "../../assets/mitya.jpg";
import avatarImg from "../../assets/mitya2.png";
import "./introPage.css";

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [dropFinished, setDropFinished] = useState(true);
  const [promptFinished, setPromptFinished] = useState(false);

  return (
    <div className="intro-page">
      <TetrominoesGrid
        onStart={() => {
          setDropFinished(false);
        }}
        onFinish={() => {
          setDropFinished(true);
        }}
      />
      {dropFinished && (
        <div className="w-full h-screen z-[2] flex flex-col justify-center items-center absolute top-0 left-0 m-0 mx-auto">
          <div className="flex flex-row items-center w-fit">
            <div
              className={`flex flex-col h-full avatar-slide${
                promptFinished ? " show" : ""
              }`}
            >
              <Avatar
                src={avatarImg}
                className="flex items-center flex-1 saturate-100"
              />
              <div className="min-h-24"></div>
            </div>
            <div className="intro-text flex flex-col justify-center items-center">
              <Prompter
                prompt={{ lines: PromptLines.intro }}
                onStart={() => setPromptFinished(false)}
                onFinish={() => setPromptFinished(true)}
              />
              <div
                className={`intro-action self-start mt-5 min-h-24 button-slide${
                  promptFinished ? " show" : ""
                }`}
              >
                <Button
                  title="Get to know me"
                  onClick={() => navigate("/theBuzz")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
