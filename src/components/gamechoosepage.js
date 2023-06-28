import { useState } from "react";

import helpIcon from "../assets/icons-images/help-icon.png";
import easy1 from "../assets/game-images/easy/easy-1.jpg";
import easy2 from "../assets/game-images/easy/easy-2.jpg";
import easy3 from "../assets/game-images/easy/easy-3.jpg";
import hard1 from "../assets/game-images/hard/hard-1.jpg";
import hard2 from "../assets/game-images/hard/hard-2.jpg";
import hard3 from "../assets/game-images/hard/hard-3.jpg";
import medium1 from "../assets/game-images/medium/medium-1.jpg";
import medium2 from "../assets/game-images/medium/medium-2.jpg";
import medium3 from "../assets/game-images/medium/medium-3.jpg";

const easyImages = [easy1, easy2, easy3];
const hardImages = [hard1, hard2, hard3];
const mediumImages = [medium1, medium2, medium3];

const GameChoosePage = ({ setGameImg, gameImg, modalRef, homeRef }) => {
  const [disable, setDisable] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

  const handleSelection = (difficulty) => {
    disable ? setDisable(0) : setDisable(1);
    setDifficulty(difficulty);
  };

  const handleModal = () => {
    modalRef.current.showModal();
    homeRef.current.classList.add("modal-overlay");
  };
  if (gameImg) {
    return <></>;
  }
  if (!disable) {
    return (
      <div>
        <h2 style={{ margin: "3rem", textAlign: "center" }}>
          Choose Difficulty
        </h2>
        <div id="difficulty-selection-container">
          <div
            className="flex-child-auto"
            onClick={() => handleSelection(easyImages)}
          >
            <span
              style={{
                fontSize: "x-large",
                fontWeight: "bold",
              }}
            >
              Easy
              <img
                style={{ width: "20px", margin: "1rem 0 1rem 1rem" }}
                className="tooltip-icon"
                src={helpIcon}
                data-tooltip
                tabIndex={"1"}
                title="In this game mode you only need to find Waldo"
                data-position="top"
                data-alignment="center"
              />
            </span>
            <img className="game-board" src={easy3} alt="" />
          </div>
          <div
            className="flex-child-auto"
            onClick={() => handleSelection(mediumImages)}
          >
            <span
              style={{
                fontSize: "x-large",
                fontWeight: "bold",
              }}
            >
              Medium
              <img
                style={{ width: "20px", margin: "1rem 0 1rem 1rem" }}
                src={helpIcon}
                data-tooltip
                className="tooltip-icon"
                tabIndex={"1"}
                title="In this game mode need to find Waldo and the Wizard"
                data-position="top"
                data-alignment="center"
              />
            </span>
            <img className="game-board" src={medium1} alt="" />
          </div>
          <div
            className="flex-child-auto"
            onClick={() => handleSelection(hardImages)}
          >
            <span
              style={{
                fontSize: "x-large",
                fontWeight: "bold",
              }}
            >
              Hard
              <img
                style={{ width: "20px", margin: "1rem 0 1rem 1rem" }}
                src={helpIcon}
                data-tooltip
                tabIndex={"1"}
                className="tooltip-icon"
                title="In this game mode you need to find all characters"
                data-position="top"
                data-alignment="center"
              />
            </span>
            <img className="game-board" src={hard1} />
          </div>
        </div>
      </div>
    );
  }
  if (disable) {
    const images = difficulty.map((image) => {
      return (
        <img
          src={image}
          key={image}
          alt=""
          onClick={() => {
            setGameImg(image);
            handleModal();
          }}
        ></img>
      );
    });
    return (
      <div>
        <button className="button large" onClick={handleSelection}>
          &#9664; back
        </button>
        <h2 style={{ marginTop: "2rem" }}>Choose Game</h2>
        <h3>
          {difficulty[0].includes("easy")
            ? "Easy"
            : difficulty[0].includes("medium")
            ? "Medium"
            : "Hard"}
        </h3>
        <div id="choose-game-images-container">{images}</div>
      </div>
    );
  }
};

export default GameChoosePage;
