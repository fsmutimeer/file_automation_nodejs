const fs = require('fs');
const readLine = require('readline');

//global variables
let frequent_word = ""
let frequency = 0
let words = []

const input = fs.createReadStream('redirects.txt');

var readFile = readLine.createInterface({
    input: input,
    terminal: false
})
var count = 0;
readFile.on('line', function(line) {
    // console.log(`${count++} => `, line)
    for (var l in line) {
        var line_word = l.split(" ");
        for (var w in line_word) {
            words.push(w);
        }
    }
})
console.log(words)

function firstRepeatingCharacter(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str.charAt(i)) !== str.lastIndexOf(str.charAt(i))) {
            return str.charAt(i)
        }
    }
    return 'no results found'
}