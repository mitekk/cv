import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main.layout";
import { IntroPage } from "./pages/intro/introPage";
import { BuzzPage } from "./pages/theBuzz/buzzPage";
import { NotFoundPage } from "./pages/notFound/notfoundPage";
import "./App.css";

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/theBuzz" element={<BuzzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
