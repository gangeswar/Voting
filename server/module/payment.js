const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVjV13vSJSV89et9VOI7U9YYJtVBD-urHJQ4G81xs7h58P1VOm2h704FGrVqHr5zNstq_H_mbrEgkA8_',
  'client_secret': 'EFLHfIz-ZzzPBE0KhydKz_JPUwnWQ9PdUhq2m9Mn_2s1iXa2R8wJJscEIvvp36Bkqltk09dftbayuSu9'
});

const router = express();

router.post('/pay', (req, res) => {
    
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:8000/api/payment/success",
        "cancel_url": "http://localhost:8000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]   
};



paypal.payment.create(create_payment_json,  (error, payment) => {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

router.get('/success', (req, res) => {
    console.log("hai")
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
    console.log(payment);
});

});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;