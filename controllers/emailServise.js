const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD } = process.env;
console.log('EMAIL', EMAIL);

const sendEmail = (email, verificationToken) => {
  console.log('EMAILLLLLLLLLLLLLLLL', EMAIL, PASSWORD);

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
    subject: 'Verification email',
    text: `Please verify your email address. Follow to link: /users/verify/:${verificationToken}`,
    html: `
    <b style=
    "color:#ff6c00;
     display: inline-block;
     width: 100%;
      text-align: center;
    ">
    Please verify your email address. Follow to link: 
    </b>
    <br><br>
    <p style='text-align:center;'>
    <a href="users/verify/${verificationToken}" 
    style=
    'background-color: #008CBA;
     color: white; padding: 12px 20px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     border-radius: 5px;
     cursor: pointer;
     '>
     /users/verify/${verificationToken}
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
