import userRoutes from './users/user.route';
import storeRoutes from './stores/store.route';
import loginRoutes from './auth/login.route';
import countryRoutes from './countries/countries.route';
import cityRoutes from './cities/cities.route';
import addressRoutes from './address/address.route';
import productRoutes from './product/product.route';
import massiveProductsRoute from './product/massive.route';
import invoiceRoute from './invoice/invoice.route';
import geoRoute from './geometry';

export {
    userRoutes, storeRoutes, loginRoutes,
    countryRoutes, cityRoutes, addressRoutes,
    productRoutes, massiveProductsRoute, invoiceRoute,
    geoRoute
};