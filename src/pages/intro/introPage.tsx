import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Prompter } from "../../components/prompter/prompter";
import { PromptLines } from "../../assets/prompts";
import { Avatar, Button } from "../../components/UI";
// import avatarImg from "../../assets/avatar.png";
// import avatarImg from "../../assets/mitya.jpg";
import avatarImg from "../../assets/mitya2.png";
import { LayoutContext } from "../../context/layout";
import {
  GameOfLifeGrid,
  RoadTripGrid,
  TetrominoesGrid,
} from "../../components/grid";
import "./introPage.css";

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [dropFinished, setDropFinished] = useState(false);
  const [promptFinished, setPromptFinished] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const { dims, gameMode } = useContext(LayoutContext);

  return (
    <>
      {gameMode === "Road Trip" && (
        <RoadTripGrid
          onAnimationStart={() => {
            setDropFinished(false);
            setIntroFinished(false);
          }}
          onAnimationFinish={() => {
            setDropFinished(true);
          }}
          removeTiles={introFinished}
        />
      )}

      {gameMode === "Tetris" && (
        <TetrominoesGrid
          onAnimationStart={() => {
            setDropFinished(false);
            setIntroFinished(false);
          }}
          onAnimationFinish={() => {
            setDropFinished(true);
          }}
          removeTiles={introFinished}
        />
      )}

      {gameMode === "Game of Life" && (
        <GameOfLifeGrid
          onAnimationStart={() => {
            setDropFinished(false);
            setIntroFinished(false);
          }}
          onAnimationFinish={() => {
            setDropFinished(true);
          }}
          removeTiles={introFinished}
        />
      )}

      {dropFinished && !introFinished && (
        <div
          className={`w-full h-screen z-[2] flex flex-col justify-center items-center absolute top-0 left-0 m-0 mx-auto intro-overlay${
            introFinished ? " intro-animate-out" : ""
          }`}
        >
          <div className="flex flex-row items-center">
            {promptFinished && (
              <div className="flex flex-col h-full avatar-animate-in">
                <Avatar
                  src={avatarImg}
                  className="flex items-center flex-1 saturate-100"
                />
                <div className="min-h-24"></div>
              </div>
            )}
            <div
              className={`intro-text flex flex-col justify-center items-center${
                promptFinished ? " prompt-animate-in" : ""
              }`}
            >
              <Prompter
                prompt={{ lines: PromptLines.intro }}
                onAnimationStart={() => setPromptFinished(false)}
                onAnimationFinish={() => setPromptFinished(true)}
              />
              {promptFinished && (
                <div className="intro-action self-start mt-5 min-h-24 button-animate-in">
                  <Button
                    title="Get to know me"
                    onClick={() => {
                      setIntroFinished(true);
                      setTimeout(
                        () => {
                          navigate("/theBuzz");
                        },
                        gameMode === "Tetris" ? dims.cols * dims.cols * 2 : 500
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
