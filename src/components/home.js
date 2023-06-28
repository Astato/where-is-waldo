import { useEffect, useState, useRef } from "react";
import gamerules, { setIsGameWon } from "../utils/gamerules.js";
import GameChoosePage from "./gamechoosepage";
import Stopwatch from "./stopwatch.js";
import zoominIcon from "../assets/icons-images/zoom_in.png";
import zoomoutIcon from "../assets/icons-images/zoom_out.png";
import magnificationLargeIcon from "../assets/icons-images/magnification_large.png";
import magnificationSmalIcon from "../assets/icons-images/magnification_small.png";
import waldo from "../assets/game-images/waldo.png";
import walda from "../assets/game-images/walda.jpg";
import evilWaldo from "../assets/game-images/evil-waldo.jpg";
import wizard from "../assets/game-images/wizard.jpg";
import HTMLMagnifier from "html-magnifier/html-magnifier";
import { isGameWon } from "../utils/gamerules.js";

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
  const [startTimer, setStartTimer] = useState(false);
  const [gameTime, setGameTime] = useState(null);
  const [isInputHidden, setIsInputHidden] = useState("input-hidden");
  const modalRef = useRef(null);
  const homeRef = useRef(null);
  const winModalRef = useRef(null);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    console.log(gameTime);

    if (gameTime) {
      winModalRef.current.showModal();
    }
  }, [gameTime]);

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

  const handleBackButton = () => {
    setGameImg(null);
    setZoom(1);
    gamerules("", "");
    setStartTimer(false);
    setGameTime(null);
    setIsGameWon();
  };

  const handleRegisterTime = (e) => {
    setIsInputHidden("input-shown");
    e.target.innerText = "Save";
  };

  return (
    <div id="home" ref={homeRef}>
      <dialog id="win-dialog" ref={winModalRef}>
        <div id="win-dialog-items-container">
          <h2>Congratulations!!!! </h2>
          {gameTime ? (
            <strong>
              Your Finished in:
              {gameTime[0] === 0
                ? gameTime[1] + " Seconds"
                : gameTime[0] + ":" + gameTime[1]}
            </strong>
          ) : (
            <></>
          )}
          <div>
            <div className={isInputHidden}>
              <input type="text"></input>
            </div>
            <button className="button" onClick={handleRegisterTime}>
              Register time
            </button>
            <button
              className="button"
              onClick={() => {
                winModalRef.current.close();
                handleBackButton();
                setIsInputHidden("input-hidden");
              }}
            >
              New Game
            </button>
          </div>
        </div>
      </dialog>

      {gameImg ? (
        <>
          <Stopwatch
            startTimer={startTimer}
            setStartTimer={setStartTimer}
            setGameTime={setGameTime}
          />
          <button
            className="button"
            style={{ position: "absolute", top: "24rem", left: ".5rem" }}
            onClick={() => {
              setStartTimer("pause");
              modalRef.current.showModal();
              homeRef.current.classList.add("modal-overlay");
            }}
          >
            Pause
          </button>
        </>
      ) : (
        <></>
      )}
      <button
        id="back-button"
        className={`button large ${gameImg ? "" : "hide"}`}
        onClick={handleBackButton}
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

      <GameChoosePage
        setGameImg={setGameImg}
        gameImg={gameImg}
        modalRef={modalRef}
        homeRef={homeRef}
      />
      <dialog ref={modalRef} id="modal" className="modal">
        <div id="modal-content-wrapper">
          <p style={{ textAlign: "center", fontSize: "55px" }}>Good Luck!</p>
          {/* <div style={{ textAlign: "center", fontSize: "45px" }}>
            <Stopwatch />
          </div> */}
          <button
            className="button large"
            onClick={() => {
              modalRef.current.close();
              homeRef.current.classList.remove("modal-overlay");
              setStartTimer(true);
            }}
          >
            Start timer!
          </button>
        </div>
      </dialog>
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
