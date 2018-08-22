import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import config from '../../config.json';

export default class Payment extends React.Component {
  render() {
    console.log(this.props.total);
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
    }

    const onCancel = (data) => {
      console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
      console.log("Error!", err);
    }

    let env = config.payment.env; 
    let currency = config.payment.currency;

    const client = {
      sandbox : config.payment.sandbox,
      production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
      <PaypalExpressBtn env={env} client={client} currency={currency} total={this.props.total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    );
  }
}