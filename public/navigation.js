window.addEventListener('DOMContentLoaded', function () {
    //this.alert("callback called in navigation.js");
 const navigationContainer = document.getElementById('navigation-container');
 const xhr = new XMLHttpRequest();

 xhr.open('GET', '/navigation.html?v=' + Date.now(), true);
 xhr.onreadystatechange = function () {
     if (xhr.readyState === 4 && xhr.status === 200) {
         navigationContainer.innerHTML = xhr.responseText;

         updateLoginLink(); 
    
     } else {
         // Handle potential HTTP status errors here
         //alert("error in navigation.js");
         //console.error('XHR request failed with status:', xhr.status);
     }
  };

 xhr.send();

});

function hideLoggedinLink() {
    //alert("hideLoggedinLink called");
    const loggedinLink = document.getElementById('loggedinLink');
    if (loggedinLink) {
        loggedinLink.style.display = 'none';
    }
}
function showLoggedinLink() {
    const loggedinLink = document.getElementById('loggedinLink');
    if (loggedinLink) {
        loggedinLink.style.display = 'inline'; 
    }
}

async function getLoggedInUserName() {
    let loggedinuser = "";
    
    try{
     const response = await fetch('/change', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 }
             });
 
            
            if (response.ok) {
                const data = await response.json();
             loggedinuser = data.keys1;
             }
          else
            {                  
              console.error('Fetch failed');
            }
       }
 
  catch (error) {
     alert("error 2");
     console.error('Fetch error:', error);
 }
 
 
     //alert("loggedinuser1 after fetch "+ loggedinuser1);
     return loggedinuser;
 }
 
 async function updateLoginLink() {
   
    //alert("UpdateLoginLink called");
    const loginLink = document.getElementById('loginLink');
    const loggedinLink = document.getElementById('loggedinLink');

    const loggedInUserName = await getLoggedInUserName();
    //alert("before if loggedInUserName is "+ loggedInUserName);
    if(loggedInUserName) 
    {
        //    alert("if called ");
            loggedinLink.style.display = 'inline'; 
            loggedinLink.textContent = 'Hi ' + loggedInUserName + ' ! '; 
            loginLink.style.display = 'none' ;
           
    }
    else
    {
        //alert("else called");
        loggedinLink.style.display = 'none' ;
        loginLink.style.display = 'inline';
    }
  }


  async function logout() {
    //alert("here logout");
    try{
          const response = await fetch('/logout', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
     
          

          if (response.ok) {
               const data = await response.json();
               //alert("logout success");
              // Redirect to protected resource on successful login
              window.location.href = '/login.html';
          }
      }
      catch (error) {
          alert("error 2");
          console.error('Fetch error:', error);
      }
}