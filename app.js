const fs = require('fs');
const $path = require('path');
const express = require('express');
const csvParser = require('csv-parser');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 5000;
const publicDir = $path.resolve('./public');
const articlesDir = $path.resolve('./articles');



app.use(express.static('public'));
app.listen(port, () => console.log(`Blog app listening on port ${port}!`));



/*app.get('/publish', (request, response) => {
    let htmlFile = $path.join(publicDir, "publish.html");
    response.sendFile(htmlFile);

  })*/

  
  /*app.post('/articles', express.urlencoded({extended: false}), (request, response) => {

    console.log("post called for /articles");
    let tl = request.body.title;
   console.log("author is " + tl);
   let bd = request.body.body;
   console.log("body is " + bd);

   let fin = tl.concat(" body:",bd);
   var fs = require('fs');
   fs.writeFile('serverfile.txt',"title:" +fin ,function(err){
    if (err) throw err;
    console.log("successful");
   })
   

    createArticle(nextArticleId(), request.body, response)
  })*/

  

  app.get('/articles', (request, response) => {

   console.log("app.get /articles called");
  
    response.sendFile($path.join(publicDir, 'articles.html'))
  })










function articleFilePath(articleId) {
    return $path.join(articlesDir, articleId + ".json");
  }
  


  app.get('/articles/:articleId.json', (request, response) => {
    let filePath = articleFilePath(request.params.articleId);
    response.sendFile(filePath);
  });
  


  app.get('/articles.json', (request, response) => {
    let articles = allArticles();
    let data = JSON.stringify(articles);
    response.type('application/json').send(data);
    console.log(req.articles);
    console.log("string copied in server");
  })





  app.post('/signed', express.urlencoded({extended: false}), (request, response) => {

    console.log("post called for /signed");
    let un = request.body.username;
   console.log("username is " + un);
   let pd = request.body.psw;
   console.log("password is " + pd);
   let em = request.body.email;
   console.log("email is " + em);

   checkSignup('userdata.csv', un, pd, em,(status) => 
    {
       console.log("inside signup function call ");

       if( status == 'd') //username already exists
       {
	   console.log("User already exists "+status);
           response.status(200).json({msg_signup : "User already exists"});
       }
       

       if( status == 's') //signup success
       {
            mkUserFolder(un, (status) =>
            {
            console.log("status value " +status);

            if(status == 1) //ok
              {
            console.log("Sign up successful "+status);
            response.redirect('/signed.html');
              }
              else{
                console.log("error in signup");
              }

            })
          }//if status == 's'

          }); //checksignup
     
     
      }); //end /signedup




//create user folder when signing up

function mkUserFolder(un, callback)
{

//TO CREATE A SEPARATE DIRECTORY FOR EACH USER
const path = "./public/BlogData/" + un;
let status =0;
fs.access(path, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
        status=1;
        callback(status);
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }


});

      }

      


 function checkSignup( userdata, un,pd,em, callback)

 {
    const file = "C:\\Users\\Shreya\\OneDrive\\Documents\\blog site\\travelog\\userdata.csv";
     
    let status = 's';
     console.log("inside callback " + status);
     console.log("Check file " + fs.existsSync(file));

     if (fs.existsSync(file)) 
     {
         console.log('Username: inside signup',un);
         console.log('Password:', pd);
         fs.createReadStream(file)
            .pipe(csvParser())
            .on('data', (row) => {
                 console.log('row.Username:', row.username);
                 console.log('row.Password:', row.password);
                 if (row.username == un ) 
                {
                    console.log("User already exists : ");
                    status = 'd';
                    callback(status);
                }
             
             })
             .on('end', () => {
                  if (status == 's' ) 
          {
                     console.log("inside if : "+status);
                     fs.appendFileSync('userdata.csv', `${un},${pd},${em}\n`);
                     console.log("formData 1 : Sign up successful "+status);
                     callback(status);
              }
             });
          } 
 }



 
 app.use(session({
    secret: '1209',
    resave: false,
    saveUninitialized: true
  }));
  
  

  app.post('/logged', express.urlencoded({extended: false}), (request, response) => {

    console.log("post called for /logged");
    let unm = request.body.uname;
   console.log("username is " + unm);
   let pw = request.body.pwd;
   console.log("password is " + pw);

   if(request.session.user)
    {
      console.log("already logged in ..user in session is "+ request.session.user);
          console.log("Already Logged in");
          response.status(200).json({msg_login : "Already Logged in"});
    }
   else
     {
         
        checkLogin('userdata.csv', unm, pw ,(status) => 
        {
           console.log("inside login function call ");

           if( status == 'f')
           {
          console.log("User does not exists "+status);
              response.status(200).json({msg_login : "User does not exist"});
           }
      
          if( status == 's')
          {
             let user ={ 
                username: unm,
             };
            console.log("user before session is",user);
            request.session.user = unm;
            console.log("session user is "+request.session.user);
         console.log("Login successful "+status);
         response.redirect('/index.html');

       }

          if( status == 'w')
          {
             console.log("Invalid Credentials "+status);
             response.status(200).json({msg_login : "Invalid Credentials"});
          }
       }); 
     }
    // response.redirect('/logged.html');
});


