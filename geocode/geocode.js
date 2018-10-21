const request = require('request');

geocodeAddress = (address, callback) => {

  var queryString = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=Sg3tAJaOYnVERs1TSFx5y8c3dM2ffPmz&location=${queryString}`,
    json: true
  }, (error,response,body) => {

    if(error) {
      callback("Error not resolved!")

    }else if(body.results[0].locations[0].adminArea5) {
      callback(undefined, {
          address : body.results[0].locations[0].adminArea5,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
      });
    }else{

      callback("Invalid Address!");
    }


  });


};


module.exports = {
  geocodeAddress
}
