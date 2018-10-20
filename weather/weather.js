const request = require('request');

var getWeather = (latitude,longitude,callback) => {

  request({
      url: `https://api.darksky.net/forecast/4b4ce55d2bb3b374be10b939d7fff492/${latitude},${longitude}`,
      json: true
  }, (error, response, body) => {

    if(!error && response.statusCode === 200){
      var temp =response.body.currently.temperature
      callback(undefined,`Temperature is: ${temp}`);
    }else  {
      callback("Unable to fetch weather!",undefined);
    }

  });

};

module.exports.getWeather = getWeather;
