const postsRoute = require('./postsRoute');

const mount = (app) => {
  
  app.use('/api/v1/posts', postsRoute);

}

module.exports = mount;