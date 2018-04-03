const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '../components'), (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = files
    .filter(f => ['m', 'style'].indexOf(f) === -1)
    .map(f => f.replace(/\.jsx/, ''));

  const codes = components.map(c => `import ${c} from './components/${c}';`);

  codes.push(`\nexport {\n${components.map(c => `  ${c},`).join('\n')}\n};\n`);

  console.log(codes);

  fs.writeFile(path.resolve(__dirname, '../index.js'), codes.join('\n'), (errWrite) => {
    if (errWrite) {
      console.log('write err', errWrite);
      return;
    }

    console.log('writing successful');
  });
});
