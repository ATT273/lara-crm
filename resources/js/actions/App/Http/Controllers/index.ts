import Settings from './Settings'
import ProductController from './ProductController'
import AccountController from './AccountController'
const Controllers = {
    Settings: Object.assign(Settings, Settings),
ProductController: Object.assign(ProductController, ProductController),
AccountController: Object.assign(AccountController, AccountController),
}

export default Controllers