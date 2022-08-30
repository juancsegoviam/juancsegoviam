const {Router} = require('express');
const router = Router();
const Subject = require('../models/sujetos');

let ids = {};

let alert= false;
let start= true;
let user= {};




router.get("/", async (req,res) => {
    console.log(alert,start)
    res.render("index", {alert,start,user})
    alert= false;
    start= true;

 
})

router.post("/", async (req,res) => {
    alert = true;

    
    req.session.user = req.body
    var user = req.session.user;
    const {prolific,name, age} = req.body;
    ids = prolific;
    if(!user.prolific || !user.name || !user.age){
        res.render("index", {
            alert, user, start
        })
    } else {
        req.session.start = true;
       const newSubject = await new Subject({prolific,name, age});
       newSubject.save();
       res.redirect("/experiment");
    }
    
});

router.get("/experiment", async(req,res) => {
    start = req.session.start;
    alert = true
  
    if(start === undefined){
        start = false;

        res.redirect("/")
    }
    else{
        res.render("exp");
    }
    
   
});

router.post("/experiment", async(req,res) => {
    const {puntos, evento, tiempo, start_experiment, end_experiment} = req.body
    await Subject.findOneAndUpdate({prolific:ids},
        {
            puntos: puntos,
            tiempo: tiempo,
            evento: evento,
            start_experiment: start_experiment,
            end_experiment: end_experiment }),
            console.log(puntos,evento, tiempo + "posting");
            res.end();
        })




module.exports = router;
