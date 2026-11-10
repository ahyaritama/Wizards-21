import { Link } from "react-router-dom";
import { Play, Trophy } from "lucide-react";

export default function Start() {
  return (
    <div className="start-container">
      <h1 className="game-title">Wizard&apos;s 21</h1>
      <p className="game-subtitle">Reach the highest score!</p>

      <div className="action-buttons">
        <Link to="/game" className="btn-primary">
          <Play size={20} /> Play Now
        </Link>
        <Link to="/top_score" className="btn-secondary">
          <Trophy size={20} /> Top Score
        </Link>
      </div>
    </div>
  );
}