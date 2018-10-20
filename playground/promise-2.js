const request = require('request');

geocodeAddress = (address) => {

    return new Promise( (resolve, reject) => {

      var queryString = encodeURIComponent(address);

      request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=Sg3tAJaOYnVERs1TSFx5y8c3dM2ffPmz&location=${queryString}`,
        json: true
      }, (error,response,body) => {

        if(error) {
          reject("Error not resolved!");

        }else if(body.results[0].locations[0].adminArea5) {

          resolve({
            address : body.results[0].locations[0].adminArea5,
            latitude: body.results[0].locations[0].latLng.lat,
            longitude: body.results[0].locations[0].latLng.lng
          });

        }else{

          reject("Invalid Address!");
        }

      });

    });
  };


geocodeAddress('06000').then( (location) => {
  console.log(JSON.stringify(location,undefined,2));
}, (errorMsg) => {
  console.log(errorMsg);
});
