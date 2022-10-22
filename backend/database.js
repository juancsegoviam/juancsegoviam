const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI2);

mongoose.connect(process.env.MONGODB_URI2,{
})
    .then(db => console.log(`DB:${db} is connected`))
    .catch(err => console.log(err))

    module.exports = mongoose