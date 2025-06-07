import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { WavesGrid } from "../../components/grid";
import { PageContext } from "../../context";
import { Navbar } from "../../components/navbar/navbar";

export const BuzzPage: React.FC = () => {
  const [gridLoaded, setGridLoaded] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (gridLoaded) {
      setTimeout(() => setNavbarVisible(true), 10);
    }
  }, [gridLoaded]);
  return (
    <PageContext.Provider value={{}}>
      <>
        <WavesGrid
          className="relative overflow-hidden filter animate-fadein"
          onAnimationFinish={() => setGridLoaded(true)}
        />
        {gridLoaded && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                navbarVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-20 opacity-0"
              }`}
            >
              <Navbar />
            </div>
            <div
              key={location.pathname}
              className="flex-1 h-full transition-opacity duration-700 opacity-0 animate-fadein mx-5"
            >
              <Outlet />
            </div>
          </div>
        )}
      </>
    </PageContext.Provider>
  );
};
