'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/DavidFotograful'
  },
  aws: {
    region: "eu-central-1",
    accessKeyId: "",
    secretAccessKey: ""
  },

  seedDB: false
};
