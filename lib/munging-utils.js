function formatLocation(locationData) {
  return {
    location_name: locationData[0].display_name,
    latitude: locationData[0].lat,
    longitude: locationData[0].lon,
  };
}
// munge that weather
function formatWeather(weatherData) {
  const formattedResponse = weatherData.data.map(weatherItem => {
    return {
      forecast: weatherItem.weather.description,
      time: new Date(weatherItem.ts * 1000).toDateString(),
    };
  });
  // this gives jsut 7 responses
  const finalResponse = formattedResponse.slice(0, 7);
  return finalResponse;
}

module.exports = {
  formatLocation,
  formatWeather,
};