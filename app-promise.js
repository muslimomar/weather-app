const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a: {
    demand:true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

var queryString = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=Sg3tAJaOYnVERs1TSFx5y8c3dM2ffPmz&location=${queryString}`;

axios.get(geocodeUrl).then((response) => {
  if(!response.data.results[0].locations[0].adminArea5) {
      throw new Error('Unable to find that address!');
  }else{

    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/4b4ce55d2bb3b374be10b939d7fff492/${lat},${lng}`;

    console.log(response.data.results[0].locations[0].adminArea5);

    return axios.get(weatherUrl);
  }}).then( (response) => {

    console.log("Temperature is : ",response.data.currently.temperature);

  }).catch( (error) => {
  console.log("Error: ",error.message)
});
