'use strict';

var fs = require('fs');
var path = require('path');

var exclude = ['style', 'm', 'index.js', 'm.js', 'utils', 'fonts', 'script'];

function writeFile(filePath, components) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var codes = components.map(function (c) {
    return 'export ' + (c[0].toUpperCase() === c[0] ? '{ default as ' + c + ' }' : '*') + ' from \'./' + prefix + c + '\';';
  });

  fs.writeFile(filePath, codes.join('\n') + '\n', function (errWrite) {
    if (errWrite) {
      console.log('write err', errWrite);
      return;
    }

    console.log('writing successful');
  });
}

fs.readdir(path.join(__dirname, '../'), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var components = files.filter(function (f) {
    return exclude.indexOf(f) === -1;
  }).map(function (f) {
    return f.replace(/\.jsx/, '');
  });

  writeFile(path.resolve(__dirname, '../index.js'), components);
});

fs.readdir(path.join(__dirname, '../m'), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var components = files.filter(function (f) {
    return exclude.indexOf(f) === -1;
  }).map(function (f) {
    return f.replace(/\.jsx/, '');
  });

  writeFile(path.resolve(__dirname, '../m.js'), components, 'm/');
});