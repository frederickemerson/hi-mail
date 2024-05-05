import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/env'; // Assuming env exports are correctly typed
import nodemailer from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send('Method not allowed');
            return;
        }

        // Ensure the request body is of the correct type
        const { email } = req.body as { email: string };

        if (!email) {
            res.status(400).send('Email is required');
            return;
        }

        // Set up transporter with environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.NODEMAILER_MAIL,
                pass: env.NODEMAILER_MAILP
            }
        });

        const mailOptions: MailOptions = {
            from: env.NODEMAILER_MAIL, // Using the sender email from environment variables
            to: email,
            subject: 'Peek-A-Boo! It’s Me Saying Hi!',
            html: `
                <div>
                    <h1>As promised here is a Hi!</h1>
                    <p>Just checking in to see how everything is going with you. 
                    It's been a while since we last caught up, and I thought it might be nice to reconnect and share a few updates. 
                    I hope this message finds you in great spirits and good health. Over here, things have been bustling with new projects and exciting developments.
                    I'd love to hear all about what you have been up to as well. 
                    Whether it's new adventures, work updates, or just everyday moments, I'm all ears. 
                    So when you have a moment, drop me a line—I'm looking forward to catching up properly. Until then, take care and stay wonderful!</p>
                </div>`
        };

        // Send email and handle the response
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email Success');

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error');
    }
}
