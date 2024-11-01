const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
// Load HTML template and replace placeholders
function loadTemplate(filePath, replacements) {
    const resolvedPath = path.resolve(__dirname, filePath);

  let template = fs.readFileSync(resolvedPath, 'utf-8');
  for (const key in replacements) {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
  }
  return template;
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendOtpEmail=async(recipientEmail,otpCode)=> {
  // Load the template with the OTP and user name

  const htmlTemplate = loadTemplate('../messages/EmailVerification.html', {
    OTP_CODE: otpCode,
  });

  // Set up email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: 'Your OTP Verification for DNA - Evolution',
    html: htmlTemplate,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
const sendPasswordRecoverEmail=async(recipientEmail,otpCode)=> {
    // Load the template with the OTP and user name
  
    const htmlTemplate = loadTemplate('../messages/PasswordRecovery.html', {
      OTP_CODE: otpCode,
    });
  
    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'Your OTP Verification for DNA - Evolution',
      html: htmlTemplate,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
module.exports = {sendOtpEmail,sendPasswordRecoverEmail};