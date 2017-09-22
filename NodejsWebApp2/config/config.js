var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

const port = YOUR_MONGO_PORT;
const username = YOUR_MONGO_USERNAME;
const password = YOUR_MONGO_PASSWORD;
const documentDbEndPoint = 'https://' + YOUR_MONGO_HOST

const dbName = 'nodetest';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodeapp'
    },
    constants: {
        mongoport: port,
        username: username,
        password: password,
        documentDbEndPoint: documentDbEndPoint
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://' + username + ':' + password + '@' + username + '.documents.azure.com:' + port + '/' + dbName + '?ssl=true'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodeapp'
    },
    constants: {
        mongoport: port,
        username: username,
        password: password,
        documentDbEndPoint: documentDbEndPoint
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://' + username + ':' + password + '@' + username + '.documents.azure.com:' + port + '/' + dbName + '?ssl=true'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodeapp'
    },
    constants: {
        mongoport: port,
        username: username,
        password: password,
        documentDbEndPoint: documentDbEndPoint
    },
    port: process.env.PORT,
    db: 'mongodb://' + username + ':' + password + '@' + username + '.documents.azure.com:' + port + '/' + dbName + '?ssl=true'
  }
};

module.exports = config[env];