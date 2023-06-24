import { createContext, useEffect, useRef, useState } from "react";
import waldo from "../game-images/waldo.png";
import walda from "../game-images/walda.jpg";
import evilWaldo from "../game-images/evil-waldo.jpg";
import wizard from "../game-images/wizard.jpg";
import easy1 from "../game-images/easy/easy-1.jpg";
import easy2 from "../game-images/easy/easy-2.jpg";
import easy3 from "../game-images/easy/easy-3.jpg";
import hard1 from "../game-images/hard/hard-1.jpeg";
import HTMLMagnifier from "html-magnifier/html-magnifier";

const magnifier = new HTMLMagnifier({
  width: 300,
  height: 200,
});

magnifier.on("syncScrollBars", function (magnifierContent) {
  const scrollableArea = magnifierContent.querySelector("#root");
  const scrollTop = document.querySelector("html").scrollTop;
  scrollableArea.scrollTop = scrollTop;
  console.log(
    "scrollTOp HTML = " + scrollTop,
    "root set to scrollTop value ? " + scrollableArea.scrollTop
  );
});

magnifier.on("prepareContent", function (magnifierContent) {
  const elementsToRemove = magnifierContent.querySelectorAll("button");
  for (var i = 0; i < elementsToRemove.length; i++) {
    const element = elementsToRemove[i];
    element.parentNode.removeChild(element);
  }
});

const easyImages = [easy1, easy2, easy3];
const hardImages = [hard1];

function CreateGrid({ zoom, setZoom, setClickedCell }) {
  const containerWidth = (70 / 100) * window.innerWidth;
  const containerHeigth = (70 / 100) * window.innerHeight;
  const cellWidth = (containerWidth / 36).toString() + "px";
  const cellHeight = (containerHeigth / 20).toString() + "px";

  const handleZoom = (zoomButton) => {
    if (zoom === 1.25 && zoomButton === "increaseZoom") {
      return;
    }
    if (zoom === 1 && zoomButton === "decreaseZoom") {
      return;
    }
    zoomButton === "increaseZoom"
      ? setZoom((Zoom) => Zoom + 0.25)
      : setZoom((Zoom) => Zoom - 0.25);
  };

  const cells = [];
  for (let w = 0; w < 792; w++) {
    if (w === 74) {
      cells.push(
        <div
          id={w}
          className="cells"
          key={w}
          style={{ width: cellWidth, height: cellHeight }}
        >
          {" "}
          <button className="button" onClick={() => handleZoom("increaseZoom")}>
            +
          </button>
        </div>
      );
      continue;
    }
    if (w === 2) {
      cells.push(
        <div
          id={w}
          className="cells"
          key={w}
          style={{ width: cellWidth, height: cellHeight }}
        >
          <button className="button" onClick={() => handleZoom("decreaseZoom")}>
            {" "}
            -
          </button>
        </div>
      );
    } else {
      cells.push(
        <div
          id={"cell-" + w}
          className="cells"
          key={w}
          onClick={(e) => {
            setClickedCell(e.target.id);
            console.log(e.target.id);
          }}
          style={{ width: cellWidth, height: cellHeight }}
        ></div>
      );
    }
  }
  return cells;
}

function checkForCell(cellid) {
  const cell = Number(cellid.split("-")[1]);
  //easy-2
  switch (
    cell /// easy 2 waldo
  ) {
    case 310: /// easy-2 waldo
      document
        .getElementById("cell-310")
        .setAttribute(
          "style",
          " height:200%; border:solid red 4px; border-radius:40%; margin-top: -20px"
        );
      return;
    case 297: ///
    case 261: /// wizard
      document
        .getElementById("cell-261")
        .setAttribute("style", "border:solid red 4px; border-radius:40%");
      return;
    case 255: //evil waldo
      document
        .getElementById("cell-255")
        .setAttribute("style", " border:solid red 4px; border-radius:40%");
      return;
    case 316: ///walda
      document
        .getElementById("cell-316")
        .setAttribute(
          "style",
          "border:solid red 4px; border-radius:40%; margin-left:-10px; margin-right:10px; margin-bottom:-10px"
        );
      return;
  }
  //easy - 3
  switch (
    cell /// easy 3 waldo
  ) {
    case 591: /// easy-3 waldo
      document
        .getElementById("cell-591")
        .setAttribute(
          "style",
          " height:200%; border:solid red 4px; border-radius:40%; margin-top: -10px"
        );
      return;
    case 635: /// wizard
      document
        .getElementById("cell-635")
        .setAttribute(
          "style",
          "border:solid red 4px; border-radius:40%; margin: -15px -5px 5px 5px"
        );
      return;
    case 741: //evil waldo
    case 777:
      document
        .getElementById("cell-777")
        .setAttribute(
          "style",
          " border:solid red 4px; border-radius:40%; margin: -20px 6px 10px -6px"
        );
      return;
    case 483: ///walda
      document
        .getElementById("cell-483")
        .setAttribute(
          "style",
          "border:solid red 4px; border-radius:40%; margin-left:6px; margin-right:-6px; margin-top:-3px"
        );
      return;
  }
  // switch (cell) {
  //   case 384:
  //   case 383:
  //   case 348:
  //   case 349:
  //   case 420:
  //   case 419:
  //   case 456:
  //     alert("found willy ");
  //     document
  //       .getElementById("cell-383")
  //       .setAttribute(
  //         "style",
  //         "grid-column: span 2; grid-row: span 4; border:solid red 4px; border-radius:40%; margin-left: .5rem"
  //       );
  //     return true;
  //   default:
  //     return null;
  // }
}

