import "./App.css";
import { Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import GameRoom from "./pages/GameRoom";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/room/:id" element={<GameRoom />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
