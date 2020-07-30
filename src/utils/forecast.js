const request = require('request');

const url = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=cd2a6ffea01ac28c3a4db159578421c3"

const forecast = (lat, lon, callback) => {
  const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=cd2a6ffea01ac28c3a4db159578421c3'
  request({url, json: true}, (error, {body}) => { 
    if (error) { 
      callback("Unable to find the weather servive API!!", undefined)
    } else if (body.cod == 400) { 
      callback(undefined, 'Unable to find the location')
    } else { 
      callback(undefined, {
        temp: body.main.temp, 
        city_name: body.name
      })
    }
  })
}

module.exports = forecast; 