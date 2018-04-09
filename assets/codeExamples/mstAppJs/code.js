/** ------------- App.js --------------------- **/

import { Provider }    from 'mobx-react'
import App             from './App.js'
import ShopStore       from './Shop.store.js'
import NavigationStore from './Navigation.store.js'

const shopStore = ShopStore.create()

ReactDOM.render(
    <Provider
        shop={shopStore}
        navigation={navigationStore}
    >
        <App />
    </Provider>,
    document.getElementById('root')
)
