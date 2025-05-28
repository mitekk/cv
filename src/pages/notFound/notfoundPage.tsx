import { Button } from "../../components/UI";
import { useNavigate } from "react-router-dom";
import "../intro/introPage.css";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen z-[2] flex flex-col justify-center items-center absolute top-0 left-0 m-0 mx-auto bg-[#D3D3FF]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4 drop-shadow-lg">
          404 - Not Found
        </h1>
        <p className="mb-8 text-xl text-gray-700 text-center max-w-xl">
          The page you are looking for does not exist.
          <br />
          Maybe you followed a broken link or mistyped the address.
        </p>
        <Button title="Go back to Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};
