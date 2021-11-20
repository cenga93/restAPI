import nodemailer from 'nodemailer';
import { IUserModel } from '../models/user';

const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
     },
});

/**
 *  Send welcome mail.
 *
 * @param data - This should be the object of new user.
 * @param url -  This should be the instance of URL.
 */
export const sendWelcomeMail = async (data: IUserModel, url: URL): Promise<void> => {
     const { firstName, lastName, code, email, _id } = data;
     const { origin } = url;

     await transporter.sendMail({
          from: '"RESTAPI" <cenga93@gmail.com>',
          to: email,
          subject: 'RESTAPI :: Welcome',
          html: `
         <html lang='en'>
              <head>
                   <style>
                         .verify-code{
                              font-weight: bold;
                              color: #ff9900;
                              font-size: 18px;
                         }
                   </style>
                   <title>Account verification</title>
              </head>
              <body>
                   <h2>Hello, ${firstName} ${lastName}</h2>
                   <p>Welcome to RESTAPI</p>
                   <p>Your verification code is  <span class='verify-code'>${code}</span></p>
                   <p>Enter it on the <a href="${origin}/verification/${_id}">Link</a></p>
              </body>
         </html>`,
     });
};
