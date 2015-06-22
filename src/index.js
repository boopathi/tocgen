import fsOrig from 'fs';
import Promise from 'bluebird';
import anchor from 'anchor-markdown-header';
import path from 'path';
import 'babel/polyfill';

const fs = Promise.promisifyAll(fsOrig);

const exts = ['.md', '.markdown'];
const start = '<!-- START table-of-contents -->';
const end = '<!-- END table-of-contents -->';
const heads = [
  /^<!-- heading:(.*)-->/,
  /^#####(.*)/
];

function matchesStart(line) {
  return (/<!-- START table-of-contents/).test(line);
}

function matchesEnd(line) {
  return (/<!-- END table-of-contents/).test(line);
}

function bufferToString(buf) {
  return buf.toString();
}

function parseHeadings(contents) {
  let lines = contents.split('\n');
  let headings = [
    start,
    '**Table of Contents**',
    ''
  ];
  let repMap = {};
  let [startIndex, endIndex] = [0, 0];

  lines.map(function(line, lineno) {
    heads.map(function(rx, i) {
      let match = line.match(rx);
      if(match) {
        let h = match[1].trim();
        if (!repMap.hasOwnProperty(h)) repMap[h] = 0;
        else repMap[h]++;
        if (i===0) headings.push('+ ' + h);
        else headings.push('  '.repeat(i) + '+ ' + anchor(h, 'github.com', repMap[h]));
      }
    });
    if (!startIndex && matchesStart(line)) startIndex = lineno;
    if (!endIndex && matchesEnd(line)) endIndex = lineno;
  });
  headings.push('');
  headings.push(end);

  // replace table of contents
  lines.splice(startIndex, endIndex - startIndex + 1);

  headings.map(function(h, i) {
    lines.splice(startIndex+i, 0, h);
  });

  return lines.join('\n');
}

function readFromFile(file) {
  return function() {
    return fs.readFileAsync(file);
  }
}

function writeToFile(file) {
  return function(contents) {
    return fs.writeFileAsync(file, contents);
  };
}

export default function(file) {
  return new Promise((resolve,reject) => {
      if (exts.indexOf(path.extname(file)) !== -1) resolve();
      else reject(new Error('Invalid Path'));
    })
    .then(readFromFile(file))
    .then(bufferToString)
    .then(parseHeadings)
    .then(writeToFile(file));
}
