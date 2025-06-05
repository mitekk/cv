import { useState } from "react";
import { Outlet } from "react-router-dom";
import { WavesGrid } from "../../components/grid";
import { PageContext } from "../../context";
import "./buzzPage.css";
import { Navbar } from "../../components/navbar/navbar";

export const BuzzPage: React.FC = () => {
  const [gridLoaded, setGridLoaded] = useState(false);
  return (
    <PageContext.Provider value={{}}>
      <div>
        <WavesGrid onAnimationFinish={() => setGridLoaded(true)} />
        {gridLoaded && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Navbar />
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </PageContext.Provider>
  );
};
