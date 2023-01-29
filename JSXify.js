const { readFile } = require('fs/promises');

async function stringifyInput(path) {
  return await readFile(path, 'utf8').then(svg => svg);
}

const inputString = stringifyInput('/Users/satori/iCloud Drive (Archive)/Desktop/AppAcademy/My_Cohort/MOD4/Project1/athenticate/authenticate-me/frontend/public/createSpot/search-icon-pink.svg');
const resolved = inputString.then(function(res) {
  const string = JSON.stringify(res);

  
})
