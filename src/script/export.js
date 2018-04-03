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

  const codes = components.map(c => `export ${c} from './components/${c}';`);

  console.log(codes);

  fs.writeFile(path.resolve(__dirname, '../index.js'), codes.join('\n'), (err) => {
    if (err) {
      console.log('write err', err);
      return;
    }

    console.log('writing successful');
  });
});
