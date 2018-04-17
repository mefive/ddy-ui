const fs = require('fs');
const path = require('path');

const exclude = ['style', 'm', 'index.js', 'm.js', 'utils', 'fonts', 'script'];

function writeFile(filePath, components, prefix = '') {
  const codes = components.map(c => `export ${c[0].toUpperCase() === c[0] ? `{ default as ${c} }` : '*'} from './${prefix}${c}';`);

  fs.writeFile(filePath, `${codes.join('\n')}\n`, (errWrite) => {
    if (errWrite) {
      console.log('write err', errWrite);
      return;
    }

    console.log('writing successful');
  });
}

fs.readdir(path.join(__dirname, '../'), (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = files
    .filter(f => exclude.indexOf(f) === -1)
    .map(f => f.replace(/\.jsx/, ''));

  writeFile(path.resolve(__dirname, '../index.js'), components);
});

fs.readdir(path.join(__dirname, '../m'), (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = files
    .filter(f => exclude.indexOf(f) === -1)
    .map(f => f.replace(/\.jsx/, ''));

  writeFile(path.resolve(__dirname, '../m.js'), components, 'm/');
});
