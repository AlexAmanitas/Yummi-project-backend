const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD } = process.env;
console.log('EMAIL', EMAIL);

const sendEmail = (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    authMethod: 'LOGIN',
  });

  const message = {
    from: EMAIL,
    to: email,
    subject: 'So Yummy subscribe service',
    text: `Thank you for subscribing to our newsletter`,
    html: `
    <b style=
    "color:#ff6c00;
     display: inline-block;
     width: 100%;
      text-align: center;
    ">
    Back to So Yummy :) 
    </b>
       <p style='text-align:center;'>
    <a href="https://yummy-project-backend.onrender.com" 
    style=
    'background-color: #8BAA36;
     color: white;
     padding: 12px 20px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     border-radius: 5px;
     cursor: pointer;
         '>
     So Yummy :)
    </a>
    </p>`,
  };

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendEmail };
