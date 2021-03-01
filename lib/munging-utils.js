function formatLocation(someData) {
  return {
    location_name: someData[0].display_name,
    latitude: someData[0].lat,
    longitude: someData[0].lon,
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

function formatBusiness(businessData) {
  return {
    business_id: businessData.id,
  };
}

module.exports = {
  formatLocation,
  formatWeather,
  formatBusiness
};