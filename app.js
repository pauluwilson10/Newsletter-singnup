// jshint

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/sign-up.html")
});

app.post("/",function(req,res){
  const firstName=req.body.fname
  const secondName=req.body.sname
  const email=req.body.email
    const data= {
      members: [
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:secondName,
          }
        }
      ]
    }
  const jsonData=JSON.stringify(data);
  const url='https://us21.api.mailchimp.com/3.0/lists/06719cb23a';
  const options = {
    method:"POST",
    auth:"paulu10:6cbed45f35fadcd39623742a20476e0c-us21"
  }

  const request=https.request(url,options,function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }
    else {
      res.sendFile(__dirname + "/failure.html")

    }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
app.post("/failure",function(req,res){
  res.redirect("/")

})

    request.write(jsonData);
    request.end();

});
 app.listen(process.env.PORT || 3000 ,function(){
   console.log("server is runnig in 3000")
 });
//  apikey
// 6cbed45f35fadcd39623742a20476e0c-us21
//audienceid
//06719cb23a.
