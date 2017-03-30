const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); //creates express app.

hbs.registerPartials(__dirname + '/views/partials'); //partials let you create code segments
app.set('view engine', 'hbs') //set express configs


app.use((req, res, next) => { //next tells express when middleware is complete.
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`; //logs date, method and url
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server');
    }
  });
  next(); // continues app. App will not continue without this.
});

app.use((req, res, next) => { //executes before anything else and is anything after it does not run.
  res.render('maintain.hbs');
});

app.use(express.static(__dirname + '/public')); //register middleware

hbs.registerHelper('getCurrentYear', () => { //helpers let tou mass run handlebars js code.
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => { //cals get request on root of server '/' and executes function with request and response params.
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    userWelcome: 'Jordan'
  });
});

app.get('/about', (req, res) => { //creates an about page at /about
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

//bad - send back json with error message
app.get('/bad', ( req, res) => {
    res.send({
      errorMessage: 'unable to handle request'
    });
});

app.listen(3000, ()=> {
  console.log('Server up on port 3000');
}); //listens on port
