const request = require('postman-request')

const forecast = (latitude, longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3df5ebb025a7dcfc9202e68030a7385a&query=${latitude},${longitude}&units=f`

    request({url : url, json : true}, (error, response) => {
        if(error){
            callback('Some internal error occured!', undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to fetch data!', undefined)
        }
        else{
            callback(undefined, {
                temp : response.body.current.temperature,
                feels : response.body.current.feelslike,
                type : response.body.current.weather_descriptions
            })
        }
    })
}


module.exports= forecast