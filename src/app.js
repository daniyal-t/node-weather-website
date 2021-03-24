const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

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
        description: 'This app is about weather app using nodejs, expressjs and handlebars',
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
    res.send({
        forecast: 'good',
        location: 'karachi'
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

app.listen(3000, () => {
    console.log('server is up and running on port 3000.')
})
