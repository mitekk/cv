import { useState } from "react";
import { TetrominoesGrid } from "../../components/grid/grid";
import { Prompter } from "../../components/prompter/prompter";
import { PromptLines } from "../../assets/prompts";
import { Avatar, Button } from "../../components/UI";
// import avatarImg from "../../assets/avatar.png";
import avatarImg from "../../assets/mitya.jpg";
import "./intro.css";

export const IntroPage: React.FC = () => {
  const [dropFinished, setDropFinished] = useState(true);
  const [promptFinished, setPromptFinished] = useState(false);

  return (
    <div className="intro-page">
      <TetrominoesGrid
        onDropEnd={() => {
          setDropFinished(true);
        }}
        onDropStart={() => {
          setDropFinished(false);
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
              <Avatar src={avatarImg} className="flex items-center flex-1" />
              <div className="min-h-24"></div>
            </div>
            <div className="intro-text flex flex-col justify-center items-center">
              <Prompter
                prompt={{ lines: PromptLines.intro }}
                onFinish={() => setPromptFinished(true)}
              />
              <div
                className={`intro-action self-start mt-5 min-h-24 button-slide${
                  promptFinished ? " show" : ""
                }`}
              >
                <Button title="Get to know me" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
