import { Link, Outlet } from "react-router-dom";
import { WavesGrid } from "../../components/grid";
import { PageContext } from "../../context";
import "./buzzPage.css";

export const BuzzPage: React.FC = () => {
  return (
    <PageContext.Provider value={{}}>
      <div>
        <WavesGrid onAnimationFinish={() => {}} />
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="flex min-w-fit h-full items-center bg-zinc-700">
            <ul className="flex px-10 min-w-fit h-full flex-col justify-evenly ">
              <li>
                <Link to="skills" className="nav-link">
                  skills
                </Link>
              </li>
              <li>
                <Link to="leadership" className="nav-link">
                  leadership
                </Link>
              </li>
              <li>
                <Link to="projects" className="nav-link">
                  projects
                </Link>
              </li>
              <li>
                <Link to="contact" className="nav-link">
                  contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};
