import { Link } from "react-router-dom";
import { Pause, House, Trophy } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ score, onPauseClick, handleRestart }) {
  return (
    <nav>
      <span className="score-container">
        <ul>
          <li>Score:</li>
          <li>{score}</li>
        </ul>
      </span>

      <span className="nav-menu">
        <ul>
          <Link to="/" aria-label="Back to menu" onClick={() => handleRestart()}>
            <li className="glow-on-hover">
              <House color="white" />
            </li>
          </Link>

          <button type="button" onClick={onPauseClick} aria-label="Pause game" className="nav-button">
            <li className="glow-on-hover">
              <Pause color="white" />
            </li>
          </button>

          <Link to="/top_score" aria-label="View top score">
            <li className="glow-on-hover">
              <Trophy color="white" />
            </li>
          </Link>
        </ul>
      </span>
    </nav>
  );
}