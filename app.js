const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMsg, results) => {

    if(errorMsg) {
      console.log(errorMsg);
    }else{
      console.log(results);
      weather.getWeather(results.latitude ,results.longitude, (errorMsg, results) => {

        if(errorMsg) {
          console.log("Error: " + errorMsg);
        }else{
          console.log("Results: " + results);
        }

      });


    }

});
