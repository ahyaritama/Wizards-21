import { NavLink, Link } from "react-router-dom";
import { Pause, RotateCcw, Trophy } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ score }) {
  return (
    <>
      <nav>
        <span className="score">
          <ul>
            <li>Score:</li>
            <li>{score}</li>
          </ul>
        </span>
        <span className="nav-menu">
          <ul>
            <li className="glow-on-hover">
              <Link to="/"><RotateCcw color="white" /></Link>
            </li>
            <li className="glow-on-hover">
              <NavLink to="/pause" end><Pause color="white" /></NavLink>
            </li>
            <li className="glow-on-hover">
              <NavLink to="/top_score" end><Trophy color="white" /></NavLink>
            </li>
          </ul>
        </span>
      </nav>
    </>
  )
}