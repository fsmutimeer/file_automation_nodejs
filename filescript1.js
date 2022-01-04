let psl = require('psl');
const fs = require('fs')
const readLine = require('readline');
const url = require('url')
const extractDomain = require("extract-domain");
// let url = 'http://www.youtube.com/watch?v=ClkQA2Lb_iE';
// console.log(psl.get(extractHostname(url))); // returns youtube.com


const input = fs.createReadStream('redirects.txt');

var readFile = readLine.createInterface({
    input: input,
    terminal: false
})
var count = 0;
readFile.on('line', function(line) {

    let newPath = url.parse(line).path





    console.log(newPath)



})






// function extractHostname(url) {
//     var hostname;
//     //find & remove protocol (http, ftp, etc.) and get hostname

//     if (url.indexOf("//") > -1) {
//         hostname = url.split('/')[2];
//     } else {
//         hostname = url.split('/')[0];
//     }

//     //find & remove port number
//     hostname = hostname.split(':')[0];```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//     //find & remove "?"
//     hostname = hostname.split('?')[0];

//     return hostname;
// }