const {Router} = require('express');
let ejs = require('ejs');
const router = Router();
const Subject = require('../models/sujetos');
const { truncate } = require('fs-extra');








router.get("/", async (req,res) => {

    var consent = req.session.consent;
    var exp = req.session.exp;
    var form = req.session.form;
    var warning = req.session.warning;

    if( (form == undefined && warning == undefined && consent == undefined && exp == undefined)){
        form = false;
        exp = false;
        consent = false;
        warning = false;
        res.render("index", {form, exp, consent});
    } else {
        warning = true;
        res.redirect("/consent")
    }
  
    
   
})

router.post("/", async (req,res) => {
    req.session.user = req.body;

    var consent = req.session.consent;
    var exp = req.session.exp;
    var form = req.session.form;
    var user = req.session.user;
    console.log(req.body)
   

    
    let {cond, sujeto, age, gen, sex, mano} = req.body;
    if(!(user.cond == "TRC" || user.cond == "TSRC"  )) {
        user.cond = "fail"
        form = "incompleto";
        res.render("index", {
            form, exp, user, consent
        })
    }
    else if((user.sujeto.length <6 || user.sujeto.length >6) || !user.age || !user.gen ||  !user.sex || !user.mano){
   
        form = "incompleto";
        res.render("index", {
            form, exp, user, consent
        })
    }else {
        req.session.form = true;
        const newSubject = await new Subject({cond,sujeto, age, gen,sex, mano});
        newSubject.save();
      
        user = {}
    
     
        res.redirect("/consent")
    }
    
});

router.get("/consent", async(req,res) => {
    var form = req.session.form;
    var user = req.session.user
    var warning = req.session.warning
    if (form === true){
        var date = new Date
        const [month,day,year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
        res.render("consent", {user, month, day, year, warning})
    

    } else {
        req.session.consent = true
        res.redirect("/")
    }

    
    
   
});

router.post("/consent", async(req,res) => {
    var user = req.session.user
    var con = req.body.consent
 

    if(con === 'Accepto' ) {
        req.session.start = true
        await Subject.findOneAndUpdate({sujeto: user.sujeto},
            { consent: con})
    
        
        res.redirect("/experiment");
    } else{
        await Subject.findOneAndUpdate({sujeto: user.sujeto},
            { consent: con})
            
        req.session.destroy();
        res.render("cancelo")
    }

    
    
   
});

router.get("/experiment", async(req,res) => {
    user = req.session.user
    start = req.session.start;
    alert = true
    cond = user.cond;
    suj = user.sujeto;

  
    if(start === undefined){
        start = false;

        res.redirect("/")
    }
    else{
        res.render("exp", {cond, suj});
    }
    
   
});

router.post("/experiment", async(req,res) => {
    user = req.session.user
    const {
        start_experiment, 
        end_experiment, 
        puntos, 
        
        tiempoE, 
        evento,
        fase, 
        iti,
        trial,

        tiempoM, 
        move,
        operants,
        fasem, 
        itim,
        trialm,

        tiempoD, 
        disparo,
        position,
        faseD, 
        itid,
        triald,
    } = req.body
    await Subject.findOneAndUpdate({sujeto: user.sujeto},
        {
            start_experiment: start_experiment,
            end_experiment: end_experiment,
            puntos: puntos,
            
            tiempoE: tiempoE,
            evento: evento,
            fase: fase,
            iti: iti,
            trial: trial,

            tiempoM: tiempoM,
            move: move,
            operants:operants,
            fasem: fasem,
            itim: itim,
            trialm: trialm,

            tiempoD: tiempoD,
            disparo: disparo,
            position: position,
            fased: faseD,
            itid: itid,
            triald: triald,
            }),
            
        res.end()
        req.session.destroy();
            
        });

        


    




module.exports = router;
