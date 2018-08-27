import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { withRouter } from 'react-router-dom';

import config from '../../config.json';
import Success from './Success';

class Payment extends React.Component {
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
    const onSuccess = (payment) =>{
      <Success payment={payment} />
      this.props.history.push('/cart/success');
    }

    const onCancel = (data) => {
      console.log('The payment was cancelled!', data);
      this.props.history.push('/cart/cancel');
    }

    const onError = (error) => {
      console.log("Error!", error);
      this.props.history.push('/cart/error');
    }

    let env = config.payment.env;
    let currency = config.payment.currency;

    const client = {
      sandbox: config.payment.sandbox,
      production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
      <div>
        <h1>
          Click here to proceed the payment with paypal
        </h1>
        <PaypalExpressBtn env={env} client={client} currency={currency} total={this.props.total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
      </div>
    );
  }
}

export default withRouter (Payment);