import program from 'commander';
import {version} from './package.json';
import 'colors';
import tocgen from './';

program
  .version(version)
  .parse(process.argv);

var promises = program.args.map(function(file) {
  return tocgen(file)
    .then(function() {
      console.log('Success'.green + ': ' + file);
    })
    .catch(function(e) {
      console.log('Failed'.red + ': ' + file);
      return Promise.resolve(e);
    });
});

Promise
  .all(promises)
  .then(function(output) {
    let errors = output.filter(function(o) {
      return o instanceof Error;
    });
    if (errors.length > 0) console.log('Tocgen failed for some files'.red);
    else console.log('Tocgen successfully completed for all files'.green);
  });
