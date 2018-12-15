const table = require('table');
let gameThree = require('./3x3table');
let gameFour = require('./4x4table');
let gameFive = require('./5x5table');
let keypress = require('keypress');
let testGame = require('./test');
keypress(process.stdin);

const choose = () => {
  let chooseTable = [
    ['For table 3x3', 'Press a '],
    ['For table 4x4', 'Press b '],
    ['For table 5x5', 'Press c ']
  ];

  let chooseTableconfig = {
    columns: {
      0: {
        alignment: 'center'
      }
    }
  };

  let chooseTableView = table.table(chooseTable, chooseTableconfig);
  console.log(chooseTableView);
  process.stdin.on('keypress', function (c, key) {
    if (key.name === 'a') {
      console.clear(chooseTableView);
      gameThree.gameArea();
      gameThree.stepping();
    } else if (key.name === 'b') {
      console.clear(chooseTableView);
      gameFour.gameArea();
      gameFour.stepping();
    } else if (key.name === 'c') {
      console.clear(chooseTableView);
      gameFive.gameArea();
      gameFive.stepping();
    } else if (key.name === 'x') {
      process.exit(true);
    }
  });
};

const start = () => {
  console.clear();
  let startTabledata = [
    ['Sliding Puzzle'],
    ['Netti Rencsó Dancsa Entertainment'],
    ['@2018'],
    ['Press S to start'],
    ['For TEST press T']
  ];
  let startTableconfig = {
    columns: {
      0: {
        alignment: 'center'
      }
    }
  }

  let startTableView = table.table(startTabledata, startTableconfig);
  console.log(startTableView);
  process.stdin.on('keypress', function (c, key) {
    if (key.name === 's') {
      console.clear(startTableView);
      choose();
    } else if (key.name === 't') {
      console.clear(startTableView);
      testGame.gameArea();
      testGame.stepping();
    } else if (key.name === 'x') {
      process.exit(true);
    }
  });
};

module.exports = { 
  start
};
