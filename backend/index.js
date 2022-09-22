if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
    console.log(process.env.PORT)
    }
    const express = require('express');
    const ejs = require('ejs');
    
    ///Intializations
    
    const app = express();
    require('./database')
    
    
    //Settings
    const path = require('path');
    
    app.set('port', process.env.PORT || 1234);
    app.set("views", path.join(__dirname, '../frontend/views'));
    app.set("view engine", ".ejs");
    //app.set('trust proxy', 1)
    
    

    
    
    //middlewares
    const morgan = require('morgan');
    const flash = require('connect-flash');
    const session = require('express-session');
    const MongoStore = require('connect-mongo');
    app.use(
        session({
          secret: "secret",
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite:"none",
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30
        },
          store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
        })
      );
    
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(flash());
    
    
    
    app.use(express.json({
      type: ['application/json', 'text/plain']
    }))
    
    //routes
    
    const router = require("./routes/index.routes");
    const sujetos = require('./models/sujetos');
const { default: mongoose } = require('mongoose');
    
    app.use(router)
    
    //static files
    app.use(express.static(path.join(__dirname, "../frontend/public")));
    
    
    //Start the server
    app.listen(app.get('port'), () => {
        console.log('sever on port', app.get('port'))
    });