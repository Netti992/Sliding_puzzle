const tablePackage = require('table');
let keypress = require('keypress');
keypress(process.stdin);

let row = 0;
let coll = 0;

let testArray = [
  [0, 2, 3],
  [1, 5, 6],
  [4, 7, 8]
];

const matrix = () => {
  for (let i = 0; i < testArray.length; i++) {
    for (let j = 0; j < testArray.length; j++) {
      if (testArray[i][j] === 0) {
        testArray[i][j] = ' ';
      }
    }
  }
};

const firsttable = () => {
  matrix();
  let track = tablePackage.table(testArray);
  console.log(track);
};

const gameArea = () => {
  matrix();
  firsttable();
};

const clearArea = () => {
  let gameAreaMatrixLeft = testArray;
  let trackArea = tablePackage.table(gameAreaMatrixLeft);
  console.clear(testArray);
  console.log(trackArea);
};

const moveLeft = () => {
  if (coll <= 1) {
    let tempRight = testArray[row][coll + 1];
    testArray[row][coll + 1] = testArray[row][coll];
    testArray[row][coll] = tempRight;
    clearArea();
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const moveRight = () => {
  if (coll >= 1) {
    let tempLeft = testArray[row][coll - 1];
    testArray[row][coll - 1] = testArray[row][coll];
    testArray[row][coll] = tempLeft;
    clearArea();
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const moveUp = () => {
  if (row <= 1) {
    let tempDown = testArray[row + 1][coll];
    testArray[row + 1][coll] = testArray[row][coll];
    testArray[row][coll] = tempDown;
    clearArea();
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const moveDown = () => {
  if (row >= 1) {
    let tempUp = testArray[row - 1][coll];
    testArray[row - 1][coll] = testArray[row][coll];
    testArray[row][coll] = tempUp;
    clearArea();
  } else {
    clearArea();
    console.log('Wrong Way! Need new order. ');
  }
};

const findNull = () => {
  for (row = 0; row < testArray.length; row++) {
    for (coll = 0; coll < testArray[row].length; coll++) {
      let actualElement = testArray[row][coll];
      if (actualElement === ' ') {
        return;
      }
    }
  }
};

const stepping = () => {
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
    } else if (key.name === 'x') {
      process.exit(true);
    } else {
      console.log('Wrong order, try again!');
    }
  });
};

const end = () => {
  let result = true;
  let number = 1;
  for (let i = 0; i < testArray.length; i++) {
    for (let j = 0; j < testArray.length; j++) {
      if (testArray[i][j] !== number) {
        result = false;
      }
      if (i === testArray.length - 1 && j === testArray.length - 1 && testArray[i][j] === ' ') {
        result = true;
      }
      number++;
    }
  } return result;
};

const writeifend = () => {
  if (end()) {
    console.clear(testArray);
    let chooseTable = [
      ['You solved it!'],
      ['You are a HERO!'],
      ['Press X to EXIT']
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
