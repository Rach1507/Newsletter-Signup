const express = require('express');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.get("/",(req,res) =>{
  res.sendFile(__dirname + "//signup.html");

});

app.post("/", (req,res) => {

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [ // this is a member array containing member object
      //add member objects
      {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
  ]
  };

  var jsonData = JSON.stringify(data);
  var  url= "https://us20.api.mailchimp.com/3.0/lists/9f9d7525f8";
  var options = {

    method: "POST",
    auth :"rach:d571ce3f1c089e814ca78a4abc4d7a07-us20"
    
}



const request = https.request(url , options, (response)=>{console.log(response);});

request.write(jsonData);
request.end();
});
app.listen(3000, () => {
  console.log("Server listening at 3000");
});
