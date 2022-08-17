const role = require('./role.route');
const cart = require('./cart.route');
const sale = require('./sale.route');
const user = require('./user.route');
const status = require('./status.route');
const product = require('./product.route');
const service = require('./service.route');
const account = require('./account.route');
const description = require('./description.route');
const productType = require('./productType.route');
const serviceType = require('./serviceType.route');
const saleDescription = require('./saleDescription.route');
const manufacturer = require('./manufacturer.route');

function route(app) {
  app.use('/api/role', role);
  app.use('/api/user', user);
  app.use('/api/cart', cart);
  app.use('/api/sale', sale);
  app.use('/api/status', status);
  app.use('/api/product', product);
  app.use('/api/service', service);
  app.use('/api/account', account);
  app.use('/api/description', description);
  app.use('/api/serviceType', serviceType);
  app.use('/api/saleDescription', saleDescription);
  app.use('/api/productType', productType);
  app.use('/api/manufacturer', manufacturer);
  // Action ---> Dispatcher ---> Function handler
}

module.exports = route;
