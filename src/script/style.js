const fs = require('fs');
const path = require('path');

// function writeFile(filePath, components, prefix = '') {
//   const codes = components.map(c => `export ${c[0].toUpperCase() === c[0] ? `{ default as ${c} }` : '*'} from './${prefix}${c}';`);
//
//   fs.writeFile(filePath, `${codes.join('\n')}\n`, (errWrite) => {
//     if (errWrite) {
//       console.log('write err', errWrite);
//       return;
//     }
//
//     console.log('writing successful');
//   });
// }


function writeFile(components) {
  const codes = components.map(c => `import '../../${c}/style/index.scss';`);

  fs.writeFile(path.resolve(__dirname, '../style/components/index.js'), `${codes.join('\n')}\n`, (errWrite) => {
    if (errWrite) {
      console.log('write err', errWrite);
      return;
    }

    console.log('writing successful');
  });
}

fs.readdir(path.join(__dirname, '../'), (err, dirs) => {
  if (err) {
    console.log(err);
    return;
  }

  const components = [];

  let { length } = dirs;

  const tryWrite = () => {
    if (length === 0) {
      writeFile(components);
    }
  };

  dirs.forEach((dir) => {
    fs.readdir(path.join(__dirname, '../', dir), (e, sub) => {
      length -= 1;

      if (e) {
        tryWrite();
        return;
      }

      if (sub.indexOf('style') !== -1) {
        components.push(dir);
      }

      tryWrite();
    });
  });

  // const components = files
  //   .filter(f => exclude.indexOf(f) === -1)
  //   .map(f => f.replace(/\.jsx/, ''));

  // writeFile(path.resolve(__dirname, '../index.js'), components);
});
