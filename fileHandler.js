const fs = require('fs');

//global variables //getuserinput //samples
let search = 'www.lescapadealascaux.com';
let input = 'www.ferozshah.net';


const replacer = new RegExp(search, 'g');

//get the file or get from user
var file = 'redirects.txt';

//name the file
var newFile = 'mynewfile.txt';

//temp array
var replacedURLs = [];

const fileHandling = async() => {
        try {
            //read the file 
            const contents = await fs.promises.readFile(file, 'utf-8');

            //push into temp array
            replacedURLs.push(contents)

            //get and write to file
            replacedURLs.forEach(func);

            //callback function
            function func(item) {
                var result = (item.replace(replacer, input).trim());
                fs.writeFile(newFile, result, 'utf-8', function(err) {
                    if (err) return console.log(err);
                })
            }


        } catch (error) {
            if (error.code === 'ENOENT') {
                return console.log('file does not exist!!!')
            }
            console.log(error)

        }
    }
    //call the function
fileHandling();