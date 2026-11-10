import { useState, useEffect, useCallback } from "react";
import { Heart, RotateCcw } from "lucide-react";
import "./Pages.css";

const SHAPES = ["spades", "hearts", "clubs", "diamonds"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const getColumnScoreInfo = (cards) => {
  let total = 0;
  let aces = 0;

  cards.forEach((card) => {
    if (card.value === "A") {
      aces += 1;
      total += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      total += 10;
    } else {
      total += Number.parseInt(card.value, 10);
    }
  });

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  const effectiveTotal = total;
  let displayScore = `${effectiveTotal}`;

  if (aces > 0 && effectiveTotal <= 21 && effectiveTotal - 10 > 0) {
    displayScore = `${effectiveTotal}/${effectiveTotal - 10}`;
  }

  return { effectiveTotal, displayScore };
};

const generateRandomCard = () => {
  const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const randomValue = VALUES[Math.floor(Math.random() * VALUES.length)];

  return { shape: randomShape, value: randomValue };
};

export default function Game({ setScore, isPaused, setIsPaused }) {
  const [lives, setLives] = useState(3);
  const [columns, setColumns] = useState([[], [], [], []]);
  const [openedCard, setOpenedCard] = useState(() => generateRandomCard());

  const handleRestart = useCallback(() => {
    setLives(3);
    setScore(0);
    setColumns([[], [], [], []]);
    setOpenedCard(generateRandomCard());
    if (setIsPaused) setIsPaused(false);
  }, [setIsPaused, setScore]);

  useEffect(() => {
    const onReset = () => handleRestart();

    window.addEventListener("reset-game", onReset);
    return () => window.removeEventListener("reset-game", onReset);
  }, [handleRestart]);

  const addPoints = useCallback(
    (points) => {
      setScore((previousScore) => {
        const nextScore = previousScore + points;
        const existingHighScore = Number.parseInt(
          localStorage.getItem("wizards21_highscore") || "0",
          10,
        );

        localStorage.setItem(
          "wizards21_highscore",
          String(Math.max(nextScore, existingHighScore)),
        );

        return nextScore;
      });
    },
    [setScore],
  );

  const handleColumnClick = (colIndex) => {
    if (!openedCard || lives <= 0 || isPaused) return;

    const currentColumn = [...columns[colIndex], openedCard];
    const { effectiveTotal } = getColumnScoreInfo(currentColumn);
    const cardCount = currentColumn.length;
    const newColumns = [...columns];

    const isBlackjack = cardCount === 2 && effectiveTotal === 21;
    const isFiveCardCharlie = cardCount >= 5 && effectiveTotal <= 21;
    const isNormal21 = effectiveTotal === 21 && !isBlackjack;

    if (isBlackjack) {
      addPoints(300);
      newColumns[colIndex] = [];
    } else if (isFiveCardCharlie) {
      addPoints(200);
      newColumns[colIndex] = [];
    } else if (isNormal21) {
      addPoints(100);
      newColumns[colIndex] = [];
    } else if (effectiveTotal > 21) {
      setLives((previousLives) => Math.max(0, previousLives - 1));
      newColumns[colIndex] = [];
    } else {
      newColumns[colIndex] = currentColumn;
    }

    setColumns(newColumns);
    setOpenedCard(generateRandomCard());
  };

  return (
    <div className="game-container">
      <div className="lives-container">
        {[...Array(3)].map((_, index) => (
          <Heart
            key={index}
            size={42}
            className={`heart-icon ${index < lives ? "active" : "lost"}`}
            fill={index < lives ? "#ff2a5f" : "transparent"}
          />
        ))}

        {lives === 0 && (
          <button type="button" className="restart-btn" onClick={handleRestart}>
            <RotateCcw size={20} /> Play Again
          </button>
        )}
      </div>

      <div className="columns-container">
        {columns.map((col, colIndex) => {
          const { displayScore } = getColumnScoreInfo(col);

          return (
            <div
              key={colIndex}
              className="column-slot"
              onClick={() => handleColumnClick(colIndex)}
            >
              {col.length > 0 && <div className="column-score">{displayScore}</div>}

              <div className="cards-stack">
                {(
                  col.map((card, cardIndex) => (
                    <img
                      key={`${card.shape}-${card.value}-${cardIndex}`}
                      src={`/assets/card-${card.shape}-${card.value}.png`}
                      alt={`${card.value} of ${card.shape}`}
                      className="card-image stacked"
                      style={{
                        top: `${cardIndex * 26}px`,
                        zIndex: cardIndex + 1,
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="deck-container">
        <div className="deck-card-wrapper closed">
          <img
            src="/assets/card-closed.png"
            alt="Closed deck"
            className="card-image"
          />
        </div>

        <div className="deck-card-wrapper opened">
          {openedCard && lives > 0 ? (
            <img
              src={`/assets/card-${openedCard.shape}-${openedCard.value}.png`}
              alt={`${openedCard.value} of ${openedCard.shape}`}
              className="card-image"
            />
          ) : (
            <div className="empty-deck-slot">{lives === 0 ? "Game Over" : "Empty"}</div>
          )}
        </div>
      </div>
    </div>
  );
}