const fs = require('fs');
const url = require('url');

var domainFile = '../redirects.txt';
var replacerDomains = '../replace.txt';


var domainList = [];
var filteredList = [];

//main function
const autoReplacer = async() => {
    try {
        //get the file containing all domains - from where the selective domains to replace
        let domains = await fs.promises.readFile(domainFile, 'utf-8');
        domains = domains.split('\n');

        //get the list of domains to place in the above file
        let replacerFile =await fs.promises.readFile(replacerDomains, 'utf-8');
        replacerFile = replacerFile.split('\n')

        //call the function => pass the two files 
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

        let length = domains.length;
        let urlPath;
        let newUrl;

       //get the domains and push to the
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
        let replacerME=findTheDomainToReplace(filteredList);

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
            replacerDomain =extractDomain(replacerDomain)
                for(let i = 0; i < length; i++)
                {
                    let url = domains[i];
                    newDomain = url.replace(replacerME, replacerDomain);
                    domainList.push(newDomain)
                }
                
                let filename ='domain_'+count++ +'_' + new Date().getTime() + '.txt'
                filename = filename.toString();
                fs.writeFile(filename, domainList.join('\n').toString(), 'utf-8', function(err) {
                    if (err) return console.log(err);
                });
            
                //empty the list for the next domain
                domainList = [];

        }
        console.log(`${length} files replaced successfully`);


    } catch (error) {
       
        console.log(error)
    }
}

//find most frequent 
function findTheDomainToReplace(domain) {
    let mf = 1;
    let m = 0;
    let item;
    for (let i = 0; i < domain.length; i++) {
        for (let j = i; j < domain.length; j++) {
            if (domain[i] == domain[j]) {
                m++;
                if (m > mf) {
                    mf = m;
                    item = domain[i];
                }
            }
        }
        m = 0;
    }
    return item;
}

//extract the domain from the replacer file
function extractDomain(url) {
    var domain;
    if (url.indexOf("//") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

//call the main function
autoReplacer()