const {Router} = require('express');
let ejs = require('ejs');
const router = Router();
const Subject = require('../models/sujetos');

let ids = {};

let form = false;
let exp = false;
let consent = false;
let warning = false;
let user = {};
let prueba;
let id ;






router.get("/", async (req,res) => {
    console.log(req.session.cookie)
    consent = false
    if(form == true) {
        warning  = true;
        res.redirect("/consent")
    } else {
        res.render("index", {form, exp, consent});
        delete req.session

    }
    
   
})

router.post("/", async (req,res) => {
    req.session.user = req.body
    user = req.session.user;
    
    let {cond, sujeto, name, age} = req.body;
    if(!(user.cond == "TRC" || user.cond == "TSRC"  )) {
        user.cond = "fail"
        form = "incompleto";
        res.render("index", {
            form, exp, user, consent
        })
    }
    else if(!user.sujeto || !user.name || !user.age){
        form = "incompleto";
        delete req.session
        res.render("index", {
            form, exp, user, consent
        })
    }else {
        form = true;
        const newSubject = await new Subject({cond,sujeto,name, age});
        newSubject.save();
        // res.redirect("/experiment");.
        user = {}
        [cond,sujeto, name, age] = ["","","",];
        console.log(sujeto)
        res.redirect("/consent")
    }
    
});

router.get("/consent", async(req,res) => {

    user = req.session.user
    if (form === true){
        var date = new Date
        const [month,day,year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
        res.render("consent", {user, month, day, year, warning})
    

    } else {
        delete req.session
        consent = true
        res.redirect("/")
    }

    
    
   
});

router.post("/consent", async(req,res) => {
    user = req.session.user
    console.log(user)
    const con = req.body.consent
    console.log(con)

    if(con === 'Accepto' ) {
        req.session.start = true
        await Subject.findOneAndUpdate({sujeto: user.sujeto},
            { consent: con})
    
        
        res.redirect("/experiment");
    } else{
        delete req.session
        res.render("cancelo")
    }

    
    
   
});

router.get("/experiment", async(req,res) => {
    user = req.session.user
    start = req.session.start;
    alert = true
    cond = user.cond;
  
    if(start === undefined){
        start = false;
        delete req.session

        res.redirect("/")
    }
    else{
        res.render("exp", {cond});
    }
    
   
});

router.post("/experiment", async(req,res) => {
    user = req.session.user
    const {puntos, evento, tiempo, fase, start_experiment, end_experiment, iti} = req.body
    await Subject.findOneAndUpdate({sujeto: user.sujeto},
        {
            puntos: puntos,
            tiempo: tiempo,
            evento: evento,
            fase: fase,
            iti: iti,
            start_experiment: start_experiment,
            end_experiment: end_experiment }),
            console.log(puntos,evento, tiempo + " posting");
            form = false;
delete req.session
exp = false;
consent = false;
warning = false;
user = {};
        res.redirect("/")
            
        });

        


    




module.exports = router;
