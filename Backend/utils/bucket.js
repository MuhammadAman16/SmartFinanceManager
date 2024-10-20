const AWS = require('aws-sdk');
const constants  =  require('./constants');
// Set the AWS region and credentials
AWS.config.update({
  accessKeyId: constants.AWS.accessKeyId, 
  secretAccessKey: constants.AWS.secretAccessKey,
  region: 'us-east-1',
});

// Create an instance of the S3 client
const s3 = new AWS.S3();

module.exports = s3
