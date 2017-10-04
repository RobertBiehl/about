const task = require('./task');
const s3 = require('s3');

// deploy the app to Firebase
global.DEBUG = process.argv.includes('--debug') || false;

module.exports = task(
  'publish',
  () =>
    new Promise((resolve, reject) => {
      const client = s3.createClient({
        s3Options: {
          region: 'eu-central-1',
          sslEnabled: true,
        },
      });
      const uploader = client.uploadDir({
        localDir: 'public',
        deleteRemoved: true,
        s3Params: { Bucket: 'robertbiehl.com' },
      });
      uploader.on('error', reject);
      uploader.on('end', resolve);
    }),
);
