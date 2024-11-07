function findSliced(string , starting , ending)
{
    let myArray = new Array();


      for(i=starting ; i<=ending ; i++)
        {
           console.log (string[i]);
          
        }
    
}







let str = "This is a test string.";

let start = 1;
let end = 3;

let slice = findSliced(str , start , end);

console.log(` "${slice}" is found.`);