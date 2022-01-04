const fs = require('fs');
const url = require('url')
var file = 'redirects.txt';
const extractDomain = require("extract-domain");

//temp array
var domainList = [];

const fileHandling = async() => {
        try {
            //read the file 
            const contents = await (await fs.promises.readFile(file, 'utf-8')).split('\n');

            //push into temp array
            domainList.push(contents)

            console.log(contents)



        } catch (error) {
            if (error.code === 'ENOENT') {
                return console.log('file does not exist!!!')
            }
            console.log(error)

        }
    }
    //call the function
fileHandling();

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}