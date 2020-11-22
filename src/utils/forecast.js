const request = require('postman-request')

const forecast = (lat, long, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=4660527bc11035e50cd8262a5f8f6475&query=${long},${lat}`

  request({url, json: true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error){
      callback("Unable to find location.", undefined)
    } else {
      const respString = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} degrees out.`
      callback(undefined, respString)
    }
  })
}


module.exports = forecast