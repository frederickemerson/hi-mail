import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate } from '~/_templates/EmailTemplate';
import { env } from '~/env';

const resend = new Resend(env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send('Method not allowed');
            return;
        }
        const { email } = req.body;

        if (!email) {
            res.status(400).send('Email is required');
            return;
        }
        const { data, error } = await resend.emails.send({
            from: 'Admin <getahi@resend.dev>',
            to: [email],
            subject: 'Peek-A-Boo! Its Me Saying Hi!',
            react: EmailTemplate(),
          });
      
          if (error) {
            console.log(error)
            res.status(400).send('Error!');
          }

        res.status(200).send('Email Success');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error');
    }
}
