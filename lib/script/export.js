'use strict';

var fs = require('fs');
var path = require('path');

function writeFile(filePath, components) {
  var codes = components.map(function (c) {
    return 'export ' + (c[0].toUpperCase() === c[0] ? '{ default as ' + c + ' }' : '*') + ' from \'./' + c + '\';';
  });

  fs.writeFile(filePath, codes.join('\n'), function (errWrite) {
    if (errWrite) {
      console.log('write err', errWrite);
      return;
    }

    console.log('writing successful');
  });
}

fs.readdir(path.join(__dirname, '../components'), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var components = files.filter(function (f) {
    return ['index.js', 'm', 'style'].indexOf(f) === -1;
  }).map(function (f) {
    return f.replace(/\.jsx/, '');
  });

  writeFile(path.resolve(__dirname, '../components/index.js'), components);
});

fs.readdir(path.join(__dirname, '../components/m'), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var components = files.filter(function (f) {
    return ['index.js', 'style'].indexOf(f) === -1;
  }).map(function (f) {
    return f.replace(/\.jsx/, '');
  });

  writeFile(path.resolve(__dirname, '../components/m/index.js'), components);
});