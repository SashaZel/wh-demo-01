console.log("hello");

const ROW = 10;
const COLUMN = 10;

function isValid(row, column, data) {
  if (row === 0 || column === 0 || row === (ROW - 1) || column === (COLUMN - 1)) {
    return false;
  }
  // Like a clock 
  const neib12 = data[row-1][column];
  const neib1 = data[row-1][column+1];
  const neib3 = data[row][column+1];
  const neib5 = data[row+1][column+1];
  const neib6 = data[row+1][column];
  const neib7 = data[row+1][column-1];
  const neib9 = data[row][column-1];
  const neib11 = data[row-1][column-1];
  
  const neibArr = [neib12, neib1, neib3, neib5, neib6, neib7, neib9, neib11];
  const onlyOnes = neibArr.filter((e) => e === 1);
  if (onlyOnes.length > 2) {
    return false;
  }
  // const top = row === 0 ? 0 : row-1;
  // const bottom = row === (ROW - 1) ? (ROW - 1) : (row + 1);
  // const left = column === 0 ? 0 : (column - 1);
  // const right = column === (COLUMN - 1) ? (COLUMN - 1) : (column + 1);
  // if (
  //   data[top][column] === 1 ||
  //   data[bottom][column] === 1 ||
  //   data[row][left] === 1 ||
  //   data[row][right] === 1
  // ) {
  //   return false;
  // }
  return true;
}

const drawArea = document.getElementById("drawArea");
const counterSpan = document.getElementById("counterSpan")

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

drawArea.addEventListener("click", (e) => {
  const target = e.target;
  const textContent = target.textContent;
  const [row, column] = target.id.split("-").map((e) => Number(e));
  if (textContent === "st") {
    data[row][column] = 0;
    target.className = "cell el-0";
    target.textContent = "";
    counter--;
    counterSpan.textContent = counter;
    return;
  }
  data[row][column] = 1;
  const validCell = isValid(row, column, data);
  target.textContent = "st";
  target.className = `cell el-1 ${validCell ? "" : "invalid-cell"}`;
  counter++;
  counterSpan.textContent = counter;
  // console.log(JSON.stringify(data));
})
