import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainLayout } from "./layout/main.layout";
import {
  BuzzPage,
  IntroPage,
  About,
  Experience,
  NotFoundPage,
  Toolbox,
} from "./pages";
import "./App.css";

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/portfolio" element={<IntroPage />} />
          <Route path="/portfolio/theBuzz" element={<BuzzPage />}>
            <Route index element={<Navigate to="about" replace />} />
            <Route path="about" element={<About />} />
            <Route path="toolbox" element={<Toolbox />} />
            <Route path="experience" element={<Experience />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
