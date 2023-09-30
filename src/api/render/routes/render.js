module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/render/:id',
     handler: 'render.iframe',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