function checkLogin(userdata, unm, pw, callback)
{ 

    const file = "C:\\Users\\Shreya\\OneDrive\\Documents\\blog site\\travelog\\userdata.csv";
   let status = 'f';
   console.log("inside callback for login" +status);
   console.log("Check file "+file);
   console.log("Check file "+fs.existsSync(file));

   
   if (fs.existsSync(file)) 
   {    
       console.log('Username: inside login', unm);
       console.log('Password:', pw);

       
       fs.createReadStream(file)
          .pipe(csvParser())
          .on('data', (row) => {
               console.log('row.Username:', row.username);
               console.log('row.Password:', row.password);
       
       if (row.username == unm ) 
       {
             if (row.password == pw ) 
             {
               status = 's';
                           console.log("Login Successful : "+status);
                   callback(status);
             }
             else
             {
               status = 'w';
               console.log("Invalid Credentials : "+status);
                   callback(status);
             }
               }
           
           })
           .on('end', () => {
                
               if (status == 'f' ) 
               {
                   console.log("inside if : "+status);
                   console.log("formData 1 : User does not exist "+status);
                   callback(status);
               }
           });
        } 
}




app.get('/publish', (request, response) => {
  //let htmlFile = $path.join(publicDir, "publish.html");
  //response.sendFile(htmlFile);
  //response.redirect('/publish.html?BlogID=1');
  

  console.log("/publish called");


 const file = "./public/BlogData/" +request.session.user+ "/UserMasterfile.txt";
 console.log("path of user masterfile  " +file);

   
 
   /*if (fs.existsSync(file)) //author master file 
      {  
        
        let x;
        let id;
        fs.readFile("./public/BlogData/" +request.session.user+ "/UserMasterfile.txt", function(err, data) {
          
          console.log("Masterfile read  " +data);
          x=data.toString();
          let a = x.split("=");
          console.log("Blog ID read- " +a[1]);
          id= parseInt(a[1]);
          id=id+1;
          console.log("checking- " +id);
          CurrentId= id.toString();

          console.log("checking current id- " +CurrentId);

      fs.writeFile("./public/BlogData/" +request.session.user+ "/UserMasterfile.txt","Blog ID=" +CurrentId ,function(err){
        if (err) throw err;
        console.log("successful");
        
      })

    const path1 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/textbox";
    const path2 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/photos";
    const path3 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/videos";
    const path4 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/audio";

    mkBlogFolder(CurrentId,path1,path2,path3,path4);

    response.redirect('/publish.html?BlogID='+CurrentId);
        })
      }
  
  else 
      {
        CurrentId = 1;

        console.log("checking current id- " +CurrentId);

      fs.writeFile("./public/BlogData/" +request.session.user+ "/UserMasterfile.txt","Blog ID=" +CurrentId ,function(err){
        if (err) throw err;
        console.log("successful");
        
      })

    const path1 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/textbox";
    const path2 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/photos";
    const path3 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/videos";
    const path4 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/audio";

    mkBlogFolder(CurrentId,path1,path2,path3,path4);

    response.redirect('/publish.html?BlogID='+CurrentId);
      }  

      
      
    })*/




   if (fs.existsSync(file)) //author master file 
    {  
      
      let x;
      let id;
      fs.readFile("./public/BlogData/" +request.session.user+ "/UserMasterfile.txt", function(err, data) {
        
        console.log("Masterfile read  " +data);
        x=data.toString();
        let a = x.split("=");
        console.log("Blog ID read- " +a[1]);
        id= parseInt(a[1]);
        id=id+1;
        console.log("checking- " +id);
        const CurrentId= id.toString();
      
        request.session.CurrentId = CurrentId;
        console.log("current id= " +request.session.CurrentId);


      fs.writeFile("./public/BlogData/" +request.session.user+ "/UserMasterfile.txt","Blog ID=" +CurrentId ,function(err){
        if (err) throw err;
        console.log("successful");
        
      })

    const path1 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/textbox";
    const path2 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/photos";
    const path3 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/videos";
    const path4 = "./public/BlogData/" +request.session.user+ "/Blog" +CurrentId+ "/audio";

    mkBlogFolder(CurrentId,path1,path2,path3,path4);

    response.redirect('/publish.html?BlogID='+CurrentId);
    })

    }


else

{
  fs.writeFile("./public/BlogData/" +request.session.user+ "/UserMasterfile.txt","Blog ID=1" ,function(err){
    if (err) throw err;
    console.log("successful");


  const path5 = "./public/BlogData/" +request.session.user+ "/Blog1/textbox";
  const path6 = "./public/BlogData/" +request.session.user+ "/Blog1/photos";
  const path7 = "./public/BlogData/" +request.session.user+ "/Blog1/videos";
  const path8 = "./public/BlogData/" +request.session.user+ "/Blog1/audio";

  mkBlogFolder1(path5,path6,path7,path8);
   
  response.redirect('/publish.html?BlogID=1');
  })
     
}

})




