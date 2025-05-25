import "./App.css";
import { MainLayout } from "./layout/main.layout";
import { IntroPage } from "./pages/tetrominoes/intro";

function App() {
  return (
    <MainLayout>
      <IntroPage />
    </MainLayout>
  );
}

export default App;
