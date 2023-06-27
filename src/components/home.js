import { createContext, useEffect, useRef, useState } from "react";
import gamerules from "./gamerules";
import GameChoosePage from "./gamechoosepage";
import zoominIcon from "../icons-images/zoom_in.png";
import zoomoutIcon from "../icons-images/zoom_out.png";
import magnificationLargeIcon from "../icons-images/magnification_large.png";
import magnificationSmalIcon from "../icons-images/magnification_small.png";
import waldo from "../game-images/waldo.png";
import walda from "../game-images/walda.jpg";
import evilWaldo from "../game-images/evil-waldo.jpg";
import wizard from "../game-images/wizard.jpg";
import HTMLMagnifier from "html-magnifier/html-magnifier";

const magnifier = new HTMLMagnifier({
  width: 300,
  height: 200,
});

magnifier.on("syncScrollBars", function (magnifierContent) {
  const scrollableArea = magnifierContent.querySelector("#root");
  const scrollTop = document.querySelector("html").scrollTop;
  scrollableArea.scrollTop = scrollTop;
});

magnifier.on("prepareContent", function (magnifierContent) {
  const elementsToRemove = magnifierContent.querySelectorAll("button");
  for (var i = 0; i < elementsToRemove.length; i++) {
    const element = elementsToRemove[i];
    element.parentNode.removeChild(element);
  }
});

function CreateGrid({ zoom, setZoom, gameImg }) {
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
    if (w === 2) {
      cells.push(
        <div
          id={w}
          className="cells"
          key={w}
          style={{ width: cellWidth, height: cellHeight }}
        >
          <button
            className="button tiny"
            onClick={() => handleZoom("increaseZoom")}
          >
            +
          </button>
        </div>
      );
      continue;
    }
    if (w === 0) {
      cells.push(
        <div
          id={w}
          className="cells"
          key={w}
          style={{ width: cellWidth, height: cellHeight }}
        >
          <button
            className="button tiny"
            onClick={() => handleZoom("decreaseZoom")}
          >
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
            gamerules(e.target.id, gameImg);
            console.log(e.target.id);
          }}
          style={{ width: cellWidth, height: cellHeight }}
        ></div>
      );
    }
  }
  return cells;
}

const Home = () => {
  const [zoom, setZoom] = useState(1);
  const [gameImg, setGameImg] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showMagnifyingGlass, setShowMagnifyingGlass] = useState(false);
  const [centerX, setCenterX] = useState(null);
  const [centerY, setCenterY] = useState(null);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleClick = (e, arg) => {
    if (arg) {
      magnifier.show();
      e.target.textContent = "Close Magnifying Glass";
    } else {
      magnifier.hide();
      e.target.textContent = "Magnifying Glass";
    }
    setShowMagnifyingGlass(arg);
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

  const handleFollowMouse = (e) => {
    setCenterY(e.clientY - 10 + window.scrollY + "px");
    setCenterX(e.clientX - 10 + "px");
  };
  return (
    <div id="home">
      <button
        id="back-button"
        className={`button large ${gameImg ? "" : "hide"}`}
        onClick={() => {
          setGameImg(null);
          setZoom(1);
          gamerules("", "");
        }}
        hidden={!gameImg}
      >
        Back
      </button>
      <div>
        <button
          className={`button large ${gameImg ? "" : "hide"}`}
          onClick={(e) => handleClick(e, !showMagnifyingGlass)}
        >
          Magnifying Glass
        </button>
        <button
          className={`button ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("increase")}
          data-tooltip
          tabIndex="1"
          title="Increase Glass Size"
        >
          <img
            className="magnification-icons"
            src={magnificationLargeIcon}
            alt="Magnification increase"
          />
        </button>
        <button
          className={`button  ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("decrease")}
          hidden={!gameImg}
          data-tooltip
          tabIndex="1"
          title="Decrease Glass Size"
        >
          <img
            className="magnification-icons"
            src={magnificationSmalIcon}
            alt="Magnification decrease"
          />
        </button>
        <button
          className={`button  ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("zoomout")}
          data-tooltip
          tabIndex="1"
          title="Decrease Glass Zoom"
        >
          <img
            className="magnification-icons"
            src={zoomoutIcon}
            alt="Zoom out"
          />
        </button>
        <button
          className={`button   ${gameImg ? "" : "hide"}`}
          onClick={() => handleEditMagnifyingGlass("zoomin")}
          data-tooltip
          tabIndex="1"
          title="Increase Glass Zoom"
        >
          <img className="magnification-icons" src={zoominIcon} alt="Zoom in" />
        </button>
      </div>
      <div id="zoom-buttons-container"></div>
      <div hidden={!gameImg}>
        {typeof gameImg === "string" && gameImg.includes("hard") ? (
          <span>
            <img src={evilWaldo}></img> <img src={walda}></img>
          </span>
        ) : (
          ""
        )}
        {typeof gameImg === "string" && !gameImg.includes("easy") ? (
          <img src={wizard}></img>
        ) : (
          ""
        )}
        <img src={waldo}></img>
      </div>

      <GameChoosePage setGameImg={setGameImg} gameImg={gameImg} />
      <div
        id="grid-container"
        style={{
          backgroundImage: "url(" + gameImg + ")",
          transform: "scale(" + zoom + ")",
        }}
        onMouseMove={handleFollowMouse}
      >
        {gameImg ? (
          <CreateGrid zoom={zoom} setZoom={setZoom} gameImg={gameImg} />
        ) : (
          magnifier.hide()
        )}
      </div>
      <span
        id="targeting-box"
        hidden={!gameImg}
        style={{ position: "absolute", top: centerY, left: centerX }}
      ></span>
    </div>
  );
};

export default Home;
