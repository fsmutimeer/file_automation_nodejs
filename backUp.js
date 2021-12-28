const fs = require('fs');
const url = require('url')
const urlRegex = require('url-regex');

let replacedDomain = [];
let input = 'www.lescapadealascaux.com';
let replace = 'www.ahbonuskaart.net'
var array = fs.readFileSync('redirects.txt', 'utf-8').toString().split("\n");
for (i in array) {

    array.forEach(func);
}

function func(item, index) {
    var newList = (item.replace(input, replace).trim());
    replacedDomain.push(newList);

}

if (fs.existsSync('replaced.txt')) {
    console.log('Found file');
    return
}
var file = fs.createWriteStream('replaced.txt');

file.on('error', function(err) { /* error handling */ });
replacedDomain.forEach(function(v) { file.write(v + '\n'); });
file.end();
// console.log(replacedDomain)