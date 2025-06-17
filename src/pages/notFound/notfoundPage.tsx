import { Button } from "../../components/UI";
import { useNavigate } from "react-router-dom";
import "../intro/introPage.css";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-15 gap-10">
      <h1 className="text-5xl font-bold text-red-500 drop-shadow-lg">
        404 - Not Found
      </h1>
      <p className="text-xl text-gray-700 text-center max-w-xl">
        The page you are looking for does not exist.
        <br />
        Maybe you followed a broken link or mistyped the address.
      </p>
      <Button
        style={{ minHeight: "4rem", fontSize: "2rem" }}
        onClick={() => navigate("/portfolio")}
      >
        Home
      </Button>
    </div>
  );
};
