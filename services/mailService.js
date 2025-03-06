import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

async function sendMail(email, title) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVICE_HOST,
        port: process.env.MAIL_SERVICE_PORT,
        auth: {
            user: process.env.MAIL_SERVICE_EMAIL,
            pass: process.env.MAIL_SERVICE_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.MAIL_SERVICE_EMAIL,
        to: email,
        subject: 'Reminder from Todo',
        html: await ejs.renderFile(path.join(__dirname, '../views/reminder.ejs'), { title })
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (!error) resolve(info);
            reject(error);
        });
    });
}

export default sendMail;