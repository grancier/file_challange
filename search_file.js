const fs = require('fs')
const appName = /[^/]*$/.exec(process.argv[1])[0];;
const args = process.argv.slice(2);

// Print usage help.
const printUsage = () => {
  console.log(`Usage: node ${appName} <file> <search> <replacement>`)
}

// Validate argument length
if (args.length < 2 || args[0] === '-h') {
  printUsage();
}

const replaceString = (fileName, search, replacement) => {
  const regexSearch = new RegExp(search, "g");

  fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const count = (data.match(regexSearch) || []).length;
    if (replacement) {
      const result = data.replace(regexSearch, replacement);
      fs.writeFile('new.txt', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
      console.log(`Replaced ${count} occurrences of ${search} with ${replacement} in ${fileName}.`)
    }
    else {
      console.log(`Found ${count} occurrences of ${search} in ${fileName}.`)
    }

  });

}

const fileName = args[0];
const search = args[1];
const replacement = args[2];

replaceString(fileName, search, replacement || "");





