module.exports = [
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'script-src': ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
          'frame-ancestors': ["self", "http://localhost:8080", "https://thatsourjake.blog"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },

];
