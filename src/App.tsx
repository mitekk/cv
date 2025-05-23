import "./App.css";
import { MainLayout } from "./layout/main.layout";
import { TetrominoesGrid } from "./pages/tetrominoes";

function App() {
  return (
    <MainLayout>
      <TetrominoesGrid />
    </MainLayout>
  );
}

export default App;
