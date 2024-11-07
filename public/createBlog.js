

 //const divElement = document.createElement("div"); 
 
 let i=1;
 //let text="";

 let formPic=""; 
 let hide=""; //for hiding buttons in photo uploads
 let img="";

 let formVid="";
 let hideVid="";
 let vid="";

 let hideAud="";
 let start="";
 let stopAud="";
 let msg="";

 let textareaID="";
 

//this function is called on onload event
function OnPublish() 
{
  let urlString = window.location.href;
  
  let paramString = urlString.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  
  for(let pair of queryString.entries()) 
  {
    let id = pair[1];
    
  var x = document.getElementById("hiddenBlogID");
   x.value = id;
   alert("hidden blog id = " +x.value);

  }

}

let divText="";
let saveBtn="";

function addtext() 
{
        const divText = document.createElement("div");
        divText.style.backgroundColor="pink";
        divText.id = "t" +i;
        //text = divText.id;
        document.body.appendChild(divText);

          //document.getElementById(text)
                divText.innerHTML += "<br><br>" + 
              `<textarea id="text" name="textdata" rows="20" cols="120"  name='blog'></textarea>`;

              const textarea = document.getElementById("text");
              textarea.id = "text" +i;
              textareaID = textarea.id;
              //alert(textareaID);


              /*const save = document.getElementById("save");
              save.id = "save" +i;
              saveBtn = save.id;*/


              i=i+1;

              var x = document.getElementById("hiddenElementID");
              x.value += divText.id+ "+";
              alert("hidden elements = " +x.value);

}


  
       
 
function addphoto()
{
        const divElement = document.createElement("div");
        divElement.style.backgroundColor="pink";
        divElement.id = "p"+i;
        // text=divElement.id;

         divElement.name="photo"+i;
         //alert("name- " +divElement.name);

         document.body.appendChild(divElement);

          divElement.innerHTML += "<br><br>" + 
              `<div id="btnID">

              <form  id='uploadForm' method='post' enctype="multipart/form-data">
                <input type="file" accept="image/*" name="photo">
                <input type="submit" value="upload" onclick="uploadpic()">
              </form>
              </div>
              <div>
                <!-- img element without src attribute -->
                <img id="image" width="350" height="200" alt="Click on Choose File to add an Image" src="" />
              </div>`;


              const hideBtn = document.getElementById("btnID");
              hideBtn.id = "btnID" +i;
              hide = hideBtn.id;

              const formElement = document.getElementById("uploadForm");
              formElement.id = "uploadForm"+i;
              formPic = formElement.id;
              //alert("form id= " +formPic);

              const imgElement = document.getElementById("image");
              imgElement.id = "image" +i;
              img = imgElement.id;

              i=i+1;

              //append this element id to hidden field
              var x = document.getElementById("hiddenElementID");
              x.value += divElement.id+ "+";
              alert("hidden elements = " +x.value);
      }


      //const divVideo = document.createElement("div");
      
     function addvideo() 
     {

      const divElement = document.createElement("div");
      divElement.style.backgroundColor="pink";
      divElement.id = "v"+i;
          //text=divElement.id;
          document.body.appendChild(divElement);

          
              divElement.innerHTML += "<br>" + 
              `<div id="formID">
              <form  id='form' method='post' enctype="multipart/form-data">
                <input type="file" accept="video/*" name="video">
                <input type="submit" value="upload" onclick="uploadvid()">
              </form>
              </div>

            <div>
              <video id="video" width="350" height="200" controls>
              <source src=" " type="video/mp4">
              </video>
            </div>`;

              const hide = document.getElementById("formID");
              hide.id = "formID" +i;
              hideVid = hide.id;

              const formVideo = document.getElementById("form");
              formVideo.id = "form" +i;
              formVid = formVideo.id;

              const vidElement = document.getElementById("video");
              vidElement.id = "video" +i;
              vid = vidElement.id;

              i=i+1;

              var x = document.getElementById("hiddenElementID");
              x.value += divElement.id+ "+";
              alert("hidden elements = " +x.value);
       }


    function addaudio() 
      {

        const divElement = document.createElement("div");
        divElement.style.backgroundColor="pink";
        divElement.id = "a"+i;
          //text=divElement.id;
          document.body.appendChild(divElement);

          
              divElement.innerHTML += "<br>" + 
              `<div id="audiorec">
            <button onclick="uploadaud()" id="startRecording">Record</button>
            <button id="stopRecording">Stop Recording</button>
            </div>
            <br />
            <p id="isRecording">Click Record to start audio recording</p>
            <audio src="" id="audioElement" controls></audio>`;

            const hideAudio = document.getElementById("audiorec");
              hideAudio.id = "audiorec" +i;
              hideAud = hideAudio.id;

              const startRec = document.getElementById("startRecording");
              startRec.id = "startRecording" +i;
              start = startRec.id;

              const stopRec = document.getElementById("stopRecording");
              stopRec.id = "stopRecording" +i;
              stopAud = stopRec.id;

              const audioRec = document.getElementById("audioElement");
              audioRec.id = "audioElement" +i;
              aud = audioRec.id;

              const audioMsg = document.getElementById("isRecording");
              audioMsg.id = "isRecording" +i;
              msg = audioMsg.id;

            i=i+1;

            var x = document.getElementById("hiddenElementID");
              x.value += divElement.id+ "+";
              alert("hidden elements = " +x.value);
     
      }



