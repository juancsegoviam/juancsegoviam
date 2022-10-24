if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
    console.log(process.env.PORT)
    }
    const express = require('express');
    const ejs = require('ejs');
    
    ///Intializations
    
    const app = express();
    
    
    
    //Settings
    const path = require('path');
    
    app.set('port', process.env.PORT || 1234);
    app.set("views", path.join(__dirname, '../frontend/views'));
    app.set("view engine", ".ejs");
    app.set('trust proxy', 1)
    
    

    
    
    //middlewares
    const morgan = require('morgan');
    const flash = require('connect-flash');
    const session = require('express-session');
    const MongoStore = require('connect-mongo');
    app.use(
        session({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ 
          mongoUrl: process.env.MONGODB_URI}),
        })
      );

  
    
    app.use(express.urlencoded({ extended: false ,limit: "50mb" }));
    app.use(morgan('dev'));
    app.use(flash());
    
    
    
    app.use(express.json({
      type: ['application/json', 'text/plain'],
      limit: "50mb"
      
    }))
    
    //routes
    
    
    const router = require("./routes/index.routes");

    
    
    app.use(router)
    
    //static files
    app.use(express.static(path.join(__dirname, "../frontend/public")));
    
    
    //Start the server
    require('./database')
    app.listen(app.get('port'), () => {
        console.log('sever on port', app.get('port'))
    });