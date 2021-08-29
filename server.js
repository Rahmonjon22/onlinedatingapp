// here we write JS to build the server

const express = require('express');
const exphbs = require('express-handlebars');
// those above are for dependencies from package.json
const app = express(); 
//
const port = 3000; 
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
// I used get method to handle the route, / means homepage, and req => is incoming request from client, res => is respond from backend to the client
// res.send method is used to send message to the client

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

app.listen(port,() =>{
    // console.log('Server is running on port' + port); instead of using concatinate, i can use with backtic & dollar sign and inject port in it.
    console.log(`Server is running on port ${port}`);
}); 
// app is to used to bring express module. it has listen method and used for port and call back funtion. 
//  node server.js now go to the localhost:3000 in browser.
