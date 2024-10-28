const nodeMailer = require('nodemailer');

const emailService = {};

emailService.sendEmail = async (toEmail, emailSubject, htmlMessage) => {
    let username = 'vmm.testing.email@gmail.com';
    let password = 'nqxdyzymymmvnkxe';

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    let mailOptions = {
        from: username,
        to: toEmail,
        subject: emailSubject,
        html: htmlMessage
    };

    try {
        return await transporter.sendMail(mailOptions);
    } catch (e) {
        return e;
    }
}

module.exports = emailService