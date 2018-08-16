import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import Shop from './components/Product/Shop';
import Cart from './components/Product/Cart';
import Home from './components/Base/Home';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
            </Switch>
        )
    }
}

export default Router;