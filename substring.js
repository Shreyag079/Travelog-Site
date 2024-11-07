function countOccurrences(string, group) {
    
    let count = 0;
    //let position = string.indexOf(group);

    for(i=0 ; i<string.length ; i++)
    {
        if(string[i] == group[0])
            {

                for(j=1 ; j<group.length ; j++)
                 {
                          if(string[i+j]==group[j])
                            {
                                console.log(string[i+j]);
                                if(j==group.length-1)
                                    {
                                        count++;
                                        //console.log("The position of " +group+ " is- " +i+1);
                                       
        
                                    }
                                
                            }
                            else break;

                          
                            
                 }
                 
                 
            }
            

    }
    
    
    return count;

}


let str = "This is test string and it is just the test string for testing the test.";
//let str = "This is a test string.";

let groupOfLetters = "is";

let occurrences = countOccurrences(str, groupOfLetters);

console.log(` "${groupOfLetters}" occurs ${occurrences} times in the string.`);
 
