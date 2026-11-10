import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import Start from "./pages/Start";
import TopScore from "./pages/TopScore";
import Pause from "./pages/Pause";
import "./App.css";

function AppContent() {
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleRestart = () => {
    setIsPaused(false);
    setScore(0);
    window.dispatchEvent(new Event("reset-game"));
  };

  return (
    <div>
      <Navbar score={score} onPauseClick={() => setIsPaused(true)} handleRestart={handleRestart} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route
              path="/game"
              element={
                <Game
                  score={score}
                  setScore={setScore}
                  isPaused={isPaused}
                  setIsPaused={setIsPaused}
                />
              }
            />
            <Route path="/top_score" element={<TopScore />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Pause
          isOpen={isPaused}
          onResume={() => setIsPaused(false)}
          onRestart={handleRestart}
          setIsPaused={setIsPaused}
        />
      </div>
    );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}