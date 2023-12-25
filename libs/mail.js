import nodemailer from 'nodemailer';

// process.env.EMAIL='husnainkhurshiid@gmail.com'
// process.env.PASSWORD='zcwvinqpwjbvowry'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zunnooran.alvi@gmail.com',
    pass: 'kukdflkxdzcflkcg',
  },
});

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: 587,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });

export default async function sendMail(to, subject, html){
    return await transporter.sendMail({
      from:'zunnooran.alvi@gmail.com',
      to,
      subject,
      html,
    });
}
