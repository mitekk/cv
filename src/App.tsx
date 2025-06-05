import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main.layout";

import "./App.css";
import {
  BuzzPage,
  IntroPage,
  About,
  Experience,
  NotFoundPage,
  Skills,
} from "./pages";

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/theBuzz" element={<BuzzPage />}>
            <Route index element={<Skills />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
