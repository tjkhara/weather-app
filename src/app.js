const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// Customizing views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Defines paths for express config END



// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // Customizing views
hbs.registerPartials(partialsPath)
// Setup handlebars engine and views location END

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tajeshwar Khara'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Tajeshwar Khara'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: "Help meeee!!!",
    title: "Help",
    name: "Tajeshwar Khara"
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

    if (error) {
      return res.send({error: error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error: error})
      }

      // This is where both requests work
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })



})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: "Help article not found.",
    name: "Tajeshwar Khara",
    title: "Help Error Page"
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    message: "Page not found.",
    name: "Tajeshwar Khara",
    title: "Error Page"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000")
})