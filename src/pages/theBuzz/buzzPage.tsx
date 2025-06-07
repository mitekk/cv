import { useState } from "react";
import { Outlet } from "react-router-dom";
import { WavesGrid } from "../../components/grid";
import { PageContext } from "../../context";
import { Navbar } from "../../components/navbar/navbar";

export const BuzzPage: React.FC = () => {
  const [gridLoaded, setGridLoaded] = useState(false);
  return (
    <PageContext.Provider value={{}}>
      <>
        <WavesGrid onAnimationFinish={() => setGridLoaded(true)} />
        {gridLoaded && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Navbar />
            <div className="flex-1 h-full">
              <Outlet />
            </div>
          </div>
        )}
      </>
    </PageContext.Provider>
  );
};
