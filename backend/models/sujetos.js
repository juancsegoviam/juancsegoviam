const {Schema, model } = require('mongoose');

const SubjectSchema= new Schema({
    id2: {type: String},
    sujeto: {type: String},
    puntos:{type: String, default:"No experimento"},

    cond: {type: String},
    consent: {type: String},
    age: {type: String},
    gen:{type: String},
    sex: {type: String},
    mano: {type: String},
    created_at: {type: String, default: Date.now},
    start_experiment: {type: String, default: "No data"},
    end_experiment:{type:String, default: "No data"},
    
    
    tiempoT1: {type: Array, default: ['without data']},
    tiempoE: {type: Array, default: ['without data']},
    evento:{type: Array, default: ['without data']},
    fase: {type: Array, default: ['without data']},
    iti:{type: Array, default: ['without data']},
    trial:{type: Array, default: ['without data']},
    ref:{type: Array, default: ['without data']},


    tiempoT2: {type: Array, default: ['without data']},
    tiempoM: {type: Array, default: ['without data']},
    move:{type: Array, default: ['without data']},
    operants:{type: Array, default: ['without data']},
    fasem:{type: Array, default: ['without data']},
    itim:{type: Array, default: ['without data']},
    trialm:{type: Array, default: ['without data']},
    refm:{type: Array, default: ['without data']},

    
    tiempoT3: {type: Array, default: ['without data']},
    tiempoD: {type: Array, default: ['without data']},
    disparo: {type: Array, default: ['without data']},
    position: {type: Array, default: ['without data']},
    fased:{type: Array, default: ['without data']},
    itid:{type: Array, default: ['without data']},
    triald:{type: Array, default: ['without data']},
    refd:{type: Array, default: ['without data']},

    
    
    
    
    

})

module.exports = model('Subject', SubjectSchema)