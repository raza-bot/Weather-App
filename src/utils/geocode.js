const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmF6YWdodWxhbSIsImEiOiJja2QybTRqdmkwMjM4Mnh1bDNja2JiNDFrIn0.k9LMJQxwLyyrLBwpsyFI4g'

  request({url, json: true}, (error, {body}) => {
    if (error) {
        callback('Unable to connnect to service', undefined)
    } else if (body.message === 'Not Found') {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1], 
        longtitude: body.features[0].center[0], 
        location: body.features[0].place_name
      })
    }
  })
}

module.exports.geocode = geocode; 