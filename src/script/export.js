const fs = require('fs');
const path = require('path');

function writeFile(filePath, components) {
  const codes = components.map(c => `export ${c[0].toUpperCase() === c[0] ? `{ default as ${c} }` : '*'} from './${c}';`);

  fs.writeFile(filePath, codes.join('\n'), (errWrite) => {
    if (errWrite) {
      console.log('write err', errWrite);
      return;
    }

    console.log('writing successful');
  });
}

fs.readdir(path.join(__dirname, '../components'), (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = files
    .filter(f => ['index.js', 'm', 'style'].indexOf(f) === -1)
    .map(f => f.replace(/\.jsx/, ''));

  writeFile(path.resolve(__dirname, '../components/index.js'), components);
});

fs.readdir(path.join(__dirname, '../components/m'), (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = files
    .filter(f => ['index.js', 'style'].indexOf(f) === -1)
    .map(f => f.replace(/\.jsx/, ''));

  writeFile(path.resolve(__dirname, '../components/m/index.js'), components);
});
