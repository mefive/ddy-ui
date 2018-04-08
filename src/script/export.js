const fs = require('fs');
const path = require('path');

function writeFile(filePath, components, componentPrefix = '') {
  const codes = components.map(c => `import ${c} from './components${componentPrefix}/${c}';`);

  codes.push(`\nexport {\n${components.map(c => `  ${c},`).join('\n')}\n};\n`);

  console.log(codes);

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
    .filter(f => ['m', 'style'].indexOf(f) === -1)
    .map(f => f.replace(/\.jsx/, ''));

  writeFile(path.resolve(__dirname, '../index.js'), components);
});

fs.readdir(path.join(__dirname, '../components/m'), (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = files
    .map(f => f.replace(/\.jsx/, ''));

  writeFile(path.resolve(__dirname, '../m.js'), components, '/m');
});
