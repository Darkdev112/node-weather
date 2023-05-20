const path = require('path')
const express = require('express')
const hbs = require('hbs');
const forecast = require('./utils/forecast')

// console.log(__dirname); 
//Gives the path of the current directory

const app = express();


//Define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public") 
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to save
app.use(express.static(publicDirectoryPath))



// All routes
app.get('/', (req,res) => {
    res.render('index', {
        title : "Weather App",
        name : "Dev Ashrit Behera"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : "About Me",
        name : "Dev Ashrit Behera"
    })
})

app.get('/help', (req,res)=> {
    res.render('help',{
        title : "Help",
        name  : "Dev Ashrit Behera",
        msg : "This is the msg for help"
    })
})

app.get('/weather', (req,res)=> {
    const {latitude, longitude} = req.query;
    if(!latitude || !longitude){
        return res.send({
            error : "Please provide correct coordinates"
        })
    }

    forecast(latitude, longitude, (error, data) => {
        if(error){
            return res.send({
                error : error
            })
        }
        else{
            const {temp, feels, type} = data;
            return res.send({
                temperature : temp,
                feelsLike : feels,
                currentWeather : type[0]
            })
        }
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error : "You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : "Error",
        name : "Dev Ashrit Behera",
        error : "No help article found"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : "Error",
        name : "Dev Ashrit Behera",
        error : "Page not found"
    })
})


//listening the app on PORT 3000
app.listen(3000, ()=> {
    console.log('Server is up on port 3000');
})