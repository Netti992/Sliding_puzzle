const tablePackage = require('table');
let help = require('./help');
let keypress = require('keypress');
keypress(process.stdin);

let gameAreaMatrix3 = [];
let pickedNumber;
let possibleNumbers = [];
let row = 0;
let coll = 0;

const matrix = () => {
  for (let i = 0; i < 25; i++) {
    possibleNumbers[i] = i;
    if (possibleNumbers[i] === 0) {
      possibleNumbers[i] = ' ';
    }
  }
};

const generator = () => {
  matrix();
  for (let y = 0; y <= 4; y++) {
    gameAreaMatrix3[y] = [];
    for (let x = 0; x <= 4; x++) {
      pickedNumber = Math.floor(Math.random() * (possibleNumbers.length));
      gameAreaMatrix3[y][x] = possibleNumbers[pickedNumber];
      possibleNumbers.splice(pickedNumber, 1);
    }
  }
  let track = tablePackage.table(gameAreaMatrix3);
  console.log(track);
};

const gameArea = () => {
  matrix();
  generator();
};

const clearArea = () => {
  let gameAreaMatrixLeft = gameAreaMatrix3;
  let trackArea = tablePackage.table(gameAreaMatrixLeft);
  console.clear(gameAreaMatrix3);
  console.log(trackArea);
};

const moveLeft = () => {
  if (coll <= 3) {
    let tempRight = gameAreaMatrix3[row][coll + 1];
    gameAreaMatrix3[row][coll + 1] = gameAreaMatrix3[row][coll];
    gameAreaMatrix3[row][coll] = tempRight;
    clearArea();
    console.log('For HELP press H');
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const moveRight = () => {
  if (coll >= 1) {
    let tempLeft = gameAreaMatrix3[row][coll - 1];
    gameAreaMatrix3[row][coll - 1] = gameAreaMatrix3[row][coll];
    gameAreaMatrix3[row][coll] = tempLeft;
    clearArea();
    console.log('For HELP press H');
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const moveUp = () => {
  if (row <= 3) {
    let tempDown = gameAreaMatrix3[row + 1][coll];
    gameAreaMatrix3[row + 1][coll] = gameAreaMatrix3[row][coll];
    gameAreaMatrix3[row][coll] = tempDown;
    clearArea();
    console.log('For HELP press H');
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const moveDown = () => {
  if (row >= 1) {
    let tempUp = gameAreaMatrix3[row - 1][coll];
    gameAreaMatrix3[row - 1][coll] = gameAreaMatrix3[row][coll];
    gameAreaMatrix3[row][coll] = tempUp;
    clearArea();
    console.log('For HELP press H');
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const findNull = () => {
  for (row = 0; row < gameAreaMatrix3.length; row++) {
    for (coll = 0; coll < gameAreaMatrix3[row].length; coll++) {
      let actualElement = gameAreaMatrix3[row][coll];
      if (actualElement === ' ') {
        return;
      }
    }
  }
};

const stepping = () => {
  console.log('For HELP press H');
  process.stdin.on('keypress', function (c, key) {
    if (key.name === 'left') {
      findNull();
      moveLeft();
      writeifend();
    } else if (key.name === 'right') {
      findNull();
      moveRight();
      writeifend();
    } else if (key.name === 'down') {
      findNull();
      moveDown();
      writeifend();
    } else if (key.name === 'up') {
      findNull();
      moveUp();
      writeifend();
    } else if (key.name === 'h') {
      help();
    } else if (key.name === 'x') {
      process.exit(true);
    }
  });
};

const end = () => {
  let result = true;
  let number = 1;
  for (let i = 0; i < gameAreaMatrix3.length; i++) {
    for (let j = 0; j < gameAreaMatrix3.length; j++) {
      if (gameAreaMatrix3[i][j] !== number && gameAreaMatrix3[i][j] !== ' ') {
        result = false;
      }
      number++;
    }
  } if (result) {
    if (gameAreaMatrix3[gameAreaMatrix3.length - 1][gameAreaMatrix3.length - 1] === ' ') {
      result = true;
    } else {
      result = false;
    }
  }
  return result;
};

const writeifend = () => {
  if (end()) {
    console.clear(gameAreaMatrix3);
    let chooseTable = [
      ['You are solved it!'],
      ['You are a HERO!'],
      ['Press X if you would like to try a more advance level!']
    ];
    let chooseTableconfig = {
      columns: {
        0: {
          alignment: 'center'
        }
      }
    };
    let chooseTableView = tablePackage.table(chooseTable, chooseTableconfig);
    console.log(chooseTableView);
  }
};

module.exports = {
  gameArea,
  stepping
};