const GameChoosePage = ({ setGameImg, gameImg }) => {
  const [disable, setDisable] = useState(0);

  const [difficulty, setDifficulty] = useState(null);
  const handleSelection = (difficulty) => {
    disable ? setDisable(0) : setDisable(1);
    setDifficulty(difficulty);
  };
  if (gameImg) {
    return <></>;
  }

  if (!disable) {
    return (
      <div>
        <h2>Choose Difficulty</h2>
        <div id="difficulty-selection-container">
          <div
            className="flex-child-auto"
            onClick={() => handleSelection(easyImages)}
          >
            <p>Easy</p>
            <img src={easy1} alt="" />
          </div>
          <div
            className="flex-child-auto"
            onClick={() => handleSelection("medium")}
          >
            <p>Medium</p>
            <img />
          </div>
          <div
            className="flex-child-auto"
            onClick={() => handleSelection(hardImages)}
          >
            <p>Hard</p>
            <img src={hard1} />
          </div>
        </div>
      </div>
    );
  }
  if (disable) {
    const images = difficulty.map((image) => {
      return <img src={image} alt="" onClick={() => setGameImg(image)}></img>;
    });
    return (
      <div>
        <button className="button large" onClick={handleSelection}>
          &#9664; back
        </button>
        <h2 style={{ marginTop: "2rem" }}>Choose Game</h2>
        <div id="choose-game-images-container">{images}</div>
      </div>
    );
  }
};

const Home = () => {
  const [zoom, setZoom] = useState(1);
  const [gameImg, setGameImg] = useState(false);
  const [clickedCell, setClickedCell] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (clickedCell) {
      if (checkForCell(clickedCell)) {
        setClickedCell(null);
      }
    }
  });

  const handleClick = () => {
    magnifier.show();
  };

  const handleEditMagnifyingGlass = (edit) => {
    const currentHeight = magnifier.getHeight();
    const currentWidth = magnifier.getWidth();
    const currentZoom = magnifier.getZoom();
    if (edit === "increase" && currentWidth < 600) {
      magnifier.setHeight(currentHeight + 50);
      magnifier.setWidth(currentWidth + 100);
    }
    if (edit === "decrease" && currentWidth > 300) {
      magnifier.setHeight(currentHeight - 50);
      magnifier.setWidth(currentWidth - 100);
    }
    if (edit === "zoomin" && currentZoom < 3) {
      magnifier.setZoom(currentZoom + 0.5);
    }
    if (edit === "zoomout" && currentZoom > 2) {
      magnifier.setZoom(currentZoom - 0.5);
    } else {
      return;
    }
  };

  return (
    <div id="home">
      <button
        id="back-button"
        className={`button large ${gameImg ? "" : "hide"}`}
        onClick={() => {
          setGameImg(null);
          setZoom(1);
        }}
        hidden={!gameImg}
        magnify={magnifier.hide()}
      >
        Back
      </button>
      <div>
        <button
          className={`button large ${gameImg ? "" : "hide"}`}
          onClick={handleClick}
        >
          Magnifying Glass
        </button>
        <button
          className={`button large ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("increase")}
        >
          + Size
        </button>
        <button
          className={`button large ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("decrease")}
          hidden={!gameImg}
        >
          - Size
        </button>
        <button
          className={`button large ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("zoomout")}
        >
          -Zoom
        </button>
        <button
          className={`button large ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("zoomin")}
        >
          +Zoom
        </button>
      </div>
      <div id="zoom-buttons-container"></div>
      <div hidden={!gameImg}>
        <img src={evilWaldo}></img>
        <img src={wizard}></img>
        <img src={walda}></img>
        <img src={waldo}></img>
      </div>
      <GameChoosePage setGameImg={setGameImg} gameImg={gameImg} />
      <div
        id="grid-container"
        style={{
          backgroundImage: "url(" + gameImg + ")",
          transform: "scale(" + zoom + ")",
        }}
      >
        {gameImg ? (
          <CreateGrid
            zoom={zoom}
            setZoom={setZoom}
            setClickedCell={setClickedCell}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
