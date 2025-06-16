import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  BuzzPage,
  IntroPage,
  About,
  Experience,
  NotFoundPage,
  Toolbox,
} from "./pages";

export function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem("redirect");
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return (
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
  );
}
