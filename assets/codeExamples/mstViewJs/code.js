/** ---------- CheckoutView.js ---------- **/

import React                from 'react'
import { inject, observer } from 'mobx-react'

@inject('shop') @observer
class CheckoutView extends React.Component {
    render() {
        const { shop } = this.props;
        return (<span>
            Amount:{ shop.checkountAmount }
        </span>);
    }
}
