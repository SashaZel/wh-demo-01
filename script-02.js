console.log("hello");

const ROW = 100;
const COLUMN = 100;

const buttonWall = document.getElementById("button-wall");
const buttonRack = document.getElementById("button-rack");
const buttonCleaner = document.getElementById("button-cleaner");

let drawNowType = "wall";
buttonWall.classList.add("button_active");

buttonWall.onclick = () => {
  buttonWall.classList.add("button_active");
  buttonRack.classList.remove("button_active");
  buttonCleaner.classList.remove("button_active");
  drawNowType = "wall";
};
buttonRack.onclick = () => {
  buttonWall.classList.remove("button_active");
  buttonRack.classList.add("button_active");
  buttonCleaner.classList.remove("button_active");
  drawNowType = "rack";
};

buttonCleaner.onclick = () => {
  buttonWall.classList.remove("button_active");
  buttonRack.classList.remove("button_active");
  buttonCleaner.classList.add("button_active");
  drawNowType = "cleaner";
};

function isValid(row, column, data) {
  if (row === 0 || column === 0 || row === ROW - 1 || column === COLUMN - 1) {
    return false;
  }
  // Like a clock
  const neib12 = data[row - 1][column];
  const neib1 = data[row - 1][column + 1];
  const neib3 = data[row][column + 1];
  const neib5 = data[row + 1][column + 1];
  const neib6 = data[row + 1][column];
  const neib7 = data[row + 1][column - 1];
  const neib9 = data[row][column - 1];
  const neib11 = data[row - 1][column - 1];

  const neibArr = [neib12, neib1, neib3, neib5, neib6, neib7, neib9, neib11];
  if (neibArr.includes(2)) {
    return false;
  }
  const onlyOnes = neibArr.filter((e) => e === 1);
  if (onlyOnes.length > 2) {
    return false;
  }
  return true;
}

function drawWall(target, row, column) {
  // if (target.textContent === "w") {
  //   data[row][column] = 0;
  //   target.className = "cell el-0";
  //   target.textContent = "";
  //   return;
  // }
  data[row][column] = 2;
  target.textContent = "w";
  target.className = "cell el-2";
}

function drawRack(target, row, column) {
  if (target.textContent !== "st") {
    counter++;
    counterSpan.textContent = counter;
  }
  data[row][column] = 1;
  const validCell = isValid(row, column, data);
  target.textContent = "st";
  target.className = `cell el-1 ${validCell ? "" : "invalid-cell"}`;
}

function drawCleaner(target, row, column) {
  if (target.textContent === "st") {
    counter--;
    counterSpan.textContent = counter;
  }
  data[row][column] = 0;
  target.className = "cell el-0";
  target.textContent = "";
}

function draw(e) {
  // console.log(data);
  if (e.type === "mouseover" && e.buttons !== 1) return;
  const target = e.target;
  const [row, column] = target.id.split("-").map((e) => Number(e));
  if (
    row !== row ||
    column !== column ||
    row === undefined ||
    column === undefined
  ) {
    return;
  }
  if (drawNowType === "cleaner") {
    drawCleaner(target, row, column);
  }
  if (drawNowType === "wall") {
    drawWall(target, row, column);
  }
  if (drawNowType === "rack") {
    drawRack(target, row, column);
  }

  // if (textContent === "st") {
  //   data[row][column] = 0;
  //   target.className = "cell el-0";
  //   target.textContent = "";
  //   counter--;
  //   counterSpan.textContent = counter;
  //   return;
  // }
  // data[row][column] = 1;
  // const validCell = isValid(row, column, data);
  // target.textContent = "st";
  // target.className = `cell el-1 ${validCell ? "" : "invalid-cell"}`;
  // counter++;
  // counterSpan.textContent = counter;
}

const drawArea = document.getElementById("drawArea");
const counterSpan = document.getElementById("counterSpan");

let counter = 0;
const data = [];

for (let i = 0; i < ROW; i++) {
  const row = [];
  for (let j = 0; j < COLUMN; j++) {
    const value = 0;
    row.push(value);
    const cell = document.createElement("div");
    cell.id = `${i}-${j}`;
    cell.className = `cell el-${value}`;
    cell.textContent = "";
    drawArea.appendChild(cell);
  }
  data.push(row);
}

counterSpan.textContent = counter;

drawArea.addEventListener("mouseover", (e) => {
  // console.log(e);
  draw(e);
  // console.log(JSON.stringify(data));
});

drawArea.addEventListener("click", (e) => {
  draw(e);
});
