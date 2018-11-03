const config = require('config');
const db = require('@auxilin/node-mongo').connect(config.mongo.connection);

db.setServiceMethod('findById', (service, id) => {
  return service.findOne({ _id: id });
});

module.exports = db;
