const fs = require('fs');
const url = require('url');

var domainList = [];
var filteredList = [];

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
        if (error.code === 'ENOENT') {
            return console.log('file does not exist!!!')
        }
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
        let count = 1;
        let replacerDomain;
        let replacerME=findMostFrequent(filteredList);
        console.log();
        console.log(`------------------------Replacer Started-----------------------`);
        console.time('start time');
        console.log()
        console.log(`Total ${replacerFile.length} domains found in the replacer file!`);
        console.log(`Total ${length} URLs found in the domains file!`);
        console.log(`${length} files will be replaced...`);


        for(let j = 0; j < replacerFile.length; j++)
        {
            //get the replacer domain
            replacerDomain = replacerFile[j];
            replacerDomain =extractHostname(replacerDomain)
            
            
                for(let i = 0; i < length; i++)
                {
                    let url = domains[i];
                    newDomain = url.replace(replacerME, replacerDomain);
                    domainList.push(newDomain)
                }

                let filename ='domain_'+count++ +'_' + new Date().getTime() + '.txt'
                filename = filename.toString()
                // when the domain iw written the write to file
               

                fs.writeFile(filename, domainList.toString(), 'utf-8', function(err) {
                    if (err) return console.log(err);
                });
               
                //empty the list for the next domain
                domainList = [];

        }
        console.log(`${length} files replaced...`);


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


function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    // let url = x ? x : ''
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];


    //find & remove "?"
    // hostname = hostname.split('?')[0];
    // hostname = hostname.split('&')[0];
    // hostname = hostname.split('=')[0];
    // hostname = extractDomain(hostname)

    return hostname;
}

readFile()


// //main function 
// (function() {
//     //calling the readFile
//     readFile()
//         //calling getDoamin
// }())