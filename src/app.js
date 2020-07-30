const path = require('path')
const express = require('express') // it is npm package and library. Used to create webserver and APIs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs'); 

const app = express(); //create web application. 

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
app.listen(3000, ()=> {
  console.log('Server is up on port 3000');
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




//app.com
//app.com/help
//app.com/about

