const fs = require('fs');

//global variables //getuserinput //samples
let search = 'www.lescapadealascaux.com';
let input = 'www.ferozshah.net';


const replacer = new RegExp(search, 'g');

//get the file or get from user
var file = 'redirects.txt';
var replaceFils = 'replace.txt';

//name the file
let newFile = 'mynewfile.txt';

//temp array
var replacedURLs = [];
var replaceDomainsList = [];
var allUrls = [];

const fileHandling = async() => {
        try {
            //read the file 
            const contents = await fs.promises.readFile(file, 'utf-8');
            let replaceDomains = await fs.promises.readFile(replaceFils, 'utf-8');
            replaceDomains = replaceDomains.split('\n')
            replaceDomainsList.push(replaceDomains)
            replacedURLs.push(contents)

            for (let c of replaceDomainsList[0]) {

                // for(let d of replacedURLs[0])

                replacedURLs.forEach(function(item) {

                    var result = (item.replace(replacer, c).trim());
                    // allUrls.push(result)
                    // console.log(newFile !== null)

                    fs.existsSync(newFile, function(exists) {
                        if (exists) {
                            // Create a file
                        } else {
                            fs.writeFile(newFile + new Date() + '.txt', result, 'utf-8', function(err) {
                                if (err) return console.log(err);
                                console.log('file created')
                            })
                        }
                    });





                })

            }


            // domains.forEach(domain => {
            //replace each domain in the lis
            //end replace each domain
            // replacedURLs.forEach(function(item) {

            //     var result = (item.replace(replacer, domain).trim());
            //     allUrls.push(result)

            //     fs.writeFile(newFile + Date.now().txt, result, 'utf-8', function(err) {
            //         if (err) return console.log(err);
            //     })
            // })

            // console.log(count++, ' => ', domain)


            // replacedURLs.forEach(function func(item) {

            //         var result = (item.replace(replacer, data).trim());
            //         allUrls.push(result)

            //         // fs.writeFile(newFile + Date.now().txt, result, 'utf-8', function(err) {
            //         //     if (err) return console.log(err);
            //         // })
            //     }),



            // replaceDomainsList.map(urls => console.log('---------->', urls))

            //push into temp array
            // replacedURLs.push(contents)

            //get and write to file
            // replacedURLs.forEach(func);

            //callback function
            // function func(item) {
            //     var result = (item.replace(replacer, input).trim());
            //     fs.writeFile(newFile, result, 'utf-8', function(err) {
            //         if (err) return console.log(err);
            //     })
            // }
            // console.log(allUrls)
            // console.log(replacedURLs[0])


        } catch (error) {
            if (error.code === 'ENOENT') {
                return console.log('file does not exist!!!')
            }
            console.log(error)

        }
    }
    //call the function
fileHandling();