import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main.layout";

import "./App.css";
import {
  BuzzPage,
  Contact,
  IntroPage,
  Leadership,
  NotFoundPage,
  Projects,
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
            <Route path="skills" element={<Skills />} />
            <Route path="leadership" element={<Leadership />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
