import { Link } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";

export default function TopScore() {
  const highScore = localStorage.getItem("wizards21_highscore") || 0;

  return (
    <div className="topscore-container">
      <h2><Trophy color="#ffd700" size={28} /> Top Score</h2>

      <table className="score-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1</td>
            <td>Wizard Master</td>
            <td>{highScore} pts</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/" className="btn-secondary">
          <ArrowLeft size={18} /> Back to Menu
        </Link>
      </div>
    </div>
  );
}