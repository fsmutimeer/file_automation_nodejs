var str = ['This is a test,          ']; 

function removeLastComma(strng){        
    var n=strng.lastIndexOf(",");
    var a=strng.substring(0,n) 
    return a;
}

console.log(removeLastComma(str))