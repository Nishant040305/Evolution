const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

// Load HTML template and replace placeholders
async function loadTemplate(filePath, replacements) {
  const resolvedPath = path.resolve(__dirname, filePath);

  try {
    let template = await fs.promises.readFile(resolvedPath, 'utf-8');
    for (const key in replacements) {
      template = template.replace(
        new RegExp(`{{${key}}}`, 'g'),
        replacements[key]
      );
    }
    return template;
  } catch (error) {
    console.error('Error reading email template:', error);
    throw error;
  }
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOtpEmail = async (recipientEmail, otpCode) => {
  try {
    const filePath = path.join(__dirname, '../messages/EmailVerification.html');
    const htmlTemplate = await loadTemplate(filePath, { OTP_CODE: otpCode });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'Your OTP Verification for DNA - Evolution',
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

const sendPasswordRecoverEmail = async (recipientEmail, otpCode) => {
  try {
    const filePath = path.join(__dirname, '../messages/PasswordRecovery.html');
    const htmlTemplate = await loadTemplate(filePath, { OTP_CODE: otpCode });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'Your Password Recovery OTP for DNA - Evolution',
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending password recovery email:', error);
  }
};

module.exports = { sendOtpEmail, sendPasswordRecoverEmail };