function mkBlogFolder(CurrentId,path1,path2,path3,path4)

{

  
fs.access(path1, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path1, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }

});

fs.access(path2, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path2, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }

});

fs.access(path3, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path3, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }

});

fs.access(path4, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path4, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }

});

}


 function mkBlogFolder1(path5,path6,path7,path8)
{

 fs.access(path5, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path5, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }


});

fs.access(path6, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path6, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }


});

fs.access(path7, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path7, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }


});

fs.access(path8, (error) => {
 
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path8, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }


});

}





let j=1;
app.post('/articles', express.urlencoded({extended: false}), (request, response) => {

  console.log("post called for /articles");
  let tl = request.body.title;
 console.log("author is " + tl);
 let bd = request.body.body;
 console.log("body is " + bd);

 let fin = tl.concat(" body:",bd);
 var fs = require('fs');
 fs.writeFile("./" +request.session.user+ "/Blog" +j+ "/textbox content/textfile" +j+ ".txt","title:" +fin ,function(err){
  if (err) throw err;
  console.log("successful");
  
j=j+1;
 })
 
 response.redirect('/articles');
  //createArticle(nextArticleId(), request.body, response)
})




  
  
  function createArticle(articleId, params, response) {
    let article = {
      id: articleId,
      title: params.title.trim(),
      body: params.body.trim()
    };
  
    let articleDataFile = $path.join(articlesDir, articleId + ".json");
    fs.writeFile(articleDataFile, JSON.stringify(article), (err) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.redirect('/articles');
      }
    });
  }

  
  let k=1;
  app.post('/view',  (req, res) => {

    console.log("/view on server called");

    //const {keyc1,keyc2} = req.body;
    
    //console.log("valc1");
    //console.log("valc2");

    var fs = require('fs');
    let x;
    fs.readFile("./" +req.session.user+ "/Blog" +k+ "/textbox content/textfile1.txt", function(err, data) {
        
        console.log("file read  " +data);
        x=data.toString();
        let a = x.split(":");
        let b = a[1].split(" ");
        res.status(200).json({
            keys1: b[0],
            keys2: a[2],
            keys3: "vals3",
         });
    
        
    });

  k=k+1;
})

app.post('/change',  (req, res) => {

    console.log("/change on server called");
    let x;
    x = req.session.user;

    console.log("the user is " + x);
        res.status(200).json({
    
            keys1: x,
           
           
         });
    
        
  
        })




app.post('/logout',  (req, res) => {

  console.log("/logout on server called");
  let x;
  req.session.user=null;
  x=req.session.user;
  console.log("the user is " + x);
  res.status(200).json({
    
    keys1: x,
   
   
 });
})


const multer = require('multer');
const path = require('path');

const upload = multer({dest: __dirname + '/public/uploads'});


app.use(express.static('public'));


app.post('/upload', upload.single('photo'), (req, res) => {

  console.log("/upload on server called");

  const CurrentId = req.session.CurrentId;

  const formData = req.body;
  const additionalValue = formData.additionalValue;

  // Handle the additional value and other form data
  console.log('Additional Value:', additionalValue);

      

    let y = additionalValue.toString();
    let a = y.split("+");
    console.log("arr element= " +a[a.length-2]);
   

if (CurrentId) // get from session

{
    
    fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog"+ CurrentId +"/BlogMasterfile.txt",y ,function(err){
    if (err) throw err;
    console.log("successful");
        
    })
  

}

