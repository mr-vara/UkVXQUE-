/**
 * All routes in the App are defined here
 */
module.exports = function(app){
  app.use('/api/users', require('../users/users.controller'));
  app.use('/api/products', require('../products/products.controller'));
}
