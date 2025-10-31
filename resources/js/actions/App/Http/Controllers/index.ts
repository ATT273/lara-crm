import Settings from './Settings'
import ProductController from './ProductController'
const Controllers = {
    Settings: Object.assign(Settings, Settings),
ProductController: Object.assign(ProductController, ProductController),
}

export default Controllers