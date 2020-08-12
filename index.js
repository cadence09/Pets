const express=require("express")
const app=express()
require('dotenv').config()
const bodyParser=require('body-parser');
const port =3001;
var pgp=require('pg-promise')(/*options*/)
var db=pgp(process.env.REACT_APP_DATABASECONFIG)

// app.use(bodyParser.urlencoded({
//     extend:true
// }))

app.use(bodyParser.json())

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
            console.log("dd",data)
            res.send(data)
        })
        .catch(error=>{
           
            console.log("error",error)
        })
})
app.listen(port,function(){
    console.log(`app listening on port ${port}`)
})