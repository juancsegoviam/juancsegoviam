const {Schema, model } = require('mongoose');

const SubjectSchema= new Schema({
    cond: {type: String},
    sujeto: {type: String},
    name: {type: String},
    age: {type: String},
    concent: {type: String},
    created_at: {type: String, default: Date.now},
    start_experiment: {type: String, default: "No data"},
    end_experiment:{type:String, default: "No data"},
    puntos:{type: String, default:"No experimento"},
    evento:{type: Array, default: ['without data']},
    tiempo: {type: Array, default: ['without data']},
})

module.exports = model('Subject', SubjectSchema)