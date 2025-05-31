import React, { useState } from "react";
import { Dropdown } from "../UI/dropdown";
import { GAME_MODE_OPTIONS } from "../../constants";
import type { GameMode } from "../../types";
import "./header.css";

export const Header: React.FC<{
  gameMode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  onReload?: () => void;
}> = ({ gameMode, onModeChange = () => {}, onReload = () => {} }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <header
      className={`absolute top-0 left-auto z-[3] w-fit transition-all duration-500 ${
        hovered ? "h-12 opacity-90" : "h-8 opacity-50"
      } select-none`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
    >
      <div
        className={`min-w-80 flex items-center h-full px-5 rounded-b-lg bg-gray-800 text-white transition-all duration-500 shadow-lg text-lg font-bold`}
      >
        {/* <div
          className={`
            absolute
            header-arrow flex-1 flex items-center justify-center text-yellow-300 text-2xl transition-opacity duration-500 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          ▾
        </div> */}
        <div
          className={`flex-1 flex items-center ${
            hovered ? "opacity-90" : "opacity-0"
          } duration-500`}
        >
          <Dropdown
            className="flex-1"
            title={gameMode}
            selected={gameMode}
            options={GAME_MODE_OPTIONS}
            onSelect={(option) => onModeChange(option as GameMode)}
          />
          <div
            className="header-nav-text cursor-pointer px-4"
            onClick={onReload}
          >
            ↺
          </div>
        </div>
      </div>
    </header>
  );
};
