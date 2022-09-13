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
    if(form == true) {
        warning  = true;
        res.redirect("/consent")
    } else {
        res.render("index", {form, exp, consent});

    }
    
   
})

router.post("/", async (req,res) => {
    req.session.user = req.body
    user = req.session.user;
    
    let {cond, sujeto, name, age} = req.body;
    if(!(user.cond == "me" || user.cond == "mc" || user.cond == "te" || user.cond == "tc"  )) {
        user.cond = "fail"
        form = "incompleto";
        res.render("index", {
            form, exp, user, consent
        })
    }
    else if(!user.sujeto || !user.name || !user.age){
        form = "incompleto";
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
        await Subject.findOneAndUpdate({prolific:user.prolific},
            { consent: con})
    
        
        res.redirect("/experiment");
    } else{
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

        res.redirect("/")
    }
    else{
        res.render("exp", {cond});
    }
    
   
});

router.post("/experiment", async(req,res) => {
    user = req.session.user
    const {puntos, evento, tiempo, start_experiment, end_experiment} = req.body
    await Subject.findOneAndUpdate({prolific: user.prolific},
        {
            puntos: puntos,
            tiempo: tiempo,
            evento: evento,
            start_experiment: start_experiment,
            end_experiment: end_experiment }),
            console.log(puntos,evento, tiempo + " posting");
            
        });

    




module.exports = router;
