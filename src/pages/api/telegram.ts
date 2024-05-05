
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from '~/env'
import { InlineKeyboardMarkup, Message } from '@grammyjs/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(!req.body) {
          console.warn('No body or message');
          res.status(200).end();
          return;
        }
    
        const {message} = req.body as {message:Message};

        console.log(message)
      res.status(200).send('OK');
    }
    catch(error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error');
      }
}