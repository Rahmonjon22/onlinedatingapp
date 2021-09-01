const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Load models

const Handlebars = require('handlebars');
const app = express();

const User = require('./models/user.js');
const Keys = require('./config/keys.js');
const Message = require('./models/message.js');
// load key file

const port = process.env.PORT || 3000; 

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
app.engine('handlebars', exphbs({
handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({extended:false})); 
//  it has urlecoded method to access object and make it false because we only want to recieve form data
app.use(bodyParser.json()); // Javascript object notation. when we recev
/** now i can see in terminal that it worked like this
 * [Object: null prototype] {
  fullname: 'Rahmonjon Ibragimov',
  email: 'rahmonjon2@yahoo.com',
  message: 'Hello I am learning'
} */

app.use(cookieParser());
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// configuration for authentication

require('./passport/facebook.js');

mongoose.connect(Keys.MongoDB, {useNewUrlParser: true}).then (() => {
    console.log(`Server is connected to MongoDB`);
}).catch((err) => {
    console.log(err);
}); 

// assign port as value
app.engine('handlebars', exphbs({defaultLayout:'main'}));
// setup view engine method. 
app.set('view engine', 'handlebars');
//
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
}); 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/contact', (req, res)=> {
    res.render('contact', {
        title: 'Contact'
    });
});

app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failerRedirect: '/'
}));

app.post('/contactUs', (req, res)=> {
    console.log(req.body);
    const newMessage = {
        fullname: req.body.fullname,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    }
    new Message(newMessage).save((err, message)=> {
        if (err) {
            throw err;
        } else {
            Message.find({}).then((messages) => {
                if (messages) {
                    res.render('newmessage', {
                        title: 'Sent',
                        messages: messages
                    });
                } else {
                    res.render('noMessage', {
                        title: 'Not Found'
                    });
                }
            });
        }
    });
}); 
// POST is used to send data to a server to create/update a resource. when i write in browser something. it shows undefined, so i have to parse init.
// npm install --save body-parser it is in package


app.listen(port,() =>{
    // console.log('Server is running on port' + port); instead of using concatinate, i can use with backtic & dollar sign and inject port in it.
    console.log(`Server is running on port ${port}`);
}); 
// app is to used to bring express module. it has listen method and used for port and call back funtion. 
//  node server.js now go to the localhost:3000 in browser.
