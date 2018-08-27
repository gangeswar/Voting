import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import config from '../../config.json';

import firebase from 'firebase';

export default class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      payment: null,
      cancel: null,
      error: null
    }
  }
  render() {
    console.log(this.props.total);
    const onSuccess = (payment) => 
    ( <div>
        <h2>Order Summary</h2>
        <a onClick={() => firebase.auth().signOut()}>shop page</a>
      </div>
      );

    const onCancel = (data) => {
      console.log('The payment was cancelled!', data);
      this.setState = ({
        cancel: data
      })
    }

    const onError = (error) => {
      console.log("Error!", error);
      this.setState = ({
        error:error
      })
    }

    let env = config.payment.env; 
    let currency = config.payment.currency;

    const client = {
      sandbox : config.payment.sandbox,
      production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
      <div>
        <h1>
          Click here to proceed the payment with paypal
        </h1>
        <PaypalExpressBtn env={env} client={client} currency={currency} total={this.props.total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        {
          this.state.payment===null?null : 
          <div>
            <h1>Payment Sucessfull</h1>
            <p>Product shipped to the address:</p>
            {this.state.payment}
          </div>
        }
      </div>
    );
  }
}