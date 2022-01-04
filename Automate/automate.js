const fs = require('fs');
const url = require('url');

var domainList = [];
var filteredList = [];
var readyList = [];

//Read and write to inmemory/list/domainList
const readFile = async() => {
    try {
        var text = fs.readFileSync('../redirects.txt', 'utf-8');
        var textByLine = text.split('\n')

        var textFile2 = fs.readFileSync('../replace.txt', 'utf-8');
        var textByLine2 = textFile2.split('\n')



        getDomain(textByLine, textByLine2)

    } catch (error) {
        console.log(error)
    }
}

//get the domain

const getDomain = async(textByLine, textFile2) => {
    try {
        // console.log(domainList[0].length);
        var length = textByLine.length;
        let urlPath;
        let newUrl;

        // for (let a = 0; a < textFile2.length; a++) {
        //     replacer = textFile2[a];
        //     // console.log(replacer);
        //     for (let i = 0; i < textByLine.length; i++) {
        //         var text = textByLine[i];
        //         var text = text.replace(text, replacer);
        //         console.log(text);
        //     }
        // }

        // var text = textByLine[0];
        // var text = text.replace("www.lescapadealascaux.com", "ali@www.com");
        // console.log(text);





        // for (let line = 0; line < length; line++) {
        //     console.log(textByLine[line]);
        // }

        // console.log("this is list index  0", domainList[0])
        // for (let line = 0; line < length; line++) {
        //     urlPath = domainList[line]
        //     urlPath = urlPath.split('=');
        //     // console.log(line, 'line =>', urlPath);
        //     // console.log(urlPath);
        //     urlPath.forEach(element => {

        //         let ele = element ? element : ''
        //         newUrl = url.parse(ele).hostname;
        //         if (newUrl !== null) {
        //             filteredList.push(newUrl)
        //         }
        //     });

        // }
        // console.log(filteredList);
        // console.log('most frequent domain is ', findMostFrequent(filteredList));

    } catch (error) {
        console.log(error)
    }
}

//find most frequent 
function findMostFrequent(arr) {
    let mf = 1;
    let m = 0;
    let item;
    let count = 0;
    let result;
    // console.log('array length is', arr.length)

    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                m++;
                if (m > mf) {
                    mf = m;
                    item = arr[i];
                    domainList[0].map(function(domain) {
                        result = (domain.replace(item, 'www.ferozshahmutimeer.com'));
                        readyList.push(result)
                    });
                }

            }
        }
        m = 0;
    }
    fs.writeFile('mynewtextfileferoz.txt', readyList.toString(), 'utf-8', function(err) {
        if (err) return console.log(err);
        console.log('writtng to new file, succeded')
    })
    return item;
}



readFile()


// //main function 
// (function() {
//     //calling the readFile
//     readFile()
//         //calling getDoamin
// }())