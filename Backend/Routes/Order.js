const express = require('express');
const orderData = require('../Models/Orders');
const router = express.Router();
const app = express();
const nodemailer = require('nodemailer');


router.post('/orderData', async (req, res) => {
  let data = req.body.orderData
  let emailid = await orderData.findOne({ "email": req.body.email })
  console.log(emailid, 'I am email');
  console.log(data, 'I am data')
  // console.log(data[0].name,'I am another name')

  console.log(data.length)
  if (emailid === null) {
    try {
      await orderData.create({
        email: req.body.email,
        orderData: [data]
      }).then(() => {
        res.json({ success: true })
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 25,
          secure: false,
          auth: {
            user: 'tg21014@gmail.com',
            pass: 'dmtulilbljlvwqbo'
          }
        });

        const message = {
          from: 'Zomaggy',
          to: req.body.email,
          subject: 'Your Order is Confirmed',
          text: `Your order has been confirmed`,
          html: `<script>
                    for(var i = 0; i < data.length; i++)
      {
        data[i].name
      }
      </script>`
        };


        // Send the email with nodemailer
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
          } else {
            console.log('Email sent: ', info.response);
            res.status(200).json(ans);
          }
        });

      })
    } catch (error) {
      console.log(error)
      res.status(400)

    }
  }

  else {
    try {
      await orderData.findOneAndUpdate(
        { "email": req.body.email },
        { $push: { "orderData": data } }
      );
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 25,
        secure: false,
        auth: {
          user: 'tg21014@gmail.com',
          pass: 'dmtulilbljlvwqbo'
        }
      });

      const message = {
        from: 'Zomaggy',
        to: req.body.email,
        subject: 'Your Order is Confirmed',
        text: `Your order has been confirmed`,
        html: `<script>
        
        </script>`
      };
      

      // Send the email with nodemailer
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent: ', info.response);
          res.status(200).json(ans);
        }
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error)
      res.status(400)
    }
  }
})


router.post('/myOrderData', async (req, res) => {
  try {
    let mydata = await orderData.findOne({ "email": req.body.email });
    if (mydata) {
      const orderArray = mydata.orderData;
      res.json({ data: orderArray })
    }
    // res.json({data : mydata})

  } catch (error) {
    res.status(500).json({ error: 'Unable to add item to cart.' });

  }
})

module.exports = router;