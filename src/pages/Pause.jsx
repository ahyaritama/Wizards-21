import { Play, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pause({ isOpen, onResume, onRestart, setIsPaused }) {
  if (!isOpen) return null;

  return (
    <div className="pause-overlay">
      <div className="pause-modal">
        <h2>Game Paused</h2>
        <div className="action-buttons">
          <button className="btn-primary" onClick={onResume}>
            <Play size={18} /> Resume
          </button>
          <Link className="btn-secondary" onClick={(onRestart)}>
            <RotateCcw size={18} /> Restart Game
          </Link>
          <Link to="/" className="btn-secondary" onClick={() => setIsPaused(false)}>
            <Home size={18} /> Main Menu
          </Link>
        </div>
      </div>
    </div>
  );
}