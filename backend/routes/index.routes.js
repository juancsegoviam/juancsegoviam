const {Router} = require('express');
const router = Router();
const Subject = require('../models/sujetos');









router.get("/", async (req,res) => {



    console.log(req.session)
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
    
    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    req.session.user = req.body;

    var consent = req.session.consent;
    var exp = req.session.exp;
    var form = req.session.form;
    var user = req.session.user;
    console.log(req.body)
    

     req.session.id2 = id2 = guidGenerator() ;
     console.log(id2)
   

    
    let {cond, sujeto, age, gen, sex, mano} = req.body;
    if(!(user.cond == "EXP" || user.cond == "BCW" || user.cond == "ECA" )) {
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
        const newSubject = await new Subject({id2,cond,sujeto, age, gen,sex, mano});
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
    var id2 = req.session.id2
    console.log(id2)
 

    if(con === 'Accepto' ) {
        req.session.start = true
        await Subject.findOneAndUpdate({id2: id2},
            { consent: con})
    
        
        res.redirect("/experiment");
    } else{
        await Subject.findOneAndUpdate({id2: id2},
            { consent: con})
            
        req.session.destroy();
        res.render("cancelo")
    }

    
    
   
});

router.get("/experiment", async(req,res) => {
    user = req.session.user
    start = req.session.start;
    alert = true
   

  
    if(start === undefined || user === undefined ){
        start = false;

        res.redirect("/")
    }
    else{
        cond = user.cond;
        suj = user.sujeto;
        res.render("exp", {cond, suj});
    }
    
   
});

router.post("/experiment", async(req,res) => {
    user = req.session.user
    id2 = req.session.id2
    console.log(user)
    const {
        start_experiment, 
        end_experiment, 
        puntos, 
        
        tiempoT,
        tiempoE, 
        evento,
        fase, 
        iti,
        trial,
        ref,

        tiempoMT,
        tiempoM, 
        move,
        operants,
        fasem, 
        itim,
        trialm,
        refm,

        tiempoDT,
        tiempoD, 
        disparo,
        position,
        faseD, 
        itid,
        triald,
        refd
    } = req.body

    console.log(req.body)
    await Subject.findOneAndUpdate({id2: id2},
        {
            start_experiment: start_experiment,
            end_experiment: end_experiment,
            puntos: puntos,
            
            tiempoT1: tiempoT,
            tiempoE: tiempoE,
            evento: evento,
            fase: fase,
            iti: iti,
            trial: trial,
            ref:ref,

            tiempoT2: tiempoMT,
            tiempoM: tiempoM,
            move: move,
            operants:operants,
            fasem: fasem,
            itim: itim,
            trialm: trialm,
            refm:refm,

            tiempoT3:tiempoDT,
            tiempoD: tiempoD,
            disparo: disparo,
            position: position,
            fased: faseD,
            itid: itid,
            triald: triald,
            refd:refd
            }),
            
        res.end()
        req.session.destroy();
            
        });

        


    




module.exports = router;
