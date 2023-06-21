import { createContext, useEffect, useState } from "react";
import img from "../testimag.jpeg";
import easyIMG from "../2687209.jpg";

function CreateGrid({ zoom, setZoom, setClickedCell }) {
  const containerWidth = (70 / 100) * window.innerWidth;
  const containerHeigth = (70 / 100) * window.innerHeight;
  const cellWidth = (containerWidth / 36).toString() + "px";
  const cellHeight = (containerHeigth / 13).toString() + "px";

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
  for (let w = 0; w < 468; w++) {
    if (w === 0) {
      cells.push(
        <div
          id={w}
          className="cells"
          key={w}
          style={{ width: cellWidth, height: cellHeight }}
        >
          {" "}
          <button
            className="hollow button"
            onClick={() => handleZoom("increaseZoom")}
          >
            +
          </button>
        </div>
      );
      continue;
    }
    if (w === 1) {
      cells.push(
        <div
          id={w}
          className="cells"
          key={w}
          style={{ width: cellWidth, height: cellHeight }}
        >
          <button
            className="hollow button"
            onClick={() => handleZoom("decreaseZoom")}
          >
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
  switch (cell) {
    case 384:
    case 383:
    case 348:
    case 349:
    case 420:
    case 419:
    case 456:
      alert("found willy ");
      document
        .getElementById("cell-383")
        .setAttribute(
          "style",
          "grid-column: span 2; grid-row: span 4; border:solid red 4px; border-radius:40%; margin-left: .5rem"
        );
      return true;
    default:
      return null;
  }
}

const Home = () => {
  const [zoom, setZoom] = useState(1);
  const [gameImg, setGameImg] = useState(easyIMG);
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

  return (
    <div id="home">
      <div id="zoom-buttons-container"></div>
      <div
        id="grid-container"
        style={{
          backgroundImage: "url(" + easyIMG + ")",
          transform: "scale(" + zoom + ")",
        }}
      >
        <CreateGrid
          zoom={zoom}
          setZoom={setZoom}
          setClickedCell={setClickedCell}
        />
      </div>
    </div>
  );
};

export default Home;
