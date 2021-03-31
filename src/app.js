const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'made through handlebars',
        name: 'Daniyal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        description: 'This app was created by Daniyal. It uses data from mapbox.com and weatherstack.com',
        name: 'Daniyal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Hi, if you need any help then contact me through my twitter @daniyaltariq',
        name: 'Daniyal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    // empty object is used to provide default value for long lat and location 
    // without default value which is = {} an empty object server will crash
    
    geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                longitude,
                latitude
            })
          })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: [
            req.query
        ]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        heading: '404',
        title: 'Help aritcle ',
        description: 'not found',
        name: 'daniyal'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        heading: '404',
        title: 'Page ',
        description: 'not found',
        name: 'daniyal'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
