const nodemailer = require('nodemailer');

exports.postQuery = (req, res) => {
    const {
      name,
      email,
      phone,
      description,
    } = req.body;
  
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.User,
          pass: process.env.Pass
        }
      });
  
    const mailOptions = {
      from: email,
      to: 'rsubhankhalid@gmail.com',
      subject: 'Email by BuyHive)',
      html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Cellphone Number: ${phone}</p>
            <p>Description: ${description}</p>
            `,
    };
  
    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        return res.status (400).json (error.message);
      }
      if (info.response) {
        return res.status (200).json ({message: `Thank you for your suggestion! For further assistance, get in touch with us.`});
      }
    });
  };
  