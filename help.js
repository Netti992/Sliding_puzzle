const tablePackage = require('table');

const help = () => {
  let helpTableContent = [
    ['Arrow up', 'Move up'],
    ['Arrow Left', 'Move Left'],
    ['Arrow Right', 'Move Right'],
    ['Arriw Down', 'Move Down'],
    ['H', 'Help'],
    ['X', 'Exit']
  ];
  let helpTable = tablePackage.table(helpTableContent);
  console.log(helpTable);
  return help;
};

module.exports = help;
