let medium_1 = [];
let medium_2 = [];
let medium_3 = [];
let hard_1 = [];
let hard_2 = [];
let hard_3 = [];
export let isGameWon = false;

export function setIsGameWon() {
  isGameWon = false;
}

function addHitIndicator(cell) {
  const hitbox = document.createElement("div");
  hitbox.classList.add("hitbox");
  return cell.appendChild(hitbox);
}

function checkForWin(board, cellID) {
  const clickedCell = document.getElementById(cellID);
  addHitIndicator(clickedCell);
  if (board === "easy-1" || board === "medium-1") {
    board === "easy-1"
      ? (isGameWon = true) /// win for easy 1
      : medium_1.length < 1
      ? medium_1.push(true)
      : alert("win"); /// win for medium 1
  } else if (board === "easy-2" || board === "medium-2") {
    board === "easy-2"
      ? alert("win") /// win for easy 2
      : medium_2.length < 1
      ? medium_2.push(true)
      : alert("win"); /// win for medium 2
  } else if (board === "easy-3" || board === "hard-3") {
    board === "easy-3"
      ? alert("win") /// win for easy 3
      : hard_3.length < 3
      ? hard_3.push(true)
      : alert("win"); /// win for hard 3
  } else if (board === "medium-3" || "hard-2") {
    if (board === "medium-3") {
      medium_3.length < 1 ? medium_3.push(true) : alert("win"); /// win for medium 3
    } else {
      hard_2.length < 3 ? hard_2.push(true) : alert("win"); /// win for hard 2
    }
  } else if (board === "hard-1") {
    hard_1.length < 3 ? hard_1.push(true) : alert("win"); ///win for hard 1
  }
}

function gamerules(cellid, gameImg) {
  if (!cellid && !gameImg) {
    medium_1 = [];
    medium_2 = [];
    medium_3 = [];
    hard_1 = [];
    hard_2 = [];
    hard_3 = [];
    return;
  }
  const clickedCell = Number(cellid.split("-")[1]);
  const imageNameRegex = /(medium|easy|hard)-\d+/;
  const boardName = gameImg.match(imageNameRegex)[0];
  const targetingBox = document.getElementById("targeting-box");

  switch (boardName) {
    case "easy-1":
      if (clickedCell === 310) return checkForWin(boardName, cellid);
    case "easy-2":
      if (clickedCell === 591) return checkForWin(boardName, cellid);
    case "easy-3":
      if (clickedCell === 422) return checkForWin(boardName, cellid);

    case "medium-1":
      if (clickedCell === 261 || clickedCell === 310)
        return checkForWin(boardName, cellid);
    case "medium-2":
      if (clickedCell === 635 || clickedCell === 591)
        return checkForWin(boardName, cellid);
    case "medium-3":
      if (clickedCell === 482 || clickedCell === 460)
        return checkForWin(boardName, cellid);

    case "hard-1":
      if (
        clickedCell === 159 ||
        clickedCell === 583 ||
        clickedCell === 586 ||
        clickedCell === 60
      )
        return checkForWin(boardName, cellid);
    case "hard-2":
      if (
        clickedCell === 482 ||
        clickedCell === 460 ||
        clickedCell === 406 ||
        clickedCell === 542
      )
        return checkForWin(boardName, cellid);
    case "hard-3":
      if (
        clickedCell === 422 ||
        clickedCell === 201 ||
        clickedCell === 482 ||
        clickedCell === 615
      )
        return checkForWin(boardName, cellid);
    default:
      targetingBox.animate(
        [
          { transform: "translate(0)" },
          { transform: "translate(-3px)" },
          { transform: "translate(3px)" },
          { boxShadow: "0 0 3px 4px   rgb(255, 122, 122)" },
        ],
        {
          duration: 90,
          iterations: 2,
        }
      );
      return;
  }
}

export default gamerules;