else

{
  
  fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog1/BlogMasterfile.txt",y ,function(err){
  if (err) throw err;
  console.log("successful 1");

  })

}



  let file=req.file;
  let x=0;
  if(req.file) {
    console.log("org file name= " +file.filename);
    
    //x=file.filename;

    fs.rename('./public/uploads/' +file.filename, './public/uploads/' +a[a.length-2], function (err) {
      if (err) throw err;
      console.log('File Renamed.');
    });

    x = a[a.length-2];
    
}
else {
  x="error";
} 
res.status(200).json({
    
  filePath: x,
  keys1: req.session.user,
  keys2: CurrentId,
 
 });
 console.log("file name= " +x);


const path = require('path');
let newPath;
// Define the old and new paths
const oldPath = path.join(__dirname, './public/uploads', x);
if(CurrentId)
{
   newPath = path.join(__dirname, './public/BlogData/'+req.session.user+'/Blog'+CurrentId+ '/photos', x);
}
else 
{  
   newPath = path.join(__dirname, './public/BlogData/'+req.session.user+'/Blog1/photos', x);
}

// Move the file
fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log('File moved successfully');
});


});



app.post('/uploadvid', upload.single('video'), (req, res) => {
  console.log("/uploadvid on server called");

  const CurrentId = req.session.CurrentId;

  const formData = req.body;
  const additionalValue = formData.additionalValue;


  let y = additionalValue.toString();
    let a = y.split("+");
    console.log("arr element= " +a[a.length-2]);
   

if (CurrentId) // get from session

{
    
    fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog"+ CurrentId +"/BlogMasterfile.txt",y ,function(err){
    if (err) throw err;
    console.log("successful");
        
    })
  

}

else

{
  
  fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog1/BlogMasterfile.txt",y ,function(err){
  if (err) throw err;
  console.log("successful 1");

  })

}


  let file=req.file;
  let x=0;
  if(req.file) {
    console.log("org file name= " +file.filename);
    
    //x=file.filename;

    fs.rename('./public/uploads/' +file.filename, './public/uploads/' +a[a.length-2], function (err) {
      if (err) throw err;
      console.log('File Renamed.');
    });

    x = a[a.length-2];
    
}
else {
  x="error";
} 
res.status(200).json({
    
  filePath: x,
  keys1: req.session.user,
  keys2: CurrentId,
 
 });
 console.log("file name= " +x);


 const path = require('path');
let newPath;
// Define the old and new paths
const oldPath = path.join(__dirname, './public/uploads', x);
if(CurrentId)
{
   newPath = path.join(__dirname, './public/BlogData/'+req.session.user+'/Blog'+CurrentId+ '/videos', x);
}
else 
{  
   newPath = path.join(__dirname, './public/BlogData/'+req.session.user+'/Blog1/videos', x);
}

// Move the file
fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log('File moved successfully');
});
});


app.use(express.json());


app.post('/saveContent', (req, res) => {

  console.log("check id= "+req.session.CurrentId);
  const CurrentId = req.session.CurrentId;

  const {elementID,textData,tID}  = req.body; //tiD = "t1,t5.." .. textarea has text areas strings.. elementID = "t1+p2+..."
  console.log('Received:' ,elementID,textData,tID);
  
  

  let a = tID;

  let x = textData.toString();
  let t = x.split(" ?delimeter separation? "); // array of text area strings

  if (CurrentId) 

    {
        fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog"+ CurrentId +"/BlogMasterfile.txt",elementID ,function(err){
        if (err) throw err;
        console.log("successful");
            
        })

        for(i=0 ; i<tID.length ; i++)
        {
        fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog"+ CurrentId +"/textbox/"+a[a.length-1-i]+".txt",t[t.length-2-i] ,function(err){
          if (err) throw err;
          console.log("successful");
              
          })
        }
    
    }
    
    else
    
    {
      
      fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog1/BlogMasterfile.txt",elementID ,function(err){
      if (err) throw err;
      console.log("successful 1");
    
      })

      
      for(i=0 ; i<tID.length ; i++)
      {
      fs.writeFile("./public/BlogData/" +req.session.user+ "/Blog1/textbox/"+a[a.length-1-i]+".txt",t[t.length-2-i] ,function(err){
        if (err) throw err;
        console.log("successful");
            
        })
      }
    
    }

});





    
