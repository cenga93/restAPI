import nodemailer from 'nodemailer';
import { IUser } from '../interfaces';

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
export const sendWelcomeMail = async (data: IUser, url: URL): Promise<void> => {
     const { firstName, lastName, code, email } = data;

     await transporter.sendMail({
          from: '"RESTAPI" <cenga93@gmail.com>',
          to: email,
          subject: 'RESTAPI :: Welcome',
          html: `
         <html lang="en">
            <body>
                <h2>Hello, ${firstName} ${lastName}</h2>
                <p>Welcome to RESTAPI</p>
                <br />
                <br />
                <p>Your verification code is ${code}.\nEnter it in the link below:\n${url.origin}/verification/${code}</p>
            </body>
         </html>`,
     });
};
