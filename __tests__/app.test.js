require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const geoJson = require('../lib/geojson.js');
const weather = require('../lib/weather.js');
const { formatLocation,
  formatWeather 
} = require('../lib/munging-utils.js');
describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('test should return location lat and lon', async() => {

      const expectation = 
        {
          latitude: '45.5202471',
          longitude: '-122.6741949',
          location_name: 'Portland, Multnomah County, Oregon, USA',
        }
      ;

      const data = formatLocation(geoJson);

      expect(data).toEqual(expectation);
    });
    test('test should return weather based on lat and lon', async() => {


      const expectation = 
      [{ 'forecast': 'Scattered clouds', 'time': 'Tue May 05 2020' },
        { 'forecast': 'Light snow', 'time': 'Wed May 06 2020' },
        { 'forecast': 'Few clouds', 'time': 'Thu May 07 2020' },
        { 'forecast': 'Few clouds', 'time': 'Fri May 08 2020' },
        { 'forecast': 'Broken clouds', 'time': 'Sat May 09 2020' },
        { 'forecast': 'Overcast clouds', 'time': 'Sun May 10 2020' },
        { 'forecast': 'Overcast clouds', 'time': 'Mon May 11 2020' }]
      ;

      const data = formatWeather(weather);

      expect(data).toEqual(expectation);
    });
    
  });
});
