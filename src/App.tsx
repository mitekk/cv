import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/main.layout";
import { AppRoutes } from "./routes";
import "./App.css";

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
