let medium_1 = [];
let medium_2 = [];
let medium_3 = [];
let hard_1 = [];
let hard_2 = [];
let hard_3 = [];

function addHitIndicator(cell) {
  const hitbox = document.createElement("div");
  hitbox.classList.add("hitbox");
  return cell.appendChild(hitbox);
}

function checkForWin(board, cellID) {
  console.log(board, cellID);
  const clickedCell = document.getElementById(cellID);
  if (board === "easy-1" || board === "medium-1") {
    addHitIndicator(clickedCell);
    board === "easy-1"
      ? alert("win") /// win for easy 1
      : medium_1.length < 1
      ? medium_1.push(true)
      : alert("win"); /// win for medium 1
  } else if (board === "easy-2" || board === "medium-2") {
    addHitIndicator(clickedCell);
    board === "easy-2"
      ? alert("win") /// win for easy 2
      : medium_2.length < 1
      ? medium_2.push(true)
      : alert("win"); /// win for medium 2
  } else if (board === "easy-3" || board === "hard-3") {
    addHitIndicator(clickedCell);
    board === "easy-3"
      ? alert("win") /// win for easy 3
      : hard_3.length < 3
      ? hard_3.push(true)
      : alert("win"); /// win for hard 3
  } else if (board === "medium-3" || "hard-2") {
    addHitIndicator(clickedCell);
    if (board === "medium-3") {
      medium_3.length < 1 ? medium_3.push(true) : alert("win");
    } else {
      hard_2.length < 3 ? hard_2.push(true) : alert("win");
    }
  }
  return (clickedCell.id = "");
}

function gamerules(cellid, gameImg) {
  if (!cellid && !gameImg) {
    medium_1 = [];
    medium_2 = [];
    medium_3 = [];
    hard_1 = [];
    hard_2 = [];
    return (hard_3 = []);
  }
  const clickedCell = Number(cellid.split("-")[1]);
  const imageNameRegex = /(medium|easy|hard)-\d+/;
  const boardName = gameImg.match(imageNameRegex)[0];

  switch (boardName) {
    case "easy-1":
      if (clickedCell === 310) checkForWin(boardName, cellid);
      return;
    case "easy-2":
      if (clickedCell === 591) checkForWin(boardName, cellid);
      return;
    case "easy-3":
      if (clickedCell === 422) checkForWin(boardName, cellid);
      return;

    case "medium-1":
      if (clickedCell === 261 || clickedCell === 310)
        checkForWin(boardName, cellid);
      return;
    case "medium-2":
      if (clickedCell === 635 || clickedCell === 591)
        checkForWin(boardName, cellid);
      return;
    case "medium-3":
      console.log(clickedCell, boardName, "por que entra");
      if (clickedCell === 482 || clickedCell === 460)
        checkForWin(boardName, cellid);
      return;

    case "hard-1":
      if (
        clickedCell === 159 ||
        clickedCell === 583 ||
        clickedCell === 586 ||
        clickedCell === 60
      )
        checkForWin(boardName, cellid);
      return;
    case "hard-2":
      if (
        clickedCell === 482 ||
        clickedCell === 460 ||
        clickedCell === 406 ||
        clickedCell === 542
      )
        checkForWin(boardName, cellid);
      return;
    case "hard-3":
      if (
        clickedCell === 422 ||
        clickedCell === 201 ||
        clickedCell === 482 ||
        clickedCell === 615
      )
        checkForWin(boardName, cellid);
      return;
    default:
      return console.log(false);
  }
}

export default gamerules;
