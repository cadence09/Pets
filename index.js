const express=require("express")
const app=express()
const path = require("path")
const fileUpload = require('express-fileupload');
require('dotenv').config()
const cors = require('cors')
const bodyParser=require('body-parser');
const port =3001;
var pgp=require('pg-promise')(/*options*/)
var db=pgp(process.env.REACT_APP_DATABASECONFIG)

// app.use(bodyParser.urlencoded({
//     extend:true
// }))

app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());

app.get('/getDogs', function(req,res){
    db.any("SELECT * FROM dogs")
        .then((data)=>{
            res.send(data)
            
            
        })
        .catch(error=>{
            console.log("error",error)
        })
})
app.get("/getCats",function(req,res){
    db.any("SELECT * FROM cats")
        .then((data)=>{
            // console.log("dd",data)
            res.send(data)
        })
        .catch(error=>{
           
            console.log("error",error)
        })
})

app.post("/upLoad",function(req,res){
    console.log("req",req.body)
    let catValue=[
        req.body.catName,
        req.body.catOwner,
        req.body.catAge,
        req.body.image,
        req.body.moment
    ]

    db.none("INSERT INTO cats(cat_name,owner_name,cat_age,cat_profile_pic,moments) VALUES($1,$2,$3,$4,$5)",catValue)
        .then(()=>{
            console.log("success")
        })
        .catch(error=>{
            console.log("error",error)
        })
})

app.post("/upLoadDog",function(req,res){
    console.log("dog req",req.body)
    let dogValue=[
        req.body.dogName,
        req.body.dogOwner,
        req.body.dogAge,
        req.body.image,
        req.body.moment
    ]
    db.none("INSERT INTO dogs (dog_name,owner_name, dog_age,dog_profile_pic,moment) VALUES ($1,$2,$3,$4,$5)", dogValue)
    .then(()=>{
        console.log("success")
    })
    .catch(error=>{
        console.log("error",error)
    })
})

app.listen(port,function(){
    console.log(`app listening on port ${port}`)
})