module.exports = {
  mongo: {
    connection: 'mongodb://mongo:27017/auxilin-staging',
  },
  session: {
    secret: 'session_staging_secret',
    ttl: 2 * 60 * 60 * 1000, // two hours
    store: {
      host: 'redis',
      port: 6379,
    },
  },
  jwt: {
    secret: 'staging_secret',
    audience: 'auxilin.staging',
    issuer: 'auxilin.staging',
  },
  apiUrl: 'https://demo-api.auxilin.com',
  webUrl: 'https://demo-app.auxilin.com',
  landingUrl: 'https://demo-landing.auxilin.com',
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN || '',
  },
};
