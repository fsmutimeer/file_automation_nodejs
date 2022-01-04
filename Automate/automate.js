const fs = require('fs');
const url = require('url');

var domainList = [];
var filteredList = [];
var readyList = [];

//Read and write to inmemory/list/domainList
const readFile = async() => {
    try {
        let domains = await fs.promises.readFile('../redirects.txt', 'utf-8');
        domains = domains.split('\n');
        // console.log(domains)

        let replacerFile =await fs.promises.readFile('../replace.txt', 'utf-8');
        replacerFile = replacerFile.split('\n')

        getDomain(domains, replacerFile)

    } catch (error) {
        console.log(error)
    }
}

//get the domain

const getDomain = async(domains, replacerFile) => {
    try {
        // console.log(domainList[0].length);
        let length = domains.length;
        let urlPath;
        let newUrl;
        let replacer;
        let domain;

        for (let line = 0; line < length; line++) {
            urlPath = domains[line]
            urlPath = urlPath.split('=');
       
            urlPath.forEach(element => {

                let ele = element ? element : ''
                newUrl = url.parse(ele).hostname;
                if (newUrl !== null) {
                    filteredList.push(newUrl)
                }
            });
        }
        //for loop for domain list
        let newDomain;
        let count = 0;
        let replacerME=findMostFrequent(filteredList);
        for(let j = 0; j < replacerFile.length; j++)
        {
            console.log(j)
        }
        for(let i = 0; i < length; i++)
        {
            let url = domains[i];
            newDomain = url.replace(replacerME, 'ferozshahmutimeer.com');
            // console.log(newDomain)
        }

    } catch (error) {
        console.log(error)
    }
}

//find most frequent 
function findMostFrequent(arr) {
    let mf = 1;
    let m = 0;
    let item;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                m++;
                if (m > mf) {
                    mf = m;
                    item = arr[i];
                }

            }
        }
        m = 0;
    }
    return item;
}



readFile()


// //main function 
// (function() {
//     //calling the readFile
//     readFile()
//         //calling getDoamin
// }())