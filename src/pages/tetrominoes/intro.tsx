import { useState } from "react";
import { TetrominoesGrid } from "../../components/grid/grid";
import "./intro.css";

export const IntroPage: React.FC = () => {
  const [dropLoading, setDropLoading] = useState(true);

  return (
    <div className="intro-page">
      <TetrominoesGrid
        onDropEnd={() => {
          setDropLoading(false);
          console.log("Drop ended");
        }}
        onDropStart={() => {
          setDropLoading(true);
          console.log("Drop started");
        }}
      />
      {dropLoading}
    </div>
  );
};