function SaveContent()
{

      document.getElementById('save').addEventListener('click', function() {
        alert("save called");
        
        
        const elementID = document.getElementById('hiddenElementID').value; //t1+p2+t3+t4...
        let y = elementID.split("+"); //get array t1, p2...
        alert(y);

        let letter = 't';
        const tID = y.filter(element => element.startsWith(letter)); //get all textbox ids - t1, t5..

        let textId = document.getElementById('hiddenTextID');
        
        for(i=0 ; i<tID.length ; i++)
        {
            alert(tID[i]);
        const parentDiv = document.getElementById(tID[i]); 
        const textArea = parentDiv.querySelector('textarea');

        const tData = textArea.value;
        alert("text values- " +tData);
        
        textId.value += tData + " ?delimeter separation? ";
        }
      
        alert("ID test- " +elementID);
        alert("data test- " +textId.value);

        const textData = textId.value; //has the text for all text boxes



        // Create the data object
        const data = {
          elementID: elementID,
          textData: textData,
          tID: tID,
        };
        alert(data.textData);
        alert(data.elementID);

        // Send the data using fetch
        fetch('/saveContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        
        .then(response => response.json())
        .then(data => {
          alert('Success:', data);

        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
      
      

}



function uploadpic(){

    var x = document.getElementById("hiddenElementID");
    //alert("hidden elements = " +x.value);


  document.getElementById(formPic).addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const formData = new FormData(this); // Create a FormData object from the form

  formData.append('additionalValue', x.value);

  
  // Use Fetch API to send the form data to the server
  fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json()) // Parse the response as JSON
  .then(result => {
       //alert("test 1- " +result.keys1);
       //alert("test 2- " +result.keys2);
       
      let image = document.getElementById(img);
      
      if(result.keys2)
     {
      image.src = "BlogData/" +result.keys1+"/Blog"+result.keys2+"/photos/" +result.filePath;
     }
     else
     {
        image.src = "BlogData/" +result.keys1+"/Blog1/photos/" +result.filePath;
     }
      

    document.getElementById(hide)
        .style.display = "none";
  })
  .catch(error => {
      console.er
      ror('Error:', error); // Log any errors
  });
});
}


function uploadvid(){

    var x = document.getElementById("hiddenElementID");
    //alert("hidden elements = " +x.value);


  document.getElementById(formVid).addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way


  const formData = new FormData(this); // Create a FormData object from the form

  formData.append('additionalValue', x.value);


  // Use Fetch API to send the form data to the server
  fetch('http://localhost:5000/uploadvid', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json()) // Parse the response as JSON
  .then(result => {
       //alert("filename- " +result.filePath);

      let video = document.getElementById(vid);
      
      if(result.keys2)
        {
            video.src = "BlogData/" +result.keys1+"/Blog"+result.keys2+"/videos/" +result.filePath;
        }
        else
        {
            video.src = "BlogData/" +result.keys1+"/Blog1/videos/" +result.filePath;
        }
         

    document.getElementById(hideVid)
        .style.display = "none";
  })
  .catch(error => {
      console.error('Error:', error); // Log any errors
  });
});
}

function uploadaud(){

document
.getElementById(start)
.addEventListener("click", initFunction);
let isRecording = document.getElementById(msg);
function initFunction() {
// Display recording
async function getUserMedia(constraints) {
  if (window.navigator.mediaDevices) {
    return window.navigator.mediaDevices.getUserMedia(constraints);
  }
  let legacyApi =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  if (legacyApi) {
    return new Promise(function (resolve, reject) {
      legacyApi.bind(window.navigator)(constraints, resolve, reject);
    });
  } else {
    alert("user api not supported");
  }
}
isRecording.textContent = "Recording...";
//
let audioChunks = [];
let rec;
function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.start();
  rec.ondataavailable = (e) => {
    audioChunks.push(e.data);
    if (rec.state == "inactive") {
      let blob = new Blob(audioChunks, { type: "audio/mp3" });
      console.log(blob);
      document.getElementById(aud).src = URL.createObjectURL(blob);
    }
  };
}



function startusingBrowserMicrophone(boolean) {
  getUserMedia({ audio: boolean }).then((stream) => {
    handlerFunction(stream);
  });
}


startusingBrowserMicrophone(true);
// Stoping handler
document.getElementById(stopAud).addEventListener("click", (e) => {
  rec.stop();
  document.getElementById(hideAud)
        .style.display = "none";
  isRecording.textContent = " ";
});
}

}


