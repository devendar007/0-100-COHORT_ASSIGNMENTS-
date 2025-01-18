const express=require('express');
const app=express();
const path=require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');
 const users=[
    {
    name:"Devendar",
    Kidneys:[{
        healthy:true
    },
    {
        healthy:true
    }
]},{
name:"Deepesh",
Kidneys:[{
    healthy:false
},
{
    healthy:true
}
]
},
{
    name:"itachi",
    Kidneys:[{
        healthy:false
    },
    {
        healthy:false
    }
]
}
 ]

app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
res.render("check")
})
app.post("/status",function(req,res){
    const username=req.body.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === username);

    if (!user) {
      return res.status(404).send('User not found');
    }
  res.render("user",{users,username});
    
})
app.delete("/deleteUnhealthyKidneys",function(req,res){
const name=req.body.name;
const user=users.find(u=>u.name.toLowerCase()==name.toLowerCase());
const userKidneys=user.Kidneys;
const unhealthyKidney=false;
const unhealthyKidneys = userKidneys.filter(kidney => kidney.healthy === false);

if (unhealthyKidneys.length === 0) {
    return res.status(411).send("All Kidneys are healthy, no need to delete");
}

// Remove unhealthy kidneys
user.Kidneys = userKidneys.filter(kidney => kidney.healthy === true);

res.status(200).send(`Unhealthy kidneys removed for user ${user.name}`);
})
app.post("/addNewKidneys",function(req,res){
    const name=req.body.name;
    const user=users.find(u=>u.name.toLocaleLowerCase()==name.toLowerCase());
    const userKidneys=user.Kidneys;
    if(userKidneys.length==2) res.status(411).send("cannot add new Kidneys as there are already 2 kidneys");
else{user.Kidneys.push({healthy:true});
res.status(200).send("new Healthy Kidney Added")}
})
app.put("/replaceKidney",function(req,res){
    const name=req.body.name;
    const user=users.find(u=>u.name.toLocaleLowerCase()==name.toLowerCase());
    const userKidneys=user.Kidneys;
   const unhealthyKidney=userKidneys.filter(u=>u.healthy==false);
   if(unhealthyKidney.length==0) res.status(411).send("All kidneys are already healthy no need to add");
 else{  const newkidneys=[];
   for(let i=0;i<userKidneys.length;i++){
   newkidneys.push({healthy:true});
   }
   user.Kidneys=newkidneys;
   res.status(200).send("unhealthy Kidneys replaced to Healthy Kidney");
}

})
app.listen(3000); 