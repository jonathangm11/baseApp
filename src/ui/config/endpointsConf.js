const baseApiUrl = 'http://localhost:8080';

module.exports = {
  cors: {
    origin: '*', 
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Correlation-Id, T-Session-Token',
    credentials: true
  },
  languagesApi: `${baseApiUrl}/json_resources/ml.json`,
  menuApi: `${baseApiUrl}/json_resources/menu.json`  

};
