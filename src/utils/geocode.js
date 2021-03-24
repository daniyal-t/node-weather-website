const request = require('request')

// geocode api takes the string of the location and find the long lat using mapbox api

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFuaXlhbC10YXJpcSIsImEiOiJja21ncXYzN2cwMDJzMndrNTFubXoyYjlnIn0.NPWTnqM9KhZeFWzQnm-1Kw&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services.', undefined)
        } else if ( body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode