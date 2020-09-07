const express=require("express")
const app=express()
const fileUpload = require('express-fileupload');
require('dotenv').config()
const bodyParser=require('body-parser');
const port =3001;
var pgp=require('pg-promise')(/*options*/)
var db=pgp(process.env.REACT_APP_DATABASECONFIG)

// app.use(bodyParser.urlencoded({
//     extend:true
// }))

// app.use(bodyParser.json())
app.use(express.static('public'))
app.use(fileUpload())

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

app.post("/getCats",function(req,res){
    if(!req.files){
        return res.status(500).send({msg:"file is not found"})
    }
        // accessing the file
        const myFile = req.files.file;
        console.log("myImage",myFile)
        myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            // returing the response with file path and name
            return res.send({name: myFile.name, path: `/${myFile.name}`});
        });
    // db.one('INSERT INTO cats values $1',[])
})

app.listen(port,function(){
    console.log(`app listening on port ${port}`)
})