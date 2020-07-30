const path = require('path')
const express = require('express') // it is npm package and library. Used to create webserver and APIs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs'); 

const app = express(); //create web application. 
const port = process.env.PORT || 3000

//define path for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');

//partial path
const partialPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs') //handlerbar is set up. 
hbs.registerPartials(partialPath)

//setup static directory to server to serve
app.use(express.static(publicDir))//use to customize your server. Here we specify the that our app will use the given directory as root directory. This will by default look for index.html

//setup partial url and the server response. 
app.get('', (req, res) => { 
  res.render('index', {
    title: 'Weather App', 
    name: 'Raza Ghulam'
  })
})

app.get('/about', (req, res) => { 
  res.render('about', {
    title: "About Me", 
    name: "Raza Ghulam"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help will be provided soon!",
    name: "Raza Ghulam"
  })
})

app.get(('/weather'), (req, res)=> {
  if (!req.query.address) {
    return res.send({
      error: "Please provide and address"
    })
  }
  geocode.geocode(req.query.address, (error, {latitude, longtitude, location}={}) =>  {
    if (error) {
      return res.send("Can find the service")
    }
    forecast(latitude,longtitude, (error, forecastData) => {
      if(error) { 
        return res.send('Can\'t find the location')
      }
      res.send({
        forcast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })  
})

//Route handler
//query strings. ?key=value&key=vlaue.....
app.get('/products', (req, res)=> {
  if (!req.query.search){
    return res.send({
      error: "You must provide a search term"
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res)=> { 
  res.render('error_page',{
    title: '404', 
    name: 'Raza Ghulam',
    error:"Help article not found"})
})

app.get('*', (req, res)=> {
  res.render('error_page', {
    title: '404', 
    name: 'Raza Ghulam',
    error: "Page not found"
  })
})
app.listen(port, ()=> {
  console.log('Server is up on port:' + port);
})


//engine templete will provide dynamic contents to our pages. for example, create a single header and footer and use  them for all your pages. hbs is npm library that use handlebar.js in the background and allow express.js to integrate it. npm i hbs





// app.get('', (req, res)=> {
//   res.send('<h1>Weather</h1>'); //root page
// })

// app.get('/help', (req, res)=> {
//   res.send({
//     name: 'Raza', 
//     age: 33
//   }) //the object is sent as Json.
// })

// app.get('/about', (req, res) => {
//   res.send([
//     {name: 'Saba'}, 
//     {name: 'Huda'}
//   ])
// })





//heroku is the deploymnet production. we must install heroku cli tool to manage the heroku from terminal: npm install -g heroku. then we need to setup snf associate ssh key for secure communication: heroku keys:add. Now we need to create heroku account: heroku create ghulam-weather-application (this will create new application on heroku server and spit two urls: first is the url the web url and second is git url )

//now we need to tell the heroku where to start the app. in our package.json file, in script object, write "scripts": { "start": "node src/app.js"}. Note: we can locally run our application too using scripts: npm run start. 

//Now we need to bring changes to our app.js. Now our app is not listening to our local '3000' port. We need to create a const port = process.env.PORT || 3000 'heroku sets up the environment variable'. Now use it in app.listen(port)

//last change is to go to public folder/js/app.js (client side js) and change the fetch url (fetch('/weather?address=' + location))

//now we need to push it to heroku web server: git push heroku master