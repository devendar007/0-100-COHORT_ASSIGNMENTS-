const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const dirpath=path.join(__dirname,'files');
app.get("/files",function(req,res){

    fs.readdir(dirpath,function(err,data){
       res.status(200).json(data);
    })
})
app.get("/files/:fileName",function(req,res){
    const filename = req.params.fileName;

    const filepath=path.join(dirpath,filename);
    fs.readFile(filepath,'utf8',function(err,data){
        if(err){
            res.status(404).send("FILE NOT FOUND");
        }
        else{
            res.status(200).send(data);
        }
    })
})
app.use(function(req,res){
    res.status(404).send("Undefined route");
})
app.listen(3000);
