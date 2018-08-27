import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import Shop from './components/Product/Shop';
import Cart from './components/Product/Cart';
import Home from './components/Base/Home';
import SignUp from './components/User/Signup';
import Payment from './components/Payment/Payment';
import Success from './components/Payment/Success';
import Cancel from './components/Payment/Cancel';
import Error from './components/Payment/Error';
import Phone from './components/PhoneVerification/Phone';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/cart/payment" component={Payment} />
                <Route exact path="/cart/success" component={Success} />
                <Route exact path="/cart/cancel" component={Cancel} />
                <Route exact path="/cart/error" component={Error} />
                <Route exact path="/signup/phone" component={Phone} />
            </Switch>
        )
    }
}

export default Router;