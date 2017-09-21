var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

const port = 10255;
const username = 'srnara-mongo';
const password = 'U68fGdnhY89NU36Nss5sqzEouVRrxZ5aBcPvC0PXV0jsWbvFZnrDsOWNIv7FC3jpZzZiDeq3GfpPGkVZLIgd5Q==';
const documentDbEndPoint = 'https://srnara-mongo.documents.azure.com';

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