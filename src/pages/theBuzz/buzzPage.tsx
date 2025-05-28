import { TetrominoesGrid } from "../../components/grid/grid";
import { PageContext } from "../../context";
import "./buzzPage.css";

export const BuzzPage: React.FC = () => {
  return (
    <PageContext.Provider
      value={{
        excitementLevel: "normal",
      }}
    >
      <div className="buzz-page">
        <TetrominoesGrid
          onAnimationStart={() => {
            console.log("Buzz grid started");
          }}
          onAnimationFinish={() => {
            console.log("Buzz grid started");
          }}
        />
      </div>
    </PageContext.Provider>
  );
};
