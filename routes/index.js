const postsRoute = require('./postsRoute');
const authRoute = require('./authRoute');

const mount = (app) => {
  
  app.use('/api/v1/posts', postsRoute);
  app.use("/api/v1/auth", authRoute);

}

module.exports = mount;